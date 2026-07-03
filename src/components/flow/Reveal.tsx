
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function Reveal({
  children, className = "", delay = 0, variant = "up",
}: {
  children: React.ReactNode; className?: string; delay?: number; variant?: "up" | "fade";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduced = useReducedMotion();

  if (reduced) return <div ref={ref} className={className}>{children}</div>;

  const initial = variant === "fade" ? { opacity: 0 } : { opacity: 0, y: 28 };
  const animate = inView ? { opacity: 1, y: 0 } : (variant === "fade" ? { opacity: 0 } : { opacity: 0, y: 28 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
    >
      {children}
    </motion.div>
  );
}
