"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Хореографическое появление строки: скольжение вверх после гидратации.
 *
 * Фазы:
 *  0 — статика (SSR / без JS / до mount): контент полностью виден
 *  1 — скрытие в том же кадре (до repaint, мигания нет)
 *  2 — показ с кастомной кривой и задержкой (stagger)
 *
 * prefers-reduced-motion: сразу фаза 2 — контент виден без анимации.
 */
export default function LineReveal({
  children,
  delay = 0,
  className = "",
  innerClassName = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  innerClassName?: string;
}) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(2);
      return;
    }
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      setPhase(1);
      raf2 = requestAnimationFrame(() => setPhase(2));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return (
    <span className={`block overflow-hidden ${className}`}>
      <span
        className={`block will-change-transform ${innerClassName} ${
          phase === 2
            ? "translate-y-0 opacity-100 transition-all duration-700 ease-expo-out"
            : "translate-y-[110%] opacity-0"
        }`}
        style={phase === 2 && delay ? { transitionDelay: `${delay}ms` } : undefined}
      >
        {children}
      </span>
    </span>
  );
}
