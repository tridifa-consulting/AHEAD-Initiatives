/**
 * Shared Framer Motion variants for the documentary flow.
 * All variants respect prefers-reduced-motion at the component level via
 * the `useReducedMotion` hook from framer-motion.
 */
export const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export const FADE_IN = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export const STAGGER_CONTAINER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const CARD_HOVER = {
  rest:  { scale: 1,    y: 0,   transition: { duration: 0.3, ease: "easeOut" } },
  hover: { scale: 1.02, y: -4,  transition: { duration: 0.3, ease: "easeOut" } },
};

export const SLIDE_LEFT = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export const DRAW_LINE = {
  hidden: { scaleX: 0, originX: 0 },
  show:   { scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export const easing = {
  expo: [0.16, 1, 0.3, 1] as [number,number,number,number],
  snap: [0.22, 1, 0.36, 1] as [number,number,number,number],
};
