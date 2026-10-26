import { courses } from "@/lib/courses";

/** Неоновая бегущая строка с названиями курсов и направлений */
export default function Marquee() {
  const items = [
    ...courses.map((c) => c.title),
    "Программирование",
    "Разработка игр",
    "3D-моделирование",
    "Робототехника",
    "Подготовка к ЦЭ/ЦТ",
  ];

  const row = items.map((item, i) => (
    <span key={i} className="mx-6 flex items-center gap-6 whitespace-nowrap">
      <span className="font-display text-sm uppercase tracking-[0.25em] text-slate-300">
        {item}
      </span>
      <span className="text-neon-gradient text-lg">✦</span>
    </span>
  ));

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-night-900/70 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-night-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-night-950 to-transparent" />
      <div className="flex w-max animate-marquee">
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  );
}
