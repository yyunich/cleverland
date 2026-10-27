import Link from "next/link";
import {
  ClockIcon,
  InstagramIcon,
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
    <footer className="bg-footer text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Бренд */}
          <div>
            <p className="font-display text-2xl font-extrabold tracking-tight">
              Clever<span className="text-brand">land</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              IT-школа и детский центр развития в Орше. Влюбляем детей в
              программирование с 6 лет и помогаем понять, как устроены
              технологии.
            </p>
            <p className="mt-5 text-xs text-white/40">
              ООО «КЛЕВЕРЛЕНД» · УНП 391988173
            </p>
          </div>

          {/* Направления */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
              Направления
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {categoryOrder.map((cat) => (
                <li key={cat}>
                  <Link
                    href="/courses"
                    className="text-white/65 transition-colors hover:text-white"
                  >
                    {categories[cat].title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#library"
                  className="text-white/65 transition-colors hover:text-white"
                >
                  Бесплатная библиотека
                </Link>
              </li>
            </ul>
          </div>

          {/* Популярные курсы */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
              Курсы
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {courses.slice(0, 6).map((course) => (
                <li key={course.slug}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-white/65 transition-colors hover:text-white"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
              Контакты
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm text-white/65">
              <li>
                <a
                  href={`tel:${contactInfo.phoneMainHref}`}
                  className="flex items-start gap-2.5 transition-colors hover:text-white"
                >
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>
                    {contactInfo.phoneMain}
                    <span className="block text-xs text-white/40">
                      {contactInfo.phoneSecond}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  {contactInfo.address}
                  <span className="block text-xs text-white/40">
                    {contactInfo.addressDetail}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{contactInfo.workHours}</span>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-2.5">
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.vk}
                target="_blank"
                rel="noreferrer"
                aria-label="ВКонтакте"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                <VkIcon className="h-5 w-5" />
              </a>
              <a
                href={`https://t.me/+${contactInfo.phoneMainHref.slice(1)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                <TelegramIcon className="h-5 w-5" />
              </a>
              <a
                href={`viber://chat?number=${contactInfo.phoneMainHref.slice(1)}`}
                aria-label="Viber"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                <ViberIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {year} ООО «КЛЕВЕРЛЕНД» · IT-школа Cleverland · г. Орша, ул. Мира, 8</p>
          <p>Сайт работает на Next.js + FastAPI</p>
        </div>

        {/* Гигантская контурная типографика — signature detail в футере */}
        <div className="pointer-events-none mt-10 select-none overflow-hidden" aria-hidden="true">
          <p className="text-outline-giant-light whitespace-nowrap text-center font-display text-[17vw] font-extrabold leading-[0.85] tracking-tight">
            CLEVERLAND
          </p>
        </div>
      </div>
    </footer>
  );
}

