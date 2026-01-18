type ActionItem = {
  title: string;
  desc: string;
};

type QuickActionsProps = {
  actions: ActionItem[];
};

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
      <h2 className="text-lg font-semibold">Acciones rápidas</h2>
      <div className="mt-4 space-y-4">
        {actions.map((action) => (
          <button
            key={action.title}
            className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-4 text-left transition hover:border-white/30 hover:bg-black/30"
          >
            <p className="text-sm font-semibold">{action.title}</p>
            <p className="mt-1 text-xs text-white/60">{action.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
