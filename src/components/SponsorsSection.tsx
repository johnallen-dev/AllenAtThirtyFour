import { SPONSORS } from "@/lib/sponsors";

export default function SponsorsSection() {
  return (
    <div className="rounded-2xl bg-purple-50 p-5 sm:p-6 text-center">
      <p className="font-display text-lg font-semibold text-purple-900">
        Your Generosity Creates a Circle of Abundance.
      </p>
      <p className="mt-1 text-xs text-purple-500">
        Thank you to these brands for the support!
      </p>

      <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-4">
        {SPONSORS.map((sponsor) => (
          <a
            key={sponsor.id}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 rounded-xl p-2 hover:bg-purple-100 transition-colors"
          >
            <span className="aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-sm shadow-purple-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                className="w-full h-full object-cover object-left"
              />
            </span>
            <span className="text-xs font-medium text-purple-700 text-center leading-tight">
              {sponsor.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
