import type { Metadata } from "next";
import ApplicationForm from "@/components/ApplicationForm";
import SectionHeading from "@/components/SectionHeading";
import {
  ClockIcon,
  InstagramIcon,
  PhoneIcon,
  PinIcon,
  TelegramIcon,
  ViberIcon,
  VkIcon,
} from "@/components/icons";
import { contactInfo } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Контакты и запись",
  description:
    "IT-школа Cleverland в Орше: ул. Мира, 8 (бизнес-инкубатор, 2-й этаж). Телефоны +375 (29) 569-45-50, +375 (29) 637-60-34. Ежедневно с 10:00 до 21:00. Запись на бесплатный пробный урок.",
};

export default function ContactsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-16">
        <SectionHeading
          eyebrow="Мы в центре Орши"
          title={
            <>
              Контакты и <span className="text-neon-gradient">запись</span>
            </>
          }
          subtitle="Приходите знакомиться, звоните или пишите в мессенджеры — подберём направление и запишем на бесплатный пробный урок."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Контактная информация */}
          <div className="space-y-4">
            <div className="card-glass p-7">
              <h3 className="font-display text-lg font-semibold text-white">
                Адрес
              </h3>
              <p className="mt-3 flex items-start gap-3 text-sm text-slate-300">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-neon-pink" />
                <span>
                  {contactInfo.address}
                  <span className="block text-slate-500">
                    {contactInfo.addressDetail} (бизнес-инкубатор, 2-й этаж)
                  </span>
                </span>
              </p>
              <p className="mt-3 flex items-start gap-3 text-sm text-slate-300">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-neon-cyan" />
                <span>
                  Режим работы
                  <span className="block text-slate-500">
                    {contactInfo.workHours}
                  </span>
                </span>
              </p>
            </div>

            <div className="card-glass p-7">
              <h3 className="font-display text-lg font-semibold text-white">
                Телефоны
              </h3>
              <div className="mt-4 space-y-3">
                <a
                  href={`tel:${contactInfo.phoneMainHref}`}
                  className="flex items-center gap-3 text-base text-slate-200 transition-colors hover:text-neon-cyan"
                >
                  <PhoneIcon className="h-5 w-5 text-neon-violet" />
                  {contactInfo.phoneMain}
                  <span className="text-xs text-slate-500">(администратор)</span>
                </a>
                <a
                  href={`tel:${contactInfo.phoneSecondHref}`}
                  className="flex items-center gap-3 text-base text-slate-200 transition-colors hover:text-neon-cyan"
                >
                  <PhoneIcon className="h-5 w-5 text-neon-pink" />
                  {contactInfo.phoneSecond}
                </a>
              </div>

              <h3 className="mt-6 font-display text-base font-semibold text-white">
                Мессенджеры и соцсети
              </h3>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={`https://t.me/+${contactInfo.phoneMainHref.slice(1)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 transition-colors hover:border-sky-400/60 hover:text-sky-400"
                >
                  <TelegramIcon className="h-4 w-4" /> Telegram
                </a>
                <a
                  href={`viber://chat?number=${contactInfo.phoneMainHref.slice(1)}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 transition-colors hover:border-violet-400/60 hover:text-violet-400"
                >
                  <ViberIcon className="h-4 w-4" /> Viber
                </a>
                <a
                  href={`https://wa.me/${contactInfo.phoneMainHref.slice(1)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 transition-colors hover:border-emerald-400/60 hover:text-emerald-400"
                >
                  WhatsApp
                </a>
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 transition-colors hover:border-neon-pink/60 hover:text-neon-pink"
                >
                  <InstagramIcon className="h-4 w-4" /> Instagram
                </a>
                <a
                  href={contactInfo.vk}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 transition-colors hover:border-neon-cyan/60 hover:text-neon-cyan"
                >
                  <VkIcon className="h-4 w-4" /> ВКонтакте
                </a>
              </div>
            </div>

            {/* Карта — внешняя ссылка на Яндекс.Карты */}
            <div className="card-glass p-7">
              <h3 className="font-display text-lg font-semibold text-white">
                Как нас найти
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Мы находимся в здании бизнес-инкубатора, 2-й этаж. Рядом
                остановки общественного транспорта и удобная парковка.
              </p>
              <a
                href={`https://yandex.by/maps/?pt=${contactInfo.coordinates.replace(" ", ",")}&z=16&l=map`}
                target="_blank"
                rel="noreferrer"
                className="btn-outline mt-4 !px-4 !py-2 text-sm"
              >
                Открыть на Яндекс.Картах
              </a>
            </div>
          </div>

          {/* Форма */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-white">
              Записаться на бесплатный пробный урок
            </h3>
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
