import Link from "next/link";
import { TrophyIcon } from "./icons";

/** Достижения школы — чёрный CTA-блок в стиле Skillbox */
export default function Achievement() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="grid gap-0 bg-footer text-white lg:grid-cols-2">
        {/* Левая часть — контент на чёрном */}
        <div className="p-8 sm:p-12 lg:p-16">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            <TrophyIcon className="h-5 w-5" />
            Наши достижения
          </p>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Ученики Cleverland побеждают на международных фестивалях
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
            Наши студенты участвуют в IT-фестивалях и турнирах по
            программированию. Так, Даниил Котович (14 лет) занял{" "}
            <span className="font-semibold text-white">
              2-е место по Python
            </span>{" "}
            на фестивале робототехники и программирования R:ED FEST с
            результатом 35,5 из 36 баллов.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
            А в каникулы школа проводит тематические IT-лагеря: дети создают
            проекты и защищают их перед родителями и преподавателями.
          </p>
          <Link href="/courses" className="btn-white mt-9">
            Выбрать направление
          </Link>
        </div>

        {/* Правая часть — крупная цифра на чёрном */}
        <div className="flex flex-col justify-center border-t border-white/10 p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-16">
          <p className="font-display text-[5.5rem] font-extrabold leading-none tracking-tight text-white sm:text-[7rem]">
            №2
          </p>
          <p className="mt-4 font-display text-xl font-bold text-white">
            место по Python
          </p>
          <p className="mt-1.5 text-sm text-white/60">
            R:ED FEST — международный фестиваль робототехники и
            программирования
          </p>
          <div className="mt-8 inline-flex w-fit items-baseline gap-2 bg-promo px-5 py-3">
            <span className="font-display text-3xl font-extrabold text-ink">
              35,5
            </span>
            <span className="text-sm font-semibold text-ink">
              / 36 баллов из максимально возможных
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
