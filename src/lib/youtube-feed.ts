/**
 * Server-side YouTube channel feed reader.
 *
 * Uses YouTube's official Atom feed, so no YouTube Data API key, OAuth token,
 * paid API, or client-side social widget is required for public uploads.
 *
 * Required server environment variable:
 *   AHEAD_YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxxxx
 */

export type YouTubeFeedVideo = {
  id: string;
  title: string;
  youtube_video_id: string;
  thumbnail_url: string;
  published_at: string | null;
};

const FEED_REVALIDATE_SECONDS = 3600;

function decodeXml(value: string) {
  return value
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCodePoint(Number.parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, decimal: string) =>
      String.fromCodePoint(Number.parseInt(decimal, 10))
    )
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

function tagValue(
  xml: string,
  tag: string
) {
  const escapedTag =
    tag.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

  const match = new RegExp(
    `<${escapedTag}[^>]*>([\\s\\S]*?)<\\/${escapedTag}>`,
    "i"
  ).exec(xml);

  return match?.[1]
    ? decodeXml(match[1])
    : null;
}

function parseYouTubeFeed(
  xml: string,
  limit: number
): YouTubeFeedVideo[] {
  const entries =
    xml.match(
      /<entry\b[^>]*>[\s\S]*?<\/entry>/gi
    ) ?? [];

  return entries
    .slice(0, limit)
    .map((entry) => {
      const videoId =
        tagValue(
          entry,
          "yt:videoId"
        );

      const title =
        tagValue(
          entry,
          "title"
        );

      if (!videoId || !title) {
        return null;
      }

      return {
        id: `youtube-${videoId}`,
        title,
        youtube_video_id:
          videoId,
        thumbnail_url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        published_at:
          tagValue(
            entry,
            "published"
          ),
      };
    })
    .filter(
      (video): video is YouTubeFeedVideo =>
        video !== null
    );
}

/**
 * Returns null when the feed is not configured or temporarily unavailable.
 * That deliberate null lets page.tsx fall back to the existing CMS videos,
 * so a YouTube/network problem can never break the public website build.
 */
export async function getYouTubeFeedVideos(
  limit = 9
): Promise<
  YouTubeFeedVideo[] | null
> {
  const channelId =
    process.env.AHEAD_YOUTUBE_CHANNEL_ID?.trim();

  if (!channelId) {
    return null;
  }

  const safeLimit = Math.max(
    1,
    Math.min(limit, 15)
  );

  const feedUrl =
    `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;

  try {
    const response =
      await fetch(feedUrl, {
        headers: {
          Accept:
            "application/atom+xml, application/xml, text/xml",
        },
        next: {
          revalidate:
            FEED_REVALIDATE_SECONDS,
        },
      });

    if (!response.ok) {
      console.warn(
        `YouTube feed returned ${response.status}; using the existing video fallback.`
      );
      return null;
    }

    const xml =
      await response.text();

    const videos =
      parseYouTubeFeed(
        xml,
        safeLimit
      );

    return videos.length > 0
      ? videos
      : null;
  } catch (error) {
    console.warn(
      "YouTube feed unavailable; using the existing video fallback.",
      error
    );
    return null;
  }
}
