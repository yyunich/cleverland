import Reveal from "./Reveal";
import { BookIcon, ClockIcon, CheckIcon } from "./icons";

/** Бесплатная библиотека Cleverland (id используется в ссылках футера) */
export default function LibrarySection() {
  return (
    <section id="library" className="border-t border-line bg-mist">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Бесплатно для резидентов</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Библиотека <span className="text-brand">Cleverland</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Пространство на базе центра с книгами по психологии, бизнесу,
              копирайтингу и не только. Учиться полезно не только детям:
              резиденты центра могут взять книги домой бесплатно.
            </p>
            <ul className="mt-7 space-y-3.5 text-[15px] text-ink">
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-brand text-white">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                Выдача резидентам на 14 дней
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-brand text-white">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                По паспорту — просто и без формальностей
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-brand text-white">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                Книги по психологии, бизнесу и копирайтингу
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-px bg-line sm:grid-cols-2">
              <div className="flex flex-col justify-center bg-surface p-9 transition-colors duration-300 hover:bg-surface-2">
                <BookIcon className="h-7 w-7 text-brand" />
                <p className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink">
                  14 дней
                </p>
                <p className="mt-1.5 text-sm text-ink-soft">
                  срок выдачи книги домой
                </p>
              </div>
              <div className="flex flex-col justify-center bg-surface p-9 transition-colors duration-300 hover:bg-surface-2">
                <ClockIcon className="h-7 w-7 text-brand" />
                <p className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink">
                  10:00–21:00
                </p>
                <p className="mt-1.5 text-sm text-ink-soft">
                  центр открыт ежедневно
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

