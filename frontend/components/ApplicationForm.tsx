"use client";

import { useEffect, useState } from "react";
import { submitApplication } from "@/lib/api";
import { courses } from "@/lib/courses";
import { CheckIcon } from "./icons";

type Status = "idle" | "sending";

type Banner = {
  type: "success" | "error";
  title: string;
  text: string;
};

const courseOptions = [
  { value: "consultation", label: "Ещё не определились — нужна консультация" },
  ...courses.map((c) => ({ value: c.slug, label: `${c.title} · ${c.age}` })),
];

export default function ApplicationForm({
  defaultCourse = "",
  compact = false,
  initialParentName = "",
  initialPhone = "",
  initialChildAge = "",
  theme = "light",
}: {
  defaultCourse?: string;
  compact?: boolean;
  /** Данные для предзаполнения формы (например, из URL-параметров) */
  initialParentName?: string;
  initialPhone?: string;
  initialChildAge?: string;
  /** dark — форма на тёмном фоне (тёмная «глава» сайта) */
  theme?: "light" | "dark";
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [banner, setBanner] = useState<Banner | null>(null);
  const [selectedCourse, setSelectedCourse] = useState(defaultCourse);
  const [parentName, setParentName] = useState(initialParentName);
  const [phone, setPhone] = useState(initialPhone);
  const [childAge, setChildAge] = useState(initialChildAge);

  // Автоматически прячем уведомление через 8 секунд
  useEffect(() => {
    if (!banner) return;
    const timer = setTimeout(() => setBanner(null), 8000);
    return () => clearTimeout(timer);
  }, [banner]);

  function closeBanner() {
    setBanner(null);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setBanner(null);

    const form = e.currentTarget;

    const courseValue = selectedCourse || "Консультация по направлениям";
    const courseOption = courseOptions.find((c) => c.value === courseValue);
    const result = await submitApplication({
      parent_name: parentName,
      phone,
      child_age: childAge || undefined,
      course: courseOption?.label ?? courseValue,
    });

    if (result.ok) {
      form.reset();
      setParentName("");
      setPhone("");
      setChildAge("");
      setSelectedCourse(defaultCourse);
      setBanner({
        type: "success",
        title: "Заявка отправлена!",
        text: "Администратор перезвонит в ближайшее время, подберёт направление и запишет на бесплатный пробный урок. Не терпится? Звоните: +375 (29) 569-45-50.",
      });
    } else {
      setBanner({
        type: "error",
        title: "Не удалось отправить заявку",
        text: result.error,
      });
    }
    setStatus("idle");
  }

  const dark = theme === "dark";
  const fieldClass = dark ? "field-dark" : "field";

  return (
    <form
      onSubmit={onSubmit}
      className={`relative border ${
        dark ? "border-white/15 bg-white/[0.04]" : "border-line bg-white"
      } ${compact ? "p-7" : "p-8 sm:p-10"} space-y-7`}
    >
      {/* Уведомление о результате отправки */}
      {banner && (
        <div
          role="status"
          className={`flex items-start gap-3 border-l-4 p-4 ${
            banner.type === "success"
              ? dark
                ? "border-brand bg-brand/15"
                : "border-brand bg-brand-faint"
              : dark
                ? "border-red-400 bg-red-500/15"
                : "border-red-500 bg-red-50"
          }`}
        >
          <span
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-white ${
              banner.type === "success" ? "bg-brand" : "bg-red-500"
            }`}
          >
            {banner.type === "success" ? (
              <CheckIcon className="h-3.5 w-3.5" />
            ) : (
              <span className="text-sm font-bold">!</span>
            )}
          </span>
          <div className="flex-1">
            <p
              className={`text-sm font-bold ${
                dark ? "text-white" : "text-ink"
              }`}
            >
              {banner.title}
            </p>
            <p
              className={`mt-1 text-sm leading-relaxed ${
                banner.type === "success"
                  ? dark
                    ? "text-white/70"
                    : "text-ink-soft"
                  : dark
                    ? "text-red-200"
                    : "text-red-700"
              }`}
            >
              {banner.text}
            </p>
          </div>
          <button
            type="button"
            onClick={closeBanner}
            aria-label="Закрыть уведомление"
            className={`-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center transition-colors hover:text-white ${
              dark ? "text-white/40" : "text-ink-faint"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <div>
          <label htmlFor="parent_name" className="sr-only">
            Имя родителя
          </label>
          <input
            id="parent_name"
            name="parent_name"
            type="text"
            required
            minLength={2}
            maxLength={120}
            placeholder="Имя родителя *"
            className={fieldClass}
            autoComplete="name"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">
            Телефон
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            minLength={5}
            maxLength={40}
            placeholder="Телефон *"
            className={fieldClass}
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="child_age" className="sr-only">
            Возраст ребёнка / класс
          </label>
          <input
            id="child_age"
            name="child_age"
            type="text"
            maxLength={40}
            placeholder="Возраст ребёнка / класс"
            className={fieldClass}
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="course" className="sr-only">
            Направление
          </label>
          <select
            id="course"
            name="course"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className={`${fieldClass} appearance-none ${dark ? "bg-transparent [&>option]:bg-footer" : ""}`}
          >
            {courseOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={`w-full !py-4 disabled:opacity-60 ${dark ? "btn-white" : "btn-dark"}`}
      >
        {status === "sending"
          ? "Отправляем…"
          : "Записаться на бесплатный пробный урок"}
      </button>

      <p
        className={`text-center text-xs ${
          dark ? "text-white/40" : "text-ink-faint"
        }`}
      >
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
      </p>
    </form>
  );
}
