import Link from "next/link";
import CourseCard from "./CourseCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { categoryOrder, categories, coursesByCategory } from "@/lib/courses";

/** Витрина направлений на главной странице */
export default function CoursesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Направления"
          title={
            <>
              Каждый найдёт <span className="text-brand">своё</span>
            </>
          }
          subtitle="Мы собрали направления по интересам и возрасту — от первого кода до профессиональной разработки, от языков до подготовки к экзаменам."
        />
      </Reveal>

      <div className="mt-16 space-y-20">
        {categoryOrder.map((cat, ci) => {
          const group = coursesByCategory(cat);
          if (group.length === 0) return null;
          return (
            <Reveal key={cat} delay={80}>
              <div className="mb-7 flex items-end justify-between gap-4 border-b border-line pb-5">
                <div>
                  <p className="eyebrow !text-sm">
                    {String(ci + 1).padStart(2, "0")} / {categoryOrder.length}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                    {categories[cat].title}
                  </h3>
                  <p className="mt-1.5 text-[15px] text-ink-soft">
                    {categories[cat].description}
                  </p>
                </div>
                <Link
                  href="/courses"
                  className="hidden shrink-0 text-sm font-semibold text-brand transition-opacity hover:opacity-70 sm:block"
                >
                  Все курсы →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.map((course, i) => (
                  <Reveal key={course.slug} delay={i * 70}>
                    <CourseCard course={course} compact />
                  </Reveal>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
