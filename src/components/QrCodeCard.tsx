"use client";

import { useEffect, useState } from "react";

export default function QrCodeCard({
  src,
  alt,
  label,
  downloadName,
}: {
  src: string;
  alt: string;
  label: string;
  downloadName: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View larger ${label} QR code`}
          className="block w-full rounded-2xl overflow-hidden border border-purple-100 shadow-sm shadow-purple-100 transition-transform active:scale-95 cursor-zoom-in"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="w-full h-auto" />
        </button>
        <p className="mt-2 text-xs font-semibold text-purple-600">{label}</p>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-purple-950/70 backdrop-blur-sm px-4 py-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="w-full h-auto rounded-2xl" />
            <p className="mt-3 text-sm font-semibold text-purple-700">{label}</p>
            <div className="mt-4 flex gap-3">
              <a
                href={src}
                download={downloadName}
                className="flex-1 rounded-full bg-purple-500 text-white px-4 py-3 text-sm font-medium hover:bg-purple-600 transition-colors"
              >
                Download
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border border-purple-200 text-purple-600 px-4 py-3 text-sm font-medium hover:bg-purple-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
