import { useState } from "react";
import type { Project } from "../data/projects";

type Props = {
  project: Project;
};

export function LiveDevicePreview({ project }: Props) {
  const [desktopActive, setDesktopActive] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);

  const host = project.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const canPreview = project.previewMode === "iframe" || project.previewMode === "proposal";

  if (!canPreview) {
    return (
      <div className="protected-device-card">
        <div className="protected-preview">
          <div className="protected-orb" />
          <p className="eyebrow">Protected system</p>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <span>Credentials are never shared in public presentations</span>
        </div>
      </div>
    );
  }

  return (
    <div className="live-device-grid">
      <div className="live-desktop-shell">
        <div className="browser-bar">
          <span />
          <span />
          <span />
          <p>{host}</p>
          <strong>Desktop</strong>
        </div>

        <div
          className={`live-desktop-viewport ${desktopActive ? "is-active" : ""}`}
          onMouseLeave={() => setDesktopActive(false)}
        >
          {!desktopActive && (
            <button
              className="preview-activation"
              type="button"
              onClick={() => setDesktopActive(true)}
            >
              Click to scroll desktop preview
            </button>
          )}

          <iframe
            title={`${project.title} desktop live preview`}
            src={project.url}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="desktop-live-iframe"
          />
        </div>
      </div>

      <div className="live-phone-shell">
        <div className="phone-top">
          <span />
        </div>

        <div
          className={`live-phone-viewport ${mobileActive ? "is-active" : ""}`}
          onMouseLeave={() => setMobileActive(false)}
        >
          {!mobileActive && (
            <button
              className="preview-activation phone"
              type="button"
              onClick={() => setMobileActive(true)}
            >
              Tap to scroll
            </button>
          )}

          <iframe
            title={`${project.title} mobile live preview`}
            src={project.url}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="phone-live-iframe"
          />
        </div>
      </div>
    </div>
  );
}
