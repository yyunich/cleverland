"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Плавное появление блока при попадании во вьюпорт (Pillar 5).
 *
 * - SSR и среда без JavaScript: контент виден сразу (никакого скрытого текста)
 * - prefers-reduced-motion: reveal отключён — контент виден мгновенно
 * - Стаггер соседних элементов достигается пропом delay (мс)
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden = mounted && !visible;

  return (
    <Tag
      ref={ref as never}
      className={`${className} transition-all duration-700 ease-expo-out will-change-transform ${
        hidden ? "translate-y-7 opacity-0" : "translate-y-0 opacity-100"
      }`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
