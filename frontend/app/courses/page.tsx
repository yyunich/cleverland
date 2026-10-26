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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <SectionHeading
          eyebrow="Каталог"
          title={
            <>
              Курсы и <span className="text-neon-gradient">направления</span>
            </>
          }
          subtitle="Выбирайте по возрасту и интересам ребёнка — от первого кода до профессиональной разработки. На любой курс можно записаться на бесплатный пробный урок."
        />
      </section>

      {categoryOrder.map((cat) => {
        const group = coursesByCategory(cat);
        if (group.length === 0) return null;
        return (
          <section
            key={cat}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10"
          >
            <div className="mb-7">
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {categories[cat].title}
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm text-slate-400">
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

      <div className="pt-10">
        <CtaSection />
      </div>
    </>
  );
}
