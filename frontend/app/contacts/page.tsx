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
import { contactInfo, courseBySlug } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Контакты и запись",
  description:
    "IT-школа Cleverland в Орше: ул. Мира, 8 (бизнес-инкубатор, 2-й этаж). Телефоны +375 (29) 569-45-50, +375 (29) 637-60-34. Ежедневно с 10:00 до 21:00. Запись на бесплатный пробный урок.",
};

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Подхватываем данные из URL (глубокие ссылки):
  // /contacts?parent_name=Иван&phone=%2B37529...&course=scratch
  const params = await searchParams;

  const get = (key: string): string => {
    const v = params[key];
    return typeof v === "string" ? v : "";
  };

  const parentName = decodeURIComponent(get("parent_name"));
  const phone = decodeURIComponent(get("phone"));
  const childAge = decodeURIComponent(get("child_age"));
  const courseSlug = decodeURIComponent(get("course"));
  const defaultCourse = courseBySlug(courseSlug) ? courseSlug : "";
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-16 lg:pb-24">
        <SectionHeading
          eyebrow="Мы в центре Орши"
          title={
            <>
              Контакты и <span className="text-brand">запись</span>
            </>
          }
          subtitle="Приходите знакомиться, звоните или пишите в мессенджеры — подберём направление и запишем на бесплатный пробный урок."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Контактная информация */}
          <div className="space-y-px bg-line">
            <div className="bg-white p-8">
              <h3 className="font-display text-lg font-extrabold text-ink">
                Адрес
              </h3>
              <p className="mt-3 flex items-start gap-3 text-[15px] text-ink">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span>
                  {contactInfo.address}
                  <span className="block text-sm text-ink-faint">
                    {contactInfo.addressDetail} (бизнес-инкубатор, 2-й этаж)
                  </span>
                </span>
              </p>
              <p className="mt-3.5 flex items-start gap-3 text-[15px] text-ink">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span>
                  Режим работы
                  <span className="block text-sm text-ink-faint">
                    {contactInfo.workHours}
                  </span>
                </span>
              </p>
            </div>

            <div className="bg-white p-8">
              <h3 className="font-display text-lg font-extrabold text-ink">
                Телефоны
              </h3>
              <div className="mt-4 space-y-3">
                <a
                  href={`tel:${contactInfo.phoneMainHref}`}
                  className="flex items-center gap-3 text-lg text-ink transition-colors hover:text-brand"
                >
                  <PhoneIcon className="h-5 w-5 text-brand" />
                  {contactInfo.phoneMain}
                  <span className="text-xs text-ink-faint">(администратор)</span>
                </a>
                <a
                  href={`tel:${contactInfo.phoneSecondHref}`}
                  className="flex items-center gap-3 text-lg text-ink transition-colors hover:text-brand"
                >
                  <PhoneIcon className="h-5 w-5 text-brand" />
                  {contactInfo.phoneSecond}
                </a>
              </div>

              <h3 className="mt-7 font-display text-base font-extrabold text-ink">
                Мессенджеры и соцсети
              </h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <a
                  href={`https://t.me/+${contactInfo.phoneMainHref.slice(1)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-line bg-mist px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  <TelegramIcon className="h-4 w-4 text-brand" /> Telegram
                </a>
                <a
                  href={`viber://chat?number=${contactInfo.phoneMainHref.slice(1)}`}
                  className="inline-flex items-center gap-2 border border-line bg-mist px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  <ViberIcon className="h-4 w-4 text-brand" /> Viber
                </a>
                <a
                  href={`https://wa.me/${contactInfo.phoneMainHref.slice(1)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-line bg-mist px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  WhatsApp
                </a>
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-line bg-mist px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  <InstagramIcon className="h-4 w-4 text-brand" /> Instagram
                </a>
                <a
                  href={contactInfo.vk}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-line bg-mist px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  <VkIcon className="h-4 w-4 text-brand" /> ВКонтакте
                </a>
              </div>
            </div>

            {/* Карта — внешняя ссылка на Яндекс.Карты */}
            <div className="bg-white p-8">
              <h3 className="font-display text-lg font-extrabold text-ink">
                Как нас найти
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                Мы находимся в здании бизнес-инкубатора, 2-й этаж. Рядом
                остановки общественного транспорта и удобная парковка.
              </p>
              <a
                href={`https://yandex.by/maps/?pt=${contactInfo.coordinates.replace(" ", ",")}&z=16&l=map`}
                target="_blank"
                rel="noreferrer"
                className="btn-outline mt-5 !px-5 !py-2.5 text-sm"
              >
                Открыть на Яндекс.Картах
              </a>
            </div>
          </div>

          {/* Форма */}
          <div>
            <div className="border-t-4 border-brand bg-mist p-8 sm:p-10">
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink">
                Записаться на пробный урок
              </h3>
              <p className="mt-2 mb-6 text-sm text-ink-soft">
                Бесплатно · подберём направление по возрасту ребёнка
              </p>
              <ApplicationForm
                defaultCourse={defaultCourse}
                initialParentName={parentName}
                initialPhone={phone}
                initialChildAge={childAge}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
