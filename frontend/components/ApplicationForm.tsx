"use client";

import { useState } from "react";
import { submitApplication } from "@/lib/api";
import { courses } from "@/lib/courses";
import { CheckIcon } from "./icons";

type Status = "idle" | "sending" | "success" | "error";

const courseOptions = [
  { value: "consultation", label: "Ещё не определились — нужна консультация" },
  ...courses.map((c) => ({ value: c.slug, label: `${c.title} · ${c.age}` })),
];

export default function ApplicationForm({
  defaultCourse = "",
  compact = false,
}: {
  defaultCourse?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(defaultCourse);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const courseValue =
      selectedCourse ||
      (data.get("course") as string) ||
      "Консультация по направлениям";

    const courseOption = courseOptions.find((c) => c.value === courseValue);
    const result = await submitApplication({
      parent_name: String(data.get("parent_name") || ""),
      phone: String(data.get("phone") || ""),
      child_age: String(data.get("child_age") || "") || undefined,
      course: courseOption?.label ?? courseValue,
    });

    if (result.ok) {
      setStatus("success");
      form.reset();
      setSelectedCourse(defaultCourse);
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-white p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center bg-brand text-white">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-extrabold text-ink">
          Заявка отправлена!
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
          Спасибо! Администратор свяжется с вами в ближайшее время, ответит на
          вопросы и подберёт удобное время для бесплатного пробного урока.
        </p>
        <p className="mt-4 text-sm text-ink-faint">
          А если не терпится — звоните:{" "}
          <a href="tel:+375295694550" className="font-semibold text-brand">
            +375 (29) 569-45-50
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`border border-line bg-white ${compact ? "p-7" : "p-8 sm:p-10"} space-y-7`}
    >
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
            className="field"
            autoComplete="name"
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
            className="field"
            autoComplete="tel"
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
            className="field"
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
            className="field appearance-none"
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
        className="btn-dark w-full !py-4 disabled:opacity-60"
      >
        {status === "sending"
          ? "Отправляем…"
          : "Записаться на бесплатный пробный урок"}
      </button>

      <p className="text-center text-xs text-ink-faint">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
      </p>

      {status === "error" && (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
