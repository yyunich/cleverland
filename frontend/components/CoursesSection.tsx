import Link from "next/link";
import CourseCard from "./CourseCard";
import SectionHeading from "./SectionHeading";
import { categoryOrder, categories, coursesByCategory } from "@/lib/courses";

/** Витрина направлений на главной странице */
export default function CoursesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <SectionHeading
        eyebrow="Направления"
        title={
          <>
            Каждый найдёт <span className="text-neon-gradient">своё</span>
          </>
        }
        subtitle="Мы собрали направления по интересам и возрасту — от первого кода до профессиональной разработки, от языков до подготовки к экзаменам."
      />

      <div className="mt-14 space-y-16">
        {categoryOrder.map((cat) => {
          const group = coursesByCategory(cat);
          if (group.length === 0) return null;
          return (
            <div key={cat}>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                    {categories[cat].title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {categories[cat].description}
                  </p>
                </div>
                <Link
                  href="/courses"
                  className="text-sm font-medium text-neon-cyan transition-opacity hover:opacity-75"
                >
                  Все курсы →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.map((course) => (
                  <CourseCard key={course.slug} course={course} compact />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
