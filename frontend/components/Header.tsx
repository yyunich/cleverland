"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PhoneIcon } from "./icons";
import { contactInfo } from "@/lib/courses";

const nav = [
  { href: "/", label: "Главная" },
  { href: "/courses", label: "Курсы" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-surface/95 backdrop-blur transition-shadow ${
        scrolled ? "border-line shadow-card" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Логотип — чистая типографика, как у Skillbox */}
        <Link href="/" className="flex items-baseline gap-1">
          <span className="font-display text-[1.55rem] font-extrabold tracking-tight text-ink">
            Clever<span className="text-brand">land</span>
          </span>
          <span className="ml-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Орша
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[15px] font-medium transition-colors hover:text-brand ${
                pathname === item.href ? "text-ink" : "text-ink-soft"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <a
            href={`tel:${contactInfo.phoneMainHref}`}
            className="flex items-center gap-2 text-[15px] font-medium text-ink transition-colors hover:text-brand"
          >
            <PhoneIcon className="h-4 w-4" />
            {contactInfo.phoneMain}
          </a>
          <Link href="/contacts" className="btn-dark !px-5 !py-2.5 text-sm">
            Записаться
          </Link>
        </div>

        {/* Мобильная кнопка */}
        <button
          type="button"
          aria-label="Меню"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden relative h-9 w-9 border border-line"
        >
          <span
            className={`absolute left-2 right-2 top-[16px] h-0.5 bg-ink transition-all ${
              menuOpen ? "rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-2 right-2 h-0.5 bg-ink transition-all ${
              menuOpen ? "top-[16px] -rotate-45" : "top-[10px]"
            }`}
          />
          <span
            className={`absolute left-2 right-2 h-0.5 bg-ink transition-all ${
              menuOpen ? "opacity-0" : "top-[22px]"
            }`}
          />
        </button>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="md:hidden border-t border-line bg-surface">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-3 text-base font-medium text-ink hover:bg-mist"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contacts"
              className="btn-dark mt-3 w-full"
              onClick={() => setMenuOpen(false)}
            >
              Записаться на пробный урок
            </Link>
            <a
              href={`tel:${contactInfo.phoneMainHref}`}
              className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-ink"
            >
              <PhoneIcon className="h-4 w-4" />
              {contactInfo.phoneMain}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

