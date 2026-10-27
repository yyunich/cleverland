import { courses } from "@/lib/courses";

/** Бегущая строка направлений — светлая, в стиле Skillbox */
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
    <span key={i} className="mx-7 flex items-center gap-7 whitespace-nowrap">
      <span className="text-base font-bold uppercase tracking-[0.14em] text-ink">
        {item}
      </span>
      <span className="text-brand">◆</span>
    </span>
  ));

  return (
    <div className="overflow-hidden border-b border-line bg-mist py-3.5">
      <div className="marquee-track flex w-max animate-marquee">
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  );
}
