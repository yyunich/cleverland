import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApplicationForm from "@/components/ApplicationForm";
import CourseCard from "@/components/CourseCard";
import {
  CheckIcon,
  ClockIcon,
  courseIcon,
  PinIcon,
  UsersIcon,
} from "@/components/icons";
import {
  categories,
  contactInfo,
  courseBySlug,
  courses,
} from "@/lib/courses";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = courseBySlug(slug);
  if (!course) return { title: "Курс не найден" };

  return {
    title: `${course.title} — курс для детей ${course.age}`,
    description: `${course.tagline}. ${course.description.slice(0, 150)}… Очно в центре Орши. Запись на бесплатный пробный урок.`,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courseBySlug(slug);
  if (!course) notFound();

  const category = categories[course.category];
  const Icon = (props: { className?: string }) =>
    courseIcon(course.slug, props);

  const otherCourses = courses.filter((c) => c.slug !== course.slug).slice(0, 4);

  return (
    <>
      {/* Хлебные крошки */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-7 text-sm text-ink-faint">
        <Link href="/" className="transition-colors hover:text-brand">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <Link href="/courses" className="transition-colors hover:text-brand">
          Курсы
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-ink">{course.title}</span>
      </div>

      {/* Шапка курса */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center bg-brand-light text-brand">
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <p className="eyebrow">{category.title}</p>
                  <h1 className="mt-1.5 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                    {course.title}
                  </h1>
                </div>
              </div>

              <p className="mt-7 text-xl font-semibold text-brand">
                {course.tagline}
              </p>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">
                {course.description}
              </p>

              {course.examSubjects && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {course.examSubjects.map((subject) => (
                    <span
                      key={subject}
                      className="border border-line bg-mist px-3.5 py-2 text-sm font-medium text-ink"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              )}

              {/* Формат */}
              <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
                <span className="flex items-center gap-2 text-[15px] font-medium text-ink">
                  <UsersIcon className="h-5 w-5 text-brand" />
                  {course.age}
                </span>
                {course.format.map((f) => (
                  <span
                    key={f}
                    className="flex items-center gap-2 text-[15px] text-ink-soft"
                  >
                    {f.includes("минут") || f.includes("неделю") ? (
                      <ClockIcon className="h-5 w-5 text-brand" />
                    ) : (
                      <PinIcon className="h-5 w-5 text-brand" />
                    )}
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Форма */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-24">
                <div className="border border-line bg-mist p-6">
                  <h2 className="font-display text-xl font-extrabold text-ink">
                    Записаться на пробный урок
                  </h2>
                  <p className="mt-1.5 mb-5 text-sm text-ink-soft">
                    Бесплатно · 1 занятие в центре Орши
                  </p>
                  <ApplicationForm defaultCourse={course.slug} compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Чему научится */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Чему научится <span className="text-brand">ребёнок</span>
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              На занятиях ребёнок не просто смотрит, как что-то делают другие, —
              он сам придумывает, программирует и собирает собственный проект.
            </p>

            <ul className="mt-8 space-y-4">
              {course.whatYoullDo.map((item) => (
                <li key={item} className="flex items-start gap-3.5 border-b border-line pb-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-brand text-white">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="bg-footer p-8 text-white sm:p-10">
              <p className="eyebrow !text-brand">Формат занятий</p>
              <ul className="mt-5 space-y-5 text-[15px]">
                <li className="flex items-start gap-3">
                  <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span className="text-white/80">
                    Очно в центре Орши: {contactInfo.address},{" "}
                    {contactInfo.addressDetail}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <UsersIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span className="text-white/80">
                    Малые группы — до 8 человек
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span className="text-white/80">
                    Занятия по будням и в выходные — под школьный график
                  </span>
                </li>
              </ul>
              <p className="mt-7 text-sm leading-relaxed text-white/60">
                Первое занятие —{" "}
                <span className="font-semibold text-white">
                  бесплатный пробный урок
                </span>
                : ребёнок попробует направление, а вы познакомитесь с
                преподавателем и центром.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Другие курсы */}
      <section className="border-t border-line bg-mist">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Ещё направления
            </h2>
            <Link
              href="/courses"
              className="text-sm font-semibold text-brand hover:opacity-70"
            >
              Весь каталог →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {otherCourses.map((c) => (
              <CourseCard key={c.slug} course={c} compact />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
