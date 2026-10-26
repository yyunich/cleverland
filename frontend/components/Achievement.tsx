import Link from "next/link";
import { TrophyIcon } from "./icons";

/** Достижения школы: международные фестивали, IT-лагеря */
export default function Achievement() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="card-glass relative overflow-hidden p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-neon-pink/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-neon-violet/20 blur-[100px]" />

        <div className="relative grid items-center gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-neon-pink">
              <TrophyIcon className="h-5 w-5" />
              Наши достижения
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
              Ученики Cleverland побеждают{" "}
              <span className="text-neon-gradient">на международных фестивалях</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
              Наши студенты участвуют в IT-фестивалях и турнирах по
              программированию. Так, Даниил Котович (14 лет) занял{" "}
              <span className="font-semibold text-white">
                2-е место по Python
              </span>{" "}
              на фестивале робототехники и программирования R:ED FEST с
              результатом 35,5 из 36 баллов.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">
              А в каникулы школа проводит тематические IT-лагеря: дети создают
              проекты и защищают их перед родителями и преподавателями.
            </p>
            <Link href="/courses" className="btn-outline mt-7">
              Выбрать направление
            </Link>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-neon-pink/30 bg-night-900/70 p-8 text-center shadow-glow-pink">
              <p className="font-display text-6xl font-bold text-neon-gradient">
                №2
              </p>
              <p className="mt-2 font-display text-lg text-white">место по Python</p>
              <p className="mt-1 text-sm text-slate-400">
                R:ED FEST — международный фестиваль робототехники и
                программирования
              </p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 py-4">
                <p className="font-display text-3xl font-bold text-white">
                  35,5<span className="text-neon-pink text-xl">/36</span>
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                  баллов из максимально возможных
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
