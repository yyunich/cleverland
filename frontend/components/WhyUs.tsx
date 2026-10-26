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
    icon: <RocketIcon className="h-6 w-6" />,
    color: "text-neon-violet",
    title: "Бесплатный пробный урок",
    text: "Сначала знакомимся и пробуем — родитель и ребёнок решают вместе, подходит ли направление.",
  },
  {
    icon: <UsersIcon className="h-6 w-6" />,
    color: "text-neon-pink",
    title: "Малые группы",
    text: "До 8 человек: преподаватель видит каждого ребёнка, а ученикам комфортно отвечать и работать в команде.",
  },
  {
    icon: <GamepadIcon className="h-6 w-6" />,
    color: "text-neon-cyan",
    title: "Учимся через игру",
    text: "Игры, мультики и собственные проекты вместо зубрёжки — ребёнок сразу видит результат своего труда.",
  },
  {
    icon: <BookIcon className="h-6 w-6" />,
    color: "text-neon-lime",
    title: "Результат, а не оценки",
    text: "Дети уезжают с лагерей с защищёнными проектами, а выпускники курсов — с портфолио и пониманием IT.",
  },
  {
    icon: <HeartIcon className="h-6 w-6" />,
    color: "text-neon-pink",
    title: "IT — доступно каждому",
    text: "Показываем, что технологии понятны и интересны, развиваем hard и soft skills без давления.",
  },
  {
    icon: <CheckIcon className="h-6 w-6" />,
    color: "text-neon-cyan",
    title: "Офлайн в центре Орши",
    text: "Ул. Мира, 8 — бизнес-инкубатор, 2-й этаж. Живое общение, наставники рядом, работа за компьютерами.",
  },
];

export default function WhyUs() {
  return (
    <section className="border-y border-white/10 bg-neon-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <SectionHeading
          eyebrow="Почему Cleverland"
          title={
            <>
              Подход, который <span className="text-neon-gradient">работает</span>
            </>
          }
          subtitle="Миссия школы — зажечь интерес к технологиям через игру и эксперименты. Мы учим понимать материал, а не заучивать его."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="card-glass p-7">
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-night-800/80 ${r.color}`}
              >
                {r.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-white">
                {r.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
