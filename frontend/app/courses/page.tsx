import type { Metadata } from "next";
import CourseCard from "@/components/CourseCard";
import CtaSection from "@/components/CtaSection";
import SectionHeading from "@/components/SectionHeading";
import {
  categoryOrder,
  categories,
  coursesByCategory,
} from "@/lib/courses";

export const metadata: Metadata = {
  title: "Курсы и направления",
  description:
    "Все направления IT-школы Cleverland в Орше: программирование (Scratch, Python), разработка игр (Roblox, Godot), 3D-моделирование (Blender), базы данных, робототехника, английский язык и подготовка к ЦЭ/ЦТ.",
};

export default function CoursesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <SectionHeading
          eyebrow="Каталог"
          title={
            <>
              Курсы и <span className="text-brand">направления</span>
            </>
          }
          subtitle="Выбирайте по возрасту и интересам ребёнка — от первого кода до профессиональной разработки. На любой курс можно записаться на бесплатный пробный урок."
        />
      </section>

      {categoryOrder.map((cat, ci) => {
        const group = coursesByCategory(cat);
        if (group.length === 0) return null;
        return (
          <section
            key={cat}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10"
          >
            <div className="mb-7 border-b border-line pb-5">
              <p className="eyebrow !text-sm">
                {String(ci + 1).padStart(2, "0")} / {categoryOrder.length}
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                {categories[cat].title}
              </h2>
              <p className="mt-1.5 text-[15px] text-ink-soft">
                {categories[cat].description}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.map((course) => (
                <CourseCard key={course.slug} course={course} compact />
              ))}
            </div>
          </section>
        );
      })}

      <div className="pt-14">
        <CtaSection />
      </div>
    </>
  );
}
