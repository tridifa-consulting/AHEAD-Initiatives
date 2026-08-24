import {
  NextRequest,
} from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_HOSTS =
  new Set([
    "www.aheadinitiatives.in",
    "aheadinitiatives.in",
  ]);

const MAX_REDIRECTS = 3;

function validatePdfUrl(
  raw: string
) {
  const url = new URL(raw);

  if (
    url.protocol !== "https:"
  ) {
    throw new Error(
      "Only HTTPS PDF URLs are allowed."
    );
  }

  if (
    !ALLOWED_HOSTS.has(
      url.hostname
        .toLowerCase()
    )
  ) {
    throw new Error(
      "PDF host is not allowed."
    );
  }

  if (
    !url.pathname
      .toLowerCase()
      .endsWith(".pdf")
  ) {
    throw new Error(
      "Only PDF resources are allowed."
    );
  }

  return url;
}

async function fetchPdf(
  initialUrl: URL,
  range:
    | string
    | null
) {
  let target =
    initialUrl;

  for (
    let redirectCount = 0;
    redirectCount <=
    MAX_REDIRECTS;
    redirectCount++
  ) {
    const headers =
      new Headers();

    if (range) {
      headers.set(
        "Range",
        range
      );
    }

    const response =
      await fetch(
        target,
        {
          method: "GET",
          headers,
          redirect:
            "manual",
          cache:
            "no-store",
        }
      );

    if (
      response.status >= 300 &&
      response.status < 400
    ) {
      const location =
        response.headers.get(
          "location"
        );

      if (
        !location ||
        redirectCount ===
          MAX_REDIRECTS
      ) {
        return response;
      }

      target =
        validatePdfUrl(
          new URL(
            location,
            target
          ).toString()
        );

      continue;
    }

    return response;
  }

  throw new Error(
    "Too many redirects."
  );
}

/**
 * Restricted PDF byte proxy.
 *
 * Why it exists:
 * - iframe PDF display does not require CORS.
 * - PDF.js must fetch the PDF bytes and therefore does.
 * - all current AHEAD publication URLs are on aheadinitiatives.in.
 *
 * This endpoint is deliberately NOT an open proxy:
 * only HTTPS .pdf files on AHEAD's own legacy domains are accepted.
 */
export async function GET(
  request: NextRequest
) {
  const raw =
    request.nextUrl
      .searchParams
      .get("url");

  if (!raw) {
    return new Response(
      "Missing PDF URL.",
      {
        status: 400,
      }
    );
  }

  let target: URL;

  try {
    target =
      validatePdfUrl(raw);
  } catch {
    return new Response(
      "Invalid PDF URL.",
      {
        status: 400,
      }
    );
  }

  try {
    const range =
      request.headers.get(
        "range"
      );

    const upstream =
      await fetchPdf(
        target,
        range
      );

    if (
      !upstream.ok &&
      upstream.status !== 206
    ) {
      return new Response(
        "Unable to retrieve PDF.",
        {
          status:
            upstream.status ||
            502,
        }
      );
    }

    const headers =
      new Headers();

    const passthrough = [
      "accept-ranges",
      "content-length",
      "content-range",
      "etag",
      "last-modified",
    ];

    for (
      const name of
      passthrough
    ) {
      const value =
        upstream.headers.get(
          name
        );

      if (value) {
        headers.set(
          name,
          value
        );
      }
    }

    headers.set(
      "Content-Type",
      "application/pdf"
    );

    headers.set(
      "Content-Disposition",
      "inline"
    );

    headers.set(
      "Cache-Control",
      "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
    );

    return new Response(
      upstream.body,
      {
        status:
          upstream.status,
        headers,
      }
    );
  } catch (
    error
  ) {
    console.error(
      "PDF proxy error:",
      error
    );

    return new Response(
      "Unable to retrieve PDF.",
      {
        status: 502,
      }
    );
  }
}
