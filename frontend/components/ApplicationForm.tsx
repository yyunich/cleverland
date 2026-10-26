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
      <div className="card-glass flex flex-col items-center gap-4 p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon-lime/15 text-neon-lime">
          <CheckIcon className="h-8 w-8" />
        </div>
        <h3 className="font-display text-2xl font-bold text-white">
          Заявка отправлена! 🎉
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-slate-400">
          Спасибо! Администратор свяжется с вами в ближайшее время, ответит на
          вопросы и подберёт удобное время для бесплатного пробного урока.
        </p>
        <p className="text-xs text-slate-500">
          А если не терпится — звоните:{" "}
          <a href="tel:+375295694550" className="text-neon-cyan">
            +375 (29) 569-45-50
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`card-glass ${compact ? "p-7" : "p-8"} space-y-4`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
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
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
              <option key={o.value} value={o.value} className="bg-night-800">
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? "Отправляем…" : "Записаться на бесплатный пробный урок"}
      </button>

      <p className="text-center text-xs text-slate-500">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
      </p>

      {status === "error" && (
        <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </p>
      )}
    </form>
  );
}
