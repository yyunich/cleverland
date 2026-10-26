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
      className={`card group relative flex flex-col bg-white ${
        compact ? "p-6" : "p-7"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center bg-brand-light text-brand">
          <Icon className="h-6 w-6" />
        </div>
        <span className="text-sm font-medium text-ink-faint">{course.age}</span>
      </div>

      <h3 className="mt-5 font-display text-lg font-bold leading-snug text-ink">
        {course.title}
      </h3>
      <p className="mt-1 text-sm font-semibold text-brand">{course.tagline}</p>
      <p
        className={`mt-3 text-sm leading-relaxed text-ink-soft ${
          compact ? "line-clamp-3" : "line-clamp-4"
        }`}
      >
        {course.description}
      </p>

      <div className="mt-auto pt-6">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors group-hover:text-brand">
          Подробнее о курсе
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
