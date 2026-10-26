import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CoursesSection from "@/components/CoursesSection";
import WhyUs from "@/components/WhyUs";
import Achievement from "@/components/Achievement";
import CetBanner from "@/components/CetBanner";
import LibrarySection from "@/components/LibrarySection";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Cleverland — IT-школа в Орше | Программирование для детей с 6 лет",
  description:
    "IT-школа Cleverland в Орше: Scratch, Roblox, Python, Godot, Blender, MySQL, робототехника, английский язык и подготовка к ЦЭ/ЦТ. Влюбляем детей в программирование с 6 лет. Бесплатный пробный урок!",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <CoursesSection />
      <WhyUs />
      <Achievement />
      <CetBanner />
      <LibrarySection />
      <CtaSection />
    </>
  );
}
