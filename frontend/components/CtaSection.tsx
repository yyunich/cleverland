import Reveal from "./Reveal";
import ApplicationForm from "./ApplicationForm";
import { CheckIcon } from "./icons";

/** Тёмная CTA-«глава» (Pillar 4): чёрный фон, белый текст, синие акценты */
export default function CtaSection({
  defaultCourse = "",
}: {
  defaultCourse?: string;
}) {
  return (
    <section id="apply" className="relative overflow-hidden bg-footer text-white">
      {/* Декоративное свечение */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-brand/25 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-64 w-96 rounded-full bg-brand/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:pt-2">
            <p className="eyebrow">Пробный урок — бесплатно</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Попробуйте —{" "}
              <span className="text-brand">это бесплатно</span>
              <span className="mt-2 block h-[3px] w-16 bg-brand" />
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">
              Оставьте заявку: администратор перезвонит, подберёт направление
              по возрасту и интересам ребёнка и запишет на бесплатный пробный
              урок.
            </p>

            <div className="mt-9 space-y-4">
              {[
                "Ответим в течение рабочего дня",
                "Подберём курс по возрасту и интересам",
                "Бесплатный пробный урок в центре Орши",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-brand text-white">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[15px] font-medium text-white/85">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <ApplicationForm defaultCourse={defaultCourse} theme="dark" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
