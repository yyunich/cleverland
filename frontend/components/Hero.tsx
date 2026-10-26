import Link from "next/link";
import { ClockIcon, PinIcon } from "./icons";
import { contactInfo } from "@/lib/courses";

const stats = [
  { value: "8+", label: "IT-направлений" },
  { value: "6–17", label: "лет — возраст учеников" },
  { value: "до 8", label: "человек в группе" },
  { value: "1 пробный", label: "урок — бесплатно" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Светлая сетка и лёгкий синий градиент */}
      <div className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 bg-brand-light opacity-60 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Промо-бейдж в фирменном жёлтом Skillbox */}
          <div className="animate-fade-up inline-flex items-center gap-2 bg-promo px-4 py-2 text-sm font-bold text-ink">
            <span className="inline-block h-1.5 w-1.5 shrink-0 bg-brand" />
            Набор 2026–2027 · бесплатный пробный урок
          </div>

          <h1 className="animate-fade-up mt-8 font-display text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[4.2rem] [animation-delay:80ms]">
            Влюбляем детей{" "}
            <span className="brand-marker text-brand">в&nbsp;программирование</span>
            <br className="hidden sm:block" />
            <span className="text-ink">с 6 лет</span>
          </h1>

          <p className="animate-fade-up mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft [animation-delay:160ms]">
            IT-школа в центре Орши: от первого кода до профессиональной
            разработки. Scratch, Roblox, Python, Godot, Blender, базы данных,
            робототехника, английский язык и подготовка к ЦЭ/ЦТ.
          </p>

          <div className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row [animation-delay:240ms]">
            <Link href="/contacts" className="btn-primary w-full sm:w-auto !px-8">
              Записаться на бесплатный пробный урок
            </Link>
            <Link href="/courses" className="btn-outline w-full sm:w-auto">
              Все курсы
            </Link>
          </div>

          <p className="animate-fade-up mt-5 text-sm text-ink-faint [animation-delay:300ms]">
            ООО «КЛЕВЕРЛЕНД» · УНП 391988173 · очно в центре Орши
          </p>
        </div>

        {/* Статистика — квадратные плашки, как у Skillbox */}
        <div className="animate-fade-up mt-16 grid grid-cols-2 gap-px bg-line lg:grid-cols-4 [animation-delay:360ms]">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-7 text-center">
              <p className="font-display text-4xl font-extrabold tracking-tight text-ink">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-ink-soft">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Контактная строка */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-ink-soft sm:flex-row sm:gap-8">
          <a
            href={`tel:${contactInfo.phoneMainHref}`}
            className="flex items-center gap-2 font-medium text-ink transition-colors hover:text-brand"
          >
            <PhoneSquare />
            {contactInfo.phoneMain}
          </a>
          <span className="flex items-center gap-2">
            <PinIcon className="h-4 w-4 text-brand" />
            {contactInfo.address}, {contactInfo.addressDetail}
          </span>
          <span className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-brand" />
            {contactInfo.workHours}
          </span>
        </div>
      </div>
    </section>
  );
}

function PhoneSquare() {
  return (
    <span className="flex h-5 w-5 items-center justify-center bg-brand text-white">
      <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" stroke="currentColor" strokeWidth="2.2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    </span>
  );
}
