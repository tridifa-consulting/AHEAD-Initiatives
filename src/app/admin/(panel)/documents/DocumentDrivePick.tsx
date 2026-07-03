"use client";

import { useState } from "react";
import DrivePicker, { type DrivePick } from "@/components/admin/DrivePicker";

/** Client island inside the document form: picks a Drive file into hidden fields. */
export default function DocumentDrivePick({
  initialId, initialUrl,
}: { initialId?: string | null; initialUrl?: string | null }) {
  const [pick, setPick] = useState<DrivePick | null>(null);
  return (
    <div className="mb-4">
      <DrivePicker kind="documents" onPick={setPick} />
      {(pick || initialId) && (
        <span className="ml-3 align-middle text-sm text-[#2D6A4F]">
          {pick ? <>Picked: <strong>{pick.name}</strong> — set Source to “Google Drive” and save.</> : "A Drive file is linked."}
        </span>
      )}
      <input type="hidden" name="drive_file_id" value={pick?.driveFileId ?? initialId ?? ""} />
      <input type="hidden" name="drive_url" value={pick?.url ?? initialUrl ?? ""} />
      <input type="hidden" name="drive_thumbnail" value={pick?.thumbnailUrl ?? ""} />
    </div>
  );
}
