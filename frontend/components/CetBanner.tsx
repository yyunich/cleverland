import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { CheckIcon } from "./icons";

const subjects = ["История Беларуси", "Обществоведение", "Английский язык", "Русский язык"];

export default function CetBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
      <Reveal>
        <div className="border border-line bg-white">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-14">
              <SectionHeading
                align="left"
                eyebrow="Выпускникам 11 класса"
                title={
                  <>
                    Подготовка к ЦЭ/ЦТ —{" "}
                    <span className="text-brand">понимание вместо зубрёжки</span>
                  </>
                }
                subtitle="«Клеверленд» — это подготовка, где ребёнок понимает материал, а не просто заучивает. Осознанное решение тестов без паники, дискуссии, работа в парах и регулярные пробные тесты с видимым прогрессом."
              />

              <div className="mt-7 flex flex-wrap gap-2.5">
                {subjects.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 border border-line bg-mist px-3.5 py-2 text-sm font-medium text-ink transition-colors duration-300 hover:border-brand hover:bg-brand-faint"
                  >
                    <CheckIcon className="h-4 w-4 text-brand" />
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/courses/cet" className="btn-dark">
                  Подробнее о курсе
                </Link>
                <Link href="/contacts" className="btn-outline">
                  Записаться
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px border-t border-line bg-line lg:border-l lg:border-t-0">
              {[
                { big: "2 раза", small: "в неделю по 90 минут" },
                { big: "до 8", small: "человек в группе" },
                { big: "4", small: "предмета на выбор" },
                { big: "11", small: "класс — ваш шанс всё успеть" },
              ].map((f) => (
                <div key={f.big} className="flex flex-col justify-center bg-white p-8 text-center transition-colors duration-300 hover:bg-brand-faint">
                  <p className="font-display text-4xl font-extrabold tracking-tight text-ink">
                    {f.big}
                  </p>
                  <p className="mt-2.5 text-sm leading-snug text-ink-soft">{f.small}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
