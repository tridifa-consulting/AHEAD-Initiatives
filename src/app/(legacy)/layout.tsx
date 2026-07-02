import Header from "@/components/Header";

/** Legacy pages keep the original header until their prose is migrated into the flow. */
export default function LegacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
