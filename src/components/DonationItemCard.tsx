import type { DonationCategory } from "@/lib/charity";

export default function DonationCategoryCard({
  category,
}: {
  category: DonationCategory;
}) {
  return (
    <div className="rounded-2xl bg-white shadow-sm shadow-purple-100 p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl" aria-hidden>
          {category.icon}
        </span>
        <h3 className="font-display font-semibold text-purple-900">
          {category.title}
        </h3>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-purple-700/80">
        {category.items.map((item) => (
          <li key={item} className="flex items-start gap-1.5">
            <span className="text-purple-400 leading-5" aria-hidden>
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
