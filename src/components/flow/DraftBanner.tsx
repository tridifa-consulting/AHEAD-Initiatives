/** Shown only to staff while draft preview is on. */
export default function DraftBanner() {
  return (
    <div className="bg-[#E9B44C] px-4 py-2 text-center text-sm font-medium text-[#1F2933]">
      Draft preview — you are seeing unpublished content.{" "}
      <a href="/api/draft?disable=1" className="underline underline-offset-2">Exit preview</a>
    </div>
  );
}
