// API-обёртка для обращения к бэкенду FastAPI

export interface ApplicationPayload {
  parent_name: string;
  phone: string;
  child_age?: string;
  course: string;
  note?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "http://localhost:8000";

export async function submitApplication(
  payload: ApplicationPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${API_URL}/api/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      let detail = `Ошибка сервера (${res.status})`;
      try {
        const data = await res.json();
        if (typeof data.detail === "string") detail = data.detail;
      } catch {
        /* ignore */
      }
      return { ok: false, error: detail };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Не удалось отправить заявку. Проверьте, запущен ли бэкенд, и попробуйте ещё раз.",
    };
  }
}
