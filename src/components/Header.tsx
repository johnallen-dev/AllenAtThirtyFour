import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-sm border-b border-purple-100">
      <div className="max-w-4xl mx-auto px-4 py-2 min-h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5">
          <span aria-hidden className="text-lg">
            💜
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display font-semibold text-purple-700 text-sm sm:text-base">
              Give a Little, Care a Lot.
            </span>
            <span className="text-[11px] text-purple-400">Allen&apos;s 34th</span>
          </span>
        </Link>
        <Link
          href="/admin"
          className="text-xs text-purple-400 border border-purple-200 rounded-full px-3 py-1.5 hover:bg-purple-50 transition-colors"
        >
          Admin Mode
        </Link>
      </div>
    </header>
  );
}
