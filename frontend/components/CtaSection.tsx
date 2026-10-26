import SectionHeading from "./SectionHeading";
import ApplicationForm from "./ApplicationForm";

export default function CtaSection({ defaultCourse = "" }: { defaultCourse?: string }) {
  return (
    <section id="apply" className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      <div className="absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-neon-violet/20 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Пробный урок — бесплатно"
          title={
            <>
              Попробуйте — <span className="text-neon-gradient">это бесплатно</span>
            </>
          }
          subtitle="Оставьте заявку: администратор перезвонит, подберёт направление по возрасту и интересам ребёнка и запишет на бесплатный пробный урок."
        />

        <div className="mt-10">
          <ApplicationForm defaultCourse={defaultCourse} />
        </div>
      </div>
    </section>
  );
}
