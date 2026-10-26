import Link from "next/link";
import {
  ClockIcon,
  HeartIcon,
  InstagramIcon,
  LogoIcon,
  PhoneIcon,
  PinIcon,
  TelegramIcon,
  ViberIcon,
  VkIcon,
} from "./icons";
import { contactInfo, courses, categories, categoryOrder } from "@/lib/courses";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-night-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Бренд */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <LogoIcon className="h-8 w-8" />
              <span className="font-display text-lg text-white">
                Clever<span className="text-neon-gradient">land</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              IT-школа и детский центр развития в Орше. Влюбляем детей в
              программирование с 6 лет и помогаем понять, как устроены
              технологии.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              ООО «КЛЕВЕРЛЕНД» · УНП 391988173
            </p>
          </div>

          {/* Направления */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-slate-300">
              Направления
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categoryOrder.map((cat) => (
                <li key={cat}>
                  <Link
                    href="/courses"
                    className="text-slate-400 transition-colors hover:text-neon-cyan"
                  >
                    {categories[cat].title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#library"
                  className="text-slate-400 transition-colors hover:text-neon-cyan"
                >
                  Бесплатная библиотека
                </Link>
              </li>
            </ul>
          </div>

          {/* Популярные курсы */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-slate-300">
              Курсы
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {courses.slice(0, 6).map((course) => (
                <li key={course.slug}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-slate-400 transition-colors hover:text-neon-cyan"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-slate-300">
              Контакты
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-slate-400">
              <li>
                <a
                  href={`tel:${contactInfo.phoneMainHref}`}
                  className="flex items-start gap-2.5 transition-colors hover:text-neon-cyan"
                >
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-neon-violet" />
                  <span>
                    {contactInfo.phoneMain}
                    <span className="block text-xs text-slate-500">
                      {contactInfo.phoneSecond}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-neon-pink" />
                <span>
                  {contactInfo.address}
                  <span className="block text-xs text-slate-500">
                    {contactInfo.addressDetail}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-neon-cyan" />
                <span>{contactInfo.workHours}</span>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-neon-pink/60 hover:text-neon-pink"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.vk}
                target="_blank"
                rel="noreferrer"
                aria-label="ВКонтакте"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-neon-cyan/60 hover:text-neon-cyan"
              >
                <VkIcon className="h-5 w-5" />
              </a>
              <a
                href={`https://t.me/+${contactInfo.phoneMainHref.slice(1)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-sky-400/60 hover:text-sky-400"
              >
                <TelegramIcon className="h-5 w-5" />
              </a>
              <a
                href={`viber://chat?number=${contactInfo.phoneMainHref.slice(1)}`}
                aria-label="Viber"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-violet-400/60 hover:text-violet-400"
              >
                <ViberIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {year} ООО «КЛЕВЕРЛЕНД» · IT-школа Cleverland · г. Орша, ул.
            Мира, 8
          </p>
          <p className="flex items-center gap-1.5">
            <HeartIcon className="h-3.5 w-3.5 text-neon-pink" />
            Влюбляем детей в программирование
          </p>
        </div>
      </div>
    </footer>
  );
}
