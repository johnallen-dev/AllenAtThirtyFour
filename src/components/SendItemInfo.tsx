import { SEND_TO } from "@/lib/contact";

export default function SendItemInfo({
  title,
  note,
}: {
  title: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl bg-purple-50 p-4 sm:p-5 text-sm text-purple-700">
      <p className="font-semibold text-purple-900">{title}</p>
      {note && <p className="mt-1 text-purple-600">{note}</p>}
      <p className="mt-2">📞 {SEND_TO.contactNumber}</p>
      <p className="mt-0.5">📍 {SEND_TO.address}</p>
    </div>
  );
}
