import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-8xl font-extrabold tracking-tight text-brand">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-extrabold text-ink">
          Такой страницы нет
        </h1>
        <p className="mt-2 text-ink-soft">
          Возможно, курс переехал — загляните в каталог.
        </p>
        <Link href="/" className="btn-dark mt-8">
          На главную
        </Link>
      </div>
    </section>
  );
}
