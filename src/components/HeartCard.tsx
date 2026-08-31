import Link from "next/link";

export default function HeartCard({
  href,
  icon,
  title,
  description,
  cta,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl bg-white shadow-md shadow-purple-100 p-6 sm:p-7 min-h-[200px] flex flex-col transition-all duration-200 hover:shadow-lg hover:shadow-purple-200 active:scale-[0.98] border border-purple-50"
    >
      <span className="text-4xl" aria-hidden>
        {icon}
      </span>
      <h2 className="mt-4 text-lg font-semibold text-purple-900">{title}</h2>
      <p className="mt-2 text-sm text-purple-700/80 flex-1">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-purple-600 group-hover:gap-2 transition-all">
        {cta} <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
