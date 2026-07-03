/** Shared admin form primitives — plain, labelled, keyboard-friendly. */

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-[#16324F]">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-[#1F2933]/55">{hint}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-[#16324F]/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#C65D3B] focus:ring-1 focus:ring-[#C65D3B] disabled:bg-[#16324F]/5";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputCls} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={props.rows ?? 5} {...props} className={inputCls} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={inputCls} />;
}

export function Checkbox({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-[#1F2933]">
      <input type="checkbox" {...props} className="h-4 w-4 rounded border-[#16324F]/25 accent-[#2D6A4F]" />
      {label}
    </label>
  );
}

/** English/Bengali paired inputs for a bilingual jsonb field. */
export function Bilingual({
  label, name, en, bn, rows,
}: { label: string; name: string; en?: string; bn?: string; rows?: number }) {
  const Cmp = rows ? TextArea : TextInput;
  return (
    <fieldset className="rounded-lg border border-[#16324F]/10 p-4">
      <legend className="px-1 text-sm font-medium text-[#16324F]">{label}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="English">
          <Cmp name={`${name}_en`} defaultValue={en ?? ""} rows={rows} />
        </Field>
        <Field label="বাংলা (Bengali)">
          <Cmp name={`${name}_bn`} defaultValue={bn ?? ""} rows={rows} lang="bn" />
        </Field>
      </div>
    </fieldset>
  );
}

export function SaveBar({ backHref, saved }: { backHref: string; saved?: boolean }) {
  return (
    <div className="flex items-center gap-3 border-t border-[#16324F]/10 pt-5">
      <button
        type="submit"
        className="rounded-lg bg-[#2D6A4F] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#245a42] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D6A4F]"
      >
        Save changes
      </button>
      <a href={backHref} className="text-sm text-[#16324F]/70 hover:underline">Back to list</a>
      {saved && <span role="status" className="text-sm font-medium text-[#2D6A4F]">Saved.</span>}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
        status === "published" ? "bg-[#2D6A4F]/10 text-[#2D6A4F]" : "bg-[#E9B44C]/20 text-[#8a6414]"
      }`}
    >
      {status}
    </span>
  );
}
