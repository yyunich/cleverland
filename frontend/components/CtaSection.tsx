import SectionHeading from "./SectionHeading";
import ApplicationForm from "./ApplicationForm";

export default function CtaSection({ defaultCourse = "" }: { defaultCourse?: string }) {
  return (
    <section id="apply" className="border-t border-line bg-mist">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:pt-4">
            <SectionHeading
              align="left"
              eyebrow="Пробный урок — бесплатно"
              title={
                <>
                  Попробуйте —{" "}
                  <span className="brand-marker text-brand">это бесплатно</span>
                </>
              }
              subtitle="Оставьте заявку: администратор перезвонит, подберёт направление по возрасту и интересам ребёнка и запишет на бесплатный пробный урок."
            />

            <div className="mt-9 space-y-4">
              {[
                "Ответим в течение рабочего дня",
                "Подберём курс по возрасту и интересам",
                "Бесплатный пробный урок в центре Орши",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 shrink-0 rotate-45 bg-brand" />
                  <span className="text-[15px] font-medium text-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <ApplicationForm defaultCourse={defaultCourse} />
          </div>
        </div>
      </div>
    </section>
  );
}
