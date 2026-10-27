import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import {
  BookIcon,
  CheckIcon,
  GamepadIcon,
  HeartIcon,
  RocketIcon,
  UsersIcon,
} from "./icons";

const reasons = [
  {
    icon: <RocketIcon className="h-5 w-5" />,
    title: "Бесплатный пробный урок",
    text: "Сначала знакомимся и пробуем — родитель и ребёнок решают вместе, подходит ли направление.",
  },
  {
    icon: <UsersIcon className="h-5 w-5" />,
    title: "Малые группы",
    text: "До 8 человек: преподаватель видит каждого ребёнка, а ученикам комфортно отвечать и работать в команде.",
  },
  {
    icon: <GamepadIcon className="h-5 w-5" />,
    title: "Учимся через игру",
    text: "Игры, мультики и собственные проекты вместо зубрёжки — ребёнок сразу видит результат своего труда.",
  },
  {
    icon: <BookIcon className="h-5 w-5" />,
    title: "Результат, а не оценки",
    text: "Дети уезжают с лагерей с защищёнными проектами, а выпускники курсов — с портфолио и пониманием IT.",
  },
  {
    icon: <HeartIcon className="h-5 w-5" />,
    title: "IT — доступно каждому",
    text: "Показываем, что технологии понятны и интересны, развиваем hard и soft skills без давления.",
  },
  {
    icon: <CheckIcon className="h-5 w-5" />,
    title: "Офлайн в центре Орши",
    text: "Ул. Мира, 8 — бизнес-инкубатор, 2-й этаж. Живое общение, наставники рядом, работа за компьютерами.",
  },
];

export default function WhyUs() {
  return (
    <section className="border-y border-line bg-mist">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <SectionHeading
          eyebrow="Почему Cleverland"
          title={
            <>
              Подход, который <span className="text-brand">работает</span>
            </>
          }
          subtitle="Миссия школы — зажечь интерес к технологиям через игру и эксперименты. Мы учим понимать материал, а не заучивать его."
        />

        <div className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 80}>
              <div className="group h-full bg-white p-8 transition-colors duration-300 hover:bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center bg-brand-light text-brand transition-all duration-400 ease-expo-out group-hover:bg-brand group-hover:text-white">
                    {r.icon}
                  </div>
                  <span className="font-display text-2xl font-extrabold text-ink/10 transition-colors duration-300 group-hover:text-brand/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold text-ink">
                  {r.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
                  {r.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
