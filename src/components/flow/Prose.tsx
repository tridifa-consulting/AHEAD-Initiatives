import { Fragment } from "react";

/**
 * Minimal, safe renderer for section body text stored in the CMS.
 * Supports paragraphs (blank-line separated), "- " bullet lists,
 * and **bold** — without dangerouslySetInnerHTML.
 */
function bold(text: string, keyBase: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={`${keyBase}-${i}`}>{part}</strong> : <Fragment key={`${keyBase}-${i}`}>{part}</Fragment>
  );
}

export default function Prose({ text, className = "" }: { text: string; className?: string }) {
  const blocks = text.split(/\n\s*\n/).filter(Boolean);
  return (
    <div className={`space-y-4 text-base leading-relaxed ${className}`}>
      {blocks.map((block, bi) => {
        const lines = block.split("\n");
        const isList = lines.every((l) => l.trim().startsWith("- "));
        if (isList) {
          return (
            <ul key={bi} className="list-disc space-y-2 pl-5">
              {lines.map((l, li) => (
                <li key={li}>{bold(l.trim().slice(2), `${bi}-${li}`)}</li>
              ))}
            </ul>
          );
        }
        return <p key={bi}>{bold(block, `${bi}`)}</p>;
      })}
    </div>
  );
}
