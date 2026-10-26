import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { CheckIcon } from "./icons";

const subjects = ["История Беларуси", "Обществоведение", "Английский язык", "Русский язык"];

export default function CetBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
      <div className="relative overflow-hidden rounded-3xl border border-orange-400/30 bg-gradient-to-br from-night-800 via-night-900 to-night-800 p-8 sm:p-12">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-orange-500/15 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-rose-500/15 blur-[90px]" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Выпускникам 11 класса"
              title={
                <>
                  Подготовка к ЦЭ/ЦТ —{" "}
                  <span className="text-neon-gradient">понимание вместо зубрёжки</span>
                </>
              }
              subtitle="«Клеверленд» — это подготовка, где ребёнок понимает материал, а не просто заучивает. Осознанное решение тестов без паники, дискуссии, работа в парах и регулярные пробные тесты с видимым прогрессом."
            />
            <div className="mt-6 flex flex-wrap gap-2.5">
              {subjects.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-slate-200"
                >
                  <CheckIcon className="h-4 w-4 text-neon-lime" />
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/courses/cet" className="btn-primary">
                Подробнее о курсе
              </Link>
              <Link href="/contacts" className="btn-outline">
                Записаться
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { big: "2 раза", small: "в неделю по 90 минут" },
              { big: "до 8", small: "человек в группе" },
              { big: "4", small: "предмета на выбор" },
              { big: "11", small: "класс — ваш шанс всё успеть" },
            ].map((f) => (
              <div
                key={f.big}
                className="rounded-2xl border border-white/10 bg-night-950/60 p-6 text-center"
              >
                <p className="font-display text-3xl font-bold text-neon-gradient">
                  {f.big}
                </p>
                <p className="mt-1.5 text-sm text-slate-400">{f.small}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
