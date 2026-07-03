"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useInView } from "framer-motion";

export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced || target === null ? target ?? 0 : 0);

  useEffect(() => {
    if (!inView || target === null || reduced) {
      if (target !== null) setTimeout(() => setDisplay(target), 0);
      return;
    }
    const start = performance.now();
    const dur = 1600;
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduced]);

  if (target === null) return <span className={className}>{value}</span>;
  return <span ref={ref} className={className} aria-label={value}>{display}{suffix}</span>;
}
