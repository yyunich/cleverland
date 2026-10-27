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
      className={`card group relative flex flex-col bg-surface ${
        compact ? "p-6" : "p-7"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center bg-brand-light text-brand transition-all duration-400 ease-expo-out group-hover:bg-brand group-hover:text-white">
          <Icon className="h-6 w-6" />
        </div>
        <span className="text-sm font-medium text-ink-faint">{course.age}</span>
      </div>

      <h3 className="mt-5 font-display text-lg font-bold leading-snug text-ink transition-[font-stretch] duration-500 ease-expo-out group-hover:font-stretch-[114%]">
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
        <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors duration-300 group-hover:text-brand">
          Подробнее о курсе
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-400 ease-expo-out group-hover:translate-x-1.5" />
          <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-400 ease-expo-out group-hover:scale-x-100" />
        </span>
      </div>
    </Link>
  );
}

