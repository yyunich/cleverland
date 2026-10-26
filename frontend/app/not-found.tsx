import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-7xl font-bold text-neon-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-white">
          Такой страницы нет
        </h1>
        <p className="mt-2 text-slate-400">
          Возможно, курс переехал — загляните в каталог.
        </p>
        <Link href="/" className="btn-primary mt-7">
          На главную
        </Link>
      </div>
    </section>
  );
}
