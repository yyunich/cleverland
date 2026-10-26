"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoIcon, PhoneIcon } from "./icons";
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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-night-950/85 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
        <Link href="/" className="group flex items-center gap-2.5">
          <LogoIcon className="h-9 w-9 transition-transform group-hover:scale-110" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-wide text-white">
              Clever<span className="text-neon-gradient">land</span>
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              IT-школа · Орша
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-neon-cyan ${
                pathname === item.href ? "text-white" : "text-slate-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <a
            href={`tel:${contactInfo.phoneMainHref}`}
            className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-neon-cyan"
          >
            <PhoneIcon className="h-4 w-4" />
            {contactInfo.phoneMain}
          </a>
          <Link href="/contacts" className="btn-primary !px-5 !py-2.5 text-sm">
            Записаться
          </Link>
        </div>

        {/* Мобильная кнопка */}
        <button
          type="button"
          aria-label="Меню"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden relative h-10 w-10 rounded-xl border border-white/10 bg-white/5"
        >
          <span
            className={`absolute left-2.5 right-2.5 top-[17px] h-0.5 rounded bg-white transition-all ${
              menuOpen ? "rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-2.5 right-2.5 h-0.5 rounded bg-white transition-all ${
              menuOpen ? "top-[17px] -rotate-45" : "top-[11px]"
            }`}
          />
          <span
            className={`absolute left-2.5 right-2.5 h-0.5 rounded bg-white transition-all ${
              menuOpen ? "opacity-0" : "top-[23px]"
            }`}
          />
        </button>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-night-950/95 backdrop-blur-xl">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-base font-medium text-slate-200 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contacts"
              className="btn-primary mt-3 w-full"
              onClick={() => setMenuOpen(false)}
            >
              Записаться на пробный урок
            </Link>
            <a
              href={`tel:${contactInfo.phoneMainHref}`}
              className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-300"
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
