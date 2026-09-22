import { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function MetricCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-300
        hover:shadow-lg
      "
    >
      {/* Icon */}
      <div className="mb-5 inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      {/* Value */}
      <h2 className="text-3xl font-bold text-slate-900">
        {value}
      </h2>
      {/* Label */}
      <p className="mt-1 text-sm font-medium text-slate-500">
        {title}
      </p>
    </div>
  );
}