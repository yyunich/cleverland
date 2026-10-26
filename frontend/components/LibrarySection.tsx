import { BookIcon, ClockIcon, CheckIcon } from "./icons";

/** Бесплатная библиотека Cleverland (id используется в ссылках футера) */
export default function LibrarySection() {
  return (
    <section id="library" className="border-t border-white/10 bg-night-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neon-lime">
              Бесплатно для резидентов
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Библиотека <span className="text-neon-gradient">Cleverland</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
              Пространство на базе центра с книгами по психологии, бизнесу,
              копирайтингу и не только. Учиться полезно не только детям:
              резиденты центра могут взять книги домой бесплатно.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckIcon className="h-4 w-4 shrink-0 text-neon-lime" />
                Выдача резидентам на 14 дней
              </li>
              <li className="flex items-center gap-2.5">
                <CheckIcon className="h-4 w-4 shrink-0 text-neon-lime" />
                По паспорту — просто и без формальностей
              </li>
              <li className="flex items-center gap-2.5">
                <CheckIcon className="h-4 w-4 shrink-0 text-neon-lime" />
                Книги по психологии, бизнесу и копирайтингу
              </li>
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card-glass p-7">
              <BookIcon className="h-8 w-8 text-neon-violet" />
              <p className="mt-4 font-display text-xl font-semibold text-white">
                14 дней
              </p>
              <p className="mt-1 text-sm text-slate-400">
                срок выдачи книги домой
              </p>
            </div>
            <div className="card-glass p-7">
              <ClockIcon className="h-8 w-8 text-neon-cyan" />
              <p className="mt-4 font-display text-xl font-semibold text-white">
                10:00–21:00
              </p>
              <p className="mt-1 text-sm text-slate-400">
                центр открыт ежедневно
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
