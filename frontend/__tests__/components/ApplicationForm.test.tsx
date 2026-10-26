import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ApplicationForm from "@/components/ApplicationForm";

// Тесты формы: отправка, успех, ошибка при недоступном бэкенде.

function fetchSuccess() {
  return jest.fn().mockResolvedValue({
    ok: true,
    status: 201,
    json: async () => ({}),
  });
}

describe("ApplicationForm", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("рендерит все поля формы", () => {
    render(<ApplicationForm />);
    expect(screen.getByPlaceholderText("Имя родителя *")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Телефон *")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Возраст ребёнка / класс")
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Записаться на бесплатный пробный урок/ })
    ).toBeInTheDocument();
  });

  it("показывает предвыбранный курс, если передан defaultCourse", () => {
    render(<ApplicationForm defaultCourse="python" />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("python");
  });

  it("отправляет заявку и показывает сообщение об успехе", async () => {
    const user = userEvent.setup();
    const fetchMock = fetchSuccess();
    (global as any).fetch = fetchMock;

    render(<ApplicationForm defaultCourse="scratch" />);

    await user.type(screen.getByPlaceholderText("Имя родителя *"), "Иван Петров");
    await user.type(screen.getByPlaceholderText("Телефон *"), "+375291234567");
    await user.type(screen.getByPlaceholderText("Возраст ребёнка / класс"), "9 лет");
    await user.click(
      screen.getByRole("button", { name: /Записаться на бесплатный пробный урок/ })
    );

    // Сообщение об успехе
    expect(await screen.findByText(/Заявка отправлена/)).toBeInTheDocument();

    // Запрос ушёл на бэкенд с правильными данными
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toContain("/api/applications");
    expect(init.method).toBe("POST");

    const body = JSON.parse(init.body);
    expect(body.parent_name).toBe("Иван Петров");
    expect(body.phone).toBe("+375291234567");
    expect(body.child_age).toBe("9 лет");
    expect(body.course).toBe("Scratch · 6–8 лет"); // slug превращён в название
  });

  it("показывает сообщение об ошибке, если бэкенд недоступен", async () => {
    const user = userEvent.setup();
    (global as any).fetch = jest
      .fn()
      .mockRejectedValue(new TypeError("fetch failed"));

    render(<ApplicationForm />);

    await user.type(screen.getByPlaceholderText("Имя родителя *"), "Иван");
    await user.type(screen.getByPlaceholderText("Телефон *"), "+375291234567");
    await user.click(
      screen.getByRole("button", { name: /Записаться на бесплатный пробный урок/ })
    );

    expect(
      await screen.findByText(/Не удалось отправить заявку/)
    ).toBeInTheDocument();
  });

  it("показывает текст ошибки от сервера при 422", async () => {
    const user = userEvent.setup();
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 422,
      json: async () => ({ detail: "Телефон слишком короткий" }),
    });

    render(<ApplicationForm />);

    await user.type(screen.getByPlaceholderText("Имя родителя *"), "Иван");
    await user.type(screen.getByPlaceholderText("Телефон *"), "123");
    await user.click(
      screen.getByRole("button", { name: /Записаться на бесплатный пробный урок/ })
    );

    expect(
      await screen.findByText(/Телефон слишком короткий/)
    ).toBeInTheDocument();
  });
});
