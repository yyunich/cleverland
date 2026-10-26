import {
  categories,
  categoryOrder,
  contactInfo,
  courseBySlug,
  courses,
} from "@/lib/courses";

// Тесты «целостности данных»: если в каталоге курсов что-то сломают
// (придумают дубль слага, потеряют описание), тесты это поймают.

describe("каталог курсов", () => {
  it("содержит хотя бы один курс", () => {
    expect(courses.length).toBeGreaterThan(0);
  });

  it("все слаги уникальны", () => {
    const slugs = courses.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("все слаги валидны для URL", () => {
    for (const c of courses) {
      expect(c.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("у каждого курса заполнены все обязательные поля", () => {
    for (const c of courses) {
      expect(c.title.length).toBeGreaterThan(0);
      expect(c.age.length).toBeGreaterThan(0);
      expect(c.tagline.length).toBeGreaterThan(0);
      expect(c.description.length).toBeGreaterThan(50);
      expect(c.whatYoullDo.length).toBeGreaterThan(0);
      expect(c.format.length).toBeGreaterThan(0);
    }
  });

  it("категория каждого курса объявлена в каталоге категорий", () => {
    const knownCategories = new Set(categoryOrder);
    const declared = new Set(Object.keys(categories));
    for (const c of courses) {
      expect(knownCategories.has(c.category)).toBe(true);
      expect(declared.has(c.category)).toBe(true);
    }
  });

  it("courseBySlug находит каждый курс по слагу", () => {
    for (const c of courses) {
      expect(courseBySlug(c.slug)?.title).toBe(c.title);
    }
  });

  it("courseBySlug возвращает undefined для неизвестного слага", () => {
    expect(courseBySlug("no-such-course")).toBeUndefined();
  });

  it("все категории имеют названия и описания", () => {
    for (const cat of categoryOrder) {
      expect(categories[cat].title.length).toBeGreaterThan(0);
      expect(categories[cat].description.length).toBeGreaterThan(0);
    }
  });

  it("подготовка к ЦЭ/ЦТ помечена как featured и содержит предметы", () => {
    const cet = courseBySlug("cet");
    expect(cet?.featured).toBe(true);
    expect(cet?.examSubjects?.length).toBeGreaterThan(0);
  });
});

describe("контактные данные", () => {
  it("телефоны содержат только цифры и +", () => {
    expect(contactInfo.phoneMainHref).toMatch(/^\+?\d{9,15}$/);
    expect(contactInfo.phoneSecondHref).toMatch(/^\+?\d{9,15}$/);
  });

  it("указаны адрес и координаты", () => {
    expect(contactInfo.address).toContain("Орша");
    expect(contactInfo.addressDetail.length).toBeGreaterThan(0);
    expect(contactInfo.coordinates.split(",").length).toBe(2);
  });

  it("ссылки на соцсети валидны", () => {
    expect(contactInfo.instagram).toMatch(/^https:\/\//);
    expect(contactInfo.vk).toMatch(/^https:\/\//);
  });
});
