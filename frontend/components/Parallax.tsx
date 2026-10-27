"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Лёгкий параллакс для ДЕКОРАТИВНЫХ фоновых слоёв (Pillar 5).
 *
 * Правила из top-design:
 *  - никогда на тексте и контенте — только фон/декорация
 *  - transform + rAF (60fps), без влияния на layout
 *  - prefers-reduced-motion: элемент статичен
 */
export default function Parallax({
  children,
  className = "",
  speed = 0.12,
}: {
  children: ReactNode;
  className?: string;
  /** Доля прокрутки страницы, на которую сдвигается слой */
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const offset = window.scrollY - rect.top;
        const y = offset * speed;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}
