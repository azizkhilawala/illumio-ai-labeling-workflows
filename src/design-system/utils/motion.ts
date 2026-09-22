/**
 * Shared motion utilities and constants for the design system.
 * Includes prefers-reduced-motion support for accessibility.
 */

export const MOTION_CONFIG = {
  spring: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
  },
  exit: {
    duration: 0.15,
    ease: "easeIn" as const,
  },
  overlay: {
    duration: 0.2,
  },
} as const;

import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Hook to check if user prefers reduced motion.
 * Returns true if the user has requested reduced motion.
 * SSR-safe: returns false during SSR and hydration.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

/**
 * Returns animation props that respect prefers-reduced-motion.
 * When reduced motion is preferred, animations are instant (duration: 0).
 */
export function getMotionProps(reducedMotion: boolean) {
  if (reducedMotion) {
    return {
      transition: { duration: 0 },
    };
  }
  return {
    transition: MOTION_CONFIG.spring,
  };
}

/**
 * Standard animation variants for modals, slideouts, and overlays.
 */
export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
} as const;

export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} as const;

export const slideoutVariants = {
  hidden: {
    x: "100%",
    opacity: 0.8,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: "100%",
    opacity: 0.8,
  },
} as const;

export const toastVariants = {
  initial: {
    opacity: 0,
    y: -20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    x: 100,
    scale: 0.95,
  },
} as const;

export const tabSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
} as const;
