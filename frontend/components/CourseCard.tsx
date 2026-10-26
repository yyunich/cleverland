import Link from "next/link";
import type { Course } from "@/lib/courses";
import { ArrowRightIcon, courseIcon } from "./icons";

export default function CourseCard({
  course,
  compact = false,
}: {
  course: Course;
  compact?: boolean;
}) {
  const Icon = (props: { className?: string }) =>
    courseIcon(course.slug, props);

  return (
    <Link
      href={`/courses/${course.slug}`}
      className={`card-glass group relative flex flex-col overflow-hidden ${
        compact ? "p-6" : "p-7"
      }`}
    >
      {/* Верхний градиентный свет */}
      <div
        className={`pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-30 ${course.gradient} blur-2xl`}
      />

      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${course.gradient} text-night-950 shadow-glow`}
        >
          <Icon className="h-7 w-7" />
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
          {course.age}
        </span>
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold text-white">
        {course.title}
      </h3>
      <p className="mt-1.5 text-sm font-medium text-neon-cyan">
        {course.tagline}
      </p>
      <p
        className={`mt-3 text-sm leading-relaxed text-slate-400 ${
          compact ? "line-clamp-3" : "line-clamp-4"
        }`}
      >
        {course.description}
      </p>

      <div className="mt-auto pt-6">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-neon-cyan">
          Подробнее о курсе
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
