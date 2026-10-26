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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 text-sm text-slate-500">
        <Link href="/" className="hover:text-neon-cyan">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <Link href="/courses" className="hover:text-neon-cyan">
          Курсы
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">{course.title}</span>
      </div>

      {/* Шапка курса */}
      <section className="relative overflow-hidden">
        <div
          className={`absolute -top-24 right-0 h-80 w-80 rounded-full bg-gradient-to-br opacity-20 blur-[110px] ${course.gradient}`}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${course.gradient} text-night-950 shadow-glow`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-neon-cyan">
                    {category.title}
                  </p>
                  <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
                    {course.title}
                  </h1>
                </div>
              </div>

              <p className="mt-6 text-lg font-medium text-neon-cyan">
                {course.tagline}
              </p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-400">
                {course.description}
              </p>

              {course.examSubjects && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {course.examSubjects.map((subject) => (
                    <span
                      key={subject}
                      className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-slate-200"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              )}

              {/* Формат */}
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                  <UsersIcon className="h-4 w-4 text-neon-violet" />
                  {course.age}
                </span>
                {course.format.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
                  >
                    {f.includes("минут") || f.includes("неделю") ? (
                      <ClockIcon className="h-4 w-4 text-neon-cyan" />
                    ) : (
                      <PinIcon className="h-4 w-4 text-neon-pink" />
                    )}
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Форма */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-24">
                <h2 className="mb-4 font-display text-lg font-semibold text-white">
                  Записаться на бесплатный пробный урок
                </h2>
                <ApplicationForm defaultCourse={course.slug} compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Чему научится */}
      <section className="border-t border-white/10 bg-night-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Чему научится{" "}
                <span className="text-neon-gradient">ребёнок</span>
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-400">
                На занятиях ребёнок не просто смотрит, как что-то делают другие,
                — он сам придумывает, программирует и собирает собственный
                проект.
              </p>

              <ul className="mt-7 space-y-4">
                {course.whatYoullDo.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${course.gradient} text-night-950`}
                    >
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-slate-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center">
              <div className="card-glass p-8">
                <p className="text-sm uppercase tracking-widest text-slate-500">
                  Формат занятий
                </p>
                <ul className="mt-4 space-y-4 text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                    <PinIcon className="h-5 w-5 shrink-0 text-neon-pink" />
                    Очно в центре Орши: {contactInfo.address},{" "}
                    {contactInfo.addressDetail}
                  </li>
                  <li className="flex items-center gap-3">
                    <UsersIcon className="h-5 w-5 shrink-0 text-neon-violet" />
                    Малые группы — до 8 человек
                  </li>
                  <li className="flex items-center gap-3">
                    <ClockIcon className="h-5 w-5 shrink-0 text-neon-cyan" />
                    Занятия по будням и в выходные — под школьный график
                  </li>
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-slate-400">
                  Первое занятие —{" "}
                  <span className="font-semibold text-neon-cyan">
                    бесплатный пробный урок
                  </span>
                  : ребёнок попробует направление, а вы познакомитесь с
                  преподавателем и центром.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Другие курсы */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Ещё направления
          </h2>
          <Link
            href="/courses"
            className="text-sm font-medium text-neon-cyan hover:opacity-75"
          >
            Весь каталог →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {otherCourses.map((c) => (
            <CourseCard key={c.slug} course={c} compact />
          ))}
        </div>
      </section>
    </>
  );
}
