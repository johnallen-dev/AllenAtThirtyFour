export default function StatTile({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-2xl bg-white shadow-md shadow-purple-100 p-5 text-center">
      <p className="text-2xl font-bold text-purple-700">{value}</p>
      <p className="mt-1 text-xs text-purple-500">{label}</p>
    </div>
  );
}
