type StatItem = {
  label: string;
  value: string;
  trend: string;
};

type StatsGridProps = {
  stats: StatItem[];
};

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <p className="text-xs uppercase tracking-widest text-white/60">
            {stat.label}
          </p>
          <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
          <p className="mt-2 text-xs text-emerald-300">
            {stat.trend} esta semana
          </p>
        </div>
      ))}
    </section>
  );
}
