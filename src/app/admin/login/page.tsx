"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    if (error) {
      setError("That email and password combination didn't work. Check both and try again.");
      setBusy(false);
      return;
    }
    router.replace(params.get("next") ?? "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-[#16324F]/10 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Image src="/logo.jpg" alt="" width={40} height={40} className="rounded-full" />
        <div>
          <div className="font-serif text-lg font-semibold text-[#16324F]">AHEAD Admin</div>
          <div className="text-xs text-[#1F2933]/60">Website content panel</div>
        </div>
      </div>
      <label className="mb-3 block">
        <span className="mb-1 block text-sm font-medium text-[#16324F]">Email</span>
        <input
          type="email" required autoComplete="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-[#16324F]/15 px-3 py-2 text-sm outline-none focus:border-[#C65D3B] focus:ring-1 focus:ring-[#C65D3B]"
        />
      </label>
      <label className="mb-4 block">
        <span className="mb-1 block text-sm font-medium text-[#16324F]">Password</span>
        <input
          type="password" required autoComplete="current-password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-[#16324F]/15 px-3 py-2 text-sm outline-none focus:border-[#C65D3B] focus:ring-1 focus:ring-[#C65D3B]"
        />
      </label>
      {error && <p role="alert" className="mb-4 text-sm text-[#C65D3B]">{error}</p>}
      <button
        type="submit" disabled={busy}
        className="w-full rounded-lg bg-[#16324F] py-2.5 text-sm font-medium text-white hover:bg-[#1e4266] disabled:opacity-60"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F0] px-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
