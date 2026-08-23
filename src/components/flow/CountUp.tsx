"use client";

import {
  useEffect,
  useRef,
} from "react";
import {
  useInView,
  useReducedMotion,
} from "framer-motion";

/**
 * Progressive count-up enhancement.
 *
 * Important principles:
 *
 * 1. The real CMS/source value is rendered during SSR and first paint.
 * 2. JavaScript is NOT required for the correct number to appear.
 * 3. Invalid, blank or non-numeric values are never converted to 0.
 * 4. prefers-reduced-motion receives the final value with no animation.
 * 5. Animation updates the text node directly rather than forcing a
 *    React re-render on every requestAnimationFrame.
 *
 * Visual styling intentionally belongs to the parent component.
 */
export default function CountUp({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const match =
    /^(\d+)\s*(.*)$/.exec(
      value ?? ""
    );

  const target = match
    ? Number.parseInt(
        match[1],
        10
      )
    : Number.NaN;

  const suffix =
    match?.[2] ?? "";

  const valid =
    Number.isFinite(target) &&
    target >= 0;

  const ref =
    useRef<HTMLSpanElement>(
      null
    );

  const ran =
    useRef(false);

  const previousValue =
    useRef(value);

  const inView = useInView(
    ref,
    {
      once: true,
      amount: 0.55,
    }
  );

  const reduced =
    useReducedMotion();

  /*
   * If the source value ever changes during the lifetime of
   * the component, allow the new value to animate independently.
   */
  useEffect(() => {
    if (
      previousValue.current !==
      value
    ) {
      previousValue.current =
        value;

      ran.current = false;

      if (ref.current) {
        ref.current.textContent =
          value;
      }
    }
  }, [value]);

  useEffect(() => {
    const element =
      ref.current;

    if (
      !element ||
      !valid ||
      reduced ||
      !inView ||
      ran.current
    ) {
      return;
    }

    ran.current = true;

    const duration = 1400;

    let frame = 0;
    let startTime:
      | number
      | null = null;

    /*
     * Ease-out quart:
     * fast enough to feel responsive at the start,
     * but settles softly into the final value.
     */
    const easeOutQuart = (
      progress: number
    ) =>
      1 -
      Math.pow(
        1 - progress,
        4
      );

    const tick = (
      now: number
    ) => {
      if (
        startTime === null
      ) {
        startTime = now;
      }

      const elapsed =
        now - startTime;

      const progress =
        Math.min(
          1,
          elapsed / duration
        );

      const eased =
        easeOutQuart(
          progress
        );

      const current =
        Math.round(
          target * eased
        );

      /*
       * Only the visible text changes.
       * aria-label continues to expose the authoritative final value.
       */
      element.textContent =
        `${current}${suffix}`;

      if (progress < 1) {
        frame =
          requestAnimationFrame(
            tick
          );
      } else {
        /*
         * Always restore the exact supplied source string.
         * This matters if its spacing/suffix formatting differs
         * from our parsed representation.
         */
        element.textContent =
          value;
      }
    };

    /*
     * Begin on the next paint.
     *
     * Until this moment the SSR/source value remains visible,
     * which protects correctness if JS is slow or interrupted.
     */
    frame =
      requestAnimationFrame(
        tick
      );

    return () => {
      cancelAnimationFrame(
        frame
      );

      /*
       * Never leave a partially animated number behind.
       */
      if (element) {
        element.textContent =
          value;
      }
    };
  }, [
    inView,
    reduced,
    target,
    suffix,
    valid,
    value,
  ]);

  /*
   * Invalid/non-numeric data is displayed exactly as supplied.
   */
  if (!valid) {
    return (
      <span
        className={className}
      >
        {value}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={`tabular-nums ${className}`}
      aria-label={value}
    >
      {value}
    </span>
  );
}
