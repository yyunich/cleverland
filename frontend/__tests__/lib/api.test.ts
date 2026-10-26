import { submitApplication } from "@/lib/api";

// Тест 1: правильный запрос к бэкенду
describe("submitApplication", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("отправляет POST с данными формы на /api/applications", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({}),
    });
    (global as any).fetch = fetchMock;

    const result = await submitApplication({
      parent_name: "Иван Петров",
      phone: "+375291234567",
      child_age: "10 лет",
      course: "Python · 10–14 лет",
    });

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toContain("/api/applications");
    expect(init.method).toBe("POST");
    expect(init.headers["Content-Type"]).toBe("application/json");

    const body = JSON.parse(init.body);
    expect(body).toEqual({
      parent_name: "Иван Петров",
      phone: "+375291234567",
      child_age: "10 лет",
      course: "Python · 10–14 лет",
    });
  });

  it("возвращает {ok:true} при успехе (201)", async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({}),
    });
    const result = await submitApplication({
      parent_name: "Анна",
      phone: "+37529",
      course: "Scratch",
    });
    expect(result).toEqual({ ok: true });
  });

  it("возвращает текст ошибки с сервера при 4xx/5xx", async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 422,
      json: async () => ({ detail: "Телефон слишком короткий" }),
    });
    const result = await submitApplication({
      parent_name: "x",
      phone: "1",
      course: "Scratch",
    });
    expect(result).toEqual({
      ok: false,
      error: "Телефон слишком короткий",
    });
  });

  it("возвращает понятную ошибку при недоступном бэкенде", async () => {
    (global as any).fetch = jest
      .fn()
      .mockRejectedValue(new TypeError("fetch failed"));
    const result = await submitApplication({
      parent_name: "Иван",
      phone: "+375291234567",
      course: "Scratch",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("Не удалось отправить заявку");
    }
  });
});
