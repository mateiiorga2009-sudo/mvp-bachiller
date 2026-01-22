type PerformanceChartProps = {
  values: number[];
};

export default function PerformanceChart({ values }: PerformanceChartProps) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Tendencia de rendimiento
        </h2>
        <span className="text-xs text-slate-500 dark:text-white/60">
          Últimos 7 días
        </span>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-3">
        {values.map((value, index) => (
          <div
            key={`${value}-${index}`}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="w-full rounded-full bg-gradient-to-t from-cyan-500/30 to-indigo-500/60"
              style={{ height: `${value}%` }}
            />
            <span className="text-[10px] text-slate-400 dark:text-white/50">
              D{index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
