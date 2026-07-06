"use client";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Fade-in-up scroll reveal wrapper.
 * - SSR: renders children visible (no flash)
 * - Client: hides sections below the fold, reveals on scroll
 * - prefers-reduced-motion: skipped entirely
 * - Sections already in viewport at load: skipped (no animation)
 */
export function FadeIn({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    // Already visible at page load — skip animation
    if (el.getBoundingClientRect().top < window.innerHeight - 60) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        requestAnimationFrame(() => {
          el.style.transition = `opacity 0.70s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.70s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
        observer.disconnect();
      },
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}
