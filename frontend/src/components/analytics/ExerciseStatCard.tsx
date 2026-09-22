interface Props {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function ExerciseStatCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <span className="text-sm text-slate-400">
          {title}
        </span>
      </div>

      <h3 className="text-3xl font-bold text-white">
        {value}
      </h3>
    </div>
  );
}