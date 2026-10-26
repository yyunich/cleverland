import Link from "next/link";
import { ClockIcon, PinIcon, SparkleIcon } from "./icons";
import { contactInfo } from "@/lib/courses";

const stats = [
  { value: "8+", label: "IT-направлений" },
  { value: "6–17", label: "лет — возраст учеников" },
  { value: "до 8", label: "человек в группе" },
  { value: "1 пробный", label: "урок — бесплатно" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Фон */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />
      <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-neon-violet/25 blur-[130px]" />
      <div className="absolute top-10 -right-32 h-[380px] w-[380px] rounded-full bg-neon-cyan/15 blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 h-[260px] w-[420px] rounded-full bg-neon-pink/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* Бейдж */}
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-neon-violet/40 bg-neon-violet/10 px-4 py-1.5 text-sm text-violet-200">
            <SparkleIcon className="h-4 w-4 text-neon-pink" />
            Набор 2026–2027 · ООО «КЛЕВЕРЛЕНД» · Орша
          </div>

          <h1
            className="animate-fade-up mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl [animation-delay:100ms]"
          >
            Влюбляем детей{" "}
            <span className="text-neon-gradient">в программирование</span>
            <br className="hidden sm:block" /> с 6 лет
          </h1>

          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 [animation-delay:200ms]">
            IT-школа в центре Орши: от первого кода до профессиональной
            разработки. Scratch, Roblox, Python, Godot, Blender, базы данных,
            робототехника, английский язык и подготовка к ЦЭ/ЦТ.
          </p>

          <div className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row [animation-delay:300ms]">
            <Link href="/contacts" className="btn-primary w-full sm:w-auto">
              Записаться на бесплатный пробный урок
            </Link>
            <Link href="/courses" className="btn-outline w-full sm:w-auto">
              Смотреть курсы
            </Link>
          </div>

          <p className="animate-fade-up mt-4 text-sm text-slate-500 [animation-delay:350ms]">
            Занятия очно в центре Орши · группы до 8 человек
          </p>
        </div>

        {/* Статистика */}
        <div className="animate-fade-up mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 [animation-delay:400ms]">
          {stats.map((s) => (
            <div
              key={s.label}
              className="card-glass flex flex-col items-center gap-1 px-4 py-6 text-center"
            >
              <span className="font-display text-2xl font-bold text-neon-gradient">
                {s.value}
              </span>
              <span className="text-sm text-slate-400">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Контактная строка */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-sm text-slate-400 sm:flex-row sm:gap-8">
          <a
            href={`tel:${contactInfo.phoneMainHref}`}
            className="flex items-center gap-2 transition-colors hover:text-neon-cyan"
          >
            <SparkleIcon className="h-4 w-4 text-neon-violet" />
            {contactInfo.phoneMain}
          </a>
          <span className="flex items-center gap-2">
            <PinIcon className="h-4 w-4 text-neon-pink" />
            {contactInfo.address}, {contactInfo.addressDetail}
          </span>
          <span className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-neon-cyan" />
            {contactInfo.workHours}
          </span>
        </div>
      </div>
    </section>
  );
}
