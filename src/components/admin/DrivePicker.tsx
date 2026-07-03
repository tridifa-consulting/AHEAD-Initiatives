"use client";

import { useCallback, useRef, useState } from "react";
import Script from "next/script";
import { HardDrive } from "lucide-react";

export type DrivePick = {
  driveFileId: string;
  name: string;
  mimeType: string;
  url: string;
  thumbnailUrl?: string;
};

/* Minimal typings for Google Identity Services + Picker globals. */
type TokenClient = { requestAccessToken: () => void };
declare global {
  interface Window {
    google?: {
      accounts: { oauth2: { initTokenClient: (c: {
        client_id: string; scope: string;
        callback: (r: { access_token?: string; error?: string }) => void;
      }) => TokenClient } };
      picker: {
        PickerBuilder: new () => GooglePickerBuilder;
        ViewId: { DOCS: unknown; DOCS_IMAGES: unknown; PDFS: unknown };
        DocsView: new (viewId?: unknown) => unknown;
        Feature: { NAV_HIDDEN: unknown };
        Action: { PICKED: string };
      };
    };
    gapi?: { load: (api: string, cb: () => void) => void };
  }
}
type GooglePickerBuilder = {
  addView: (v: unknown) => GooglePickerBuilder;
  setOAuthToken: (t: string) => GooglePickerBuilder;
  setDeveloperKey: (k: string) => GooglePickerBuilder;
  enableFeature: (f: unknown) => GooglePickerBuilder;
  setCallback: (cb: (data: {
    action: string;
    docs?: { id: string; name: string; mimeType: string; url: string; thumbnails?: { url: string }[] }[];
  }) => void) => GooglePickerBuilder;
  build: () => { setVisible: (v: boolean) => void };
};

/**
 * "Choose from Google Drive" button.
 * Requires NEXT_PUBLIC_GOOGLE_CLIENT_ID and NEXT_PUBLIC_GOOGLE_PICKER_API_KEY.
 * Without them it renders a disabled button explaining what to configure,
 * so the admin panel works before the Google Cloud project exists.
 */
export default function DrivePicker({
  onPick,
  kind = "documents",
}: {
  onPick: (pick: DrivePick) => void;
  kind?: "documents" | "images";
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PICKER_API_KEY;
  const configured = Boolean(clientId && apiKey);

  // lazy initialisers handle the scripts-already-loaded case without an effect
  const [gsiReady, setGsiReady] = useState(
    () => typeof window !== "undefined" && Boolean(window.google?.accounts)
  );
  const [pickerReady, setPickerReady] = useState(
    () => typeof window !== "undefined" && Boolean(window.google?.picker)
  );
  const tokenRef = useRef<string | null>(null);

  const openPicker = useCallback((token: string) => {
    const g = window.google!;
    const view = new g.picker.DocsView(kind === "images" ? g.picker.ViewId.DOCS_IMAGES : g.picker.ViewId.PDFS);
    new g.picker.PickerBuilder()
      .addView(view)
      .setOAuthToken(token)
      .setDeveloperKey(apiKey!)
      .enableFeature(g.picker.Feature.NAV_HIDDEN)
      .setCallback((data) => {
        if (data.action === g.picker.Action.PICKED && data.docs?.[0]) {
          const d = data.docs[0];
          onPick({
            driveFileId: d.id,
            name: d.name,
            mimeType: d.mimeType,
            url: d.url,
            thumbnailUrl: d.thumbnails?.[0]?.url,
          });
        }
      })
      .build()
      .setVisible(true);
  }, [apiKey, kind, onPick]);

  const start = useCallback(() => {
    if (!configured || !window.google?.accounts) return;
    if (tokenRef.current) return openPicker(tokenRef.current);
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId!,
      scope: "https://www.googleapis.com/auth/drive.readonly",
      callback: (resp) => {
        if (resp.access_token) {
          tokenRef.current = resp.access_token;
          openPicker(resp.access_token);
        }
      },
    });
    client.requestAccessToken();
  }, [clientId, configured, openPicker]);

  return (
    <>
      {configured && (
        <>
          <Script src="https://accounts.google.com/gsi/client" onLoad={() => setGsiReady(true)} />
          <Script
            src="https://apis.google.com/js/api.js"
            onLoad={() => window.gapi?.load("picker", () => setPickerReady(true))}
          />
        </>
      )}
      <button
        type="button"
        onClick={start}
        disabled={!configured || !gsiReady || !pickerReady}
        title={configured ? undefined : "Add the Google client ID and Picker API key to the site's environment to enable Drive"}
        className="inline-flex items-center gap-2 rounded-lg border border-[#16324F]/15 bg-white px-4 py-2 text-sm font-medium text-[#16324F] hover:bg-[#FAF7F0] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <HardDrive className="h-4 w-4 text-[#2D6A4F]" />
        Choose from Google Drive
      </button>
      {!configured && (
        <span className="ml-2 align-middle text-xs text-[#1F2933]/55">
          (needs Google credentials in settings — see docs)
        </span>
      )}
    </>
  );
}
