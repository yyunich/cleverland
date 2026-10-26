import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Unbounded({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

const sans = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default:
      "Cleverland — IT-школа в Орше | Программирование для детей с 6 лет",
    template: "%s | Cleverland — IT-школа в Орше",
  },
  description:
    "IT-школа Cleverland в Орше: Scratch, Roblox, Python, Godot, Blender, MySQL, робототехника, английский язык и подготовка к ЦЭ/ЦТ. Влюбляем детей в программирование с 6 лет. Бесплатный пробный урок!",
  keywords: [
    "Cleverland",
    "Клеверленд",
    "IT-школа Орша",
    "программирование для детей",
    "Scratch",
    "Roblox",
    "Python для детей",
    "Godot",
    "Blender",
    "подготовка к ЦЭ",
    "подготовка к ЦТ",
    "Орша",
  ],
  openGraph: {
    title: "Cleverland — IT-школа в Орше",
    description:
      "Влюбляем детей в программирование с 6 лет. Курсы, которые интересны детям и полезны для будущего.",
    locale: "ru_RU",
    type: "website",
    siteName: "Cleverland",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
