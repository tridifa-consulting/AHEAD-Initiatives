"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Count-up as progressive enhancement.
 * CRITICAL: the real value is rendered on the server and on first paint, so
 * the number is always correct even if JavaScript never runs, hydration is
 * delayed, or the observer never fires. The count animation only replaces it
 * after mount, in view, with motion allowed. 0 / -1 / blank can never render.
 */
export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const match = /^(\d+)\s*(.*)$/.exec(value ?? "");
  const target = match ? Number.parseInt(match[1], 10) : NaN;
  const suffix = match ? match[2] : "";
  const valid = Number.isFinite(target) && target >= 0;

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [animated, setAnimated] = useState<number | null>(null); // null = show real value
  const ran = useRef(false);

  useEffect(() => {
    if (!valid || reduced || !inView || ran.current) return;
    ran.current = true;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setAnimated(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setAnimated(null); // hand back to the source-of-truth value
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, target, valid]);

  if (!valid) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className} aria-label={value}>
      {animated ?? target}
      {suffix}
    </span>
  );
}
