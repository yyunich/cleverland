/**
 * Гигантский слайд-бар: слово CLEVERLAND бежит по кругу.
 * - hero: контурная типографика (text-outline-giant-light)
 * - footer: едва заметный полупрозрачный текст
 * Пауза при наведении (класс .marquee-track), уважает prefers-reduced-motion.
 */
export default function GiantMarquee({
  variant = "outline",
  className = "",
}: {
  /** outline — контурная типографика; solid — полупрозрачный белый текст */
  variant?: "outline" | "solid";
  className?: string;
}) {
  const word = "CLEVERLAND";
  // Повторяем слово несколько раз, чтобы ряд был плотным
  const words = [word, word, word, word];

  const row = (ariaHidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {words.map((w, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="mx-6 font-display text-[clamp(3rem,13vw,10rem)] font-extrabold leading-none tracking-tight sm:mx-8">
            {w}
          </span>
          <span className="text-brand/70 text-[clamp(1.2rem,3vw,2.6rem)]">✦</span>
        </span>
      ))}
    </div>
  );

  const textClass =
    variant === "outline" ? "text-outline-giant-light" : "text-white/8";

  return (
    <div className={`marquee-track select-none overflow-hidden ${className}`}>
      <div className={`flex w-max animate-marquee ${textClass}`}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
