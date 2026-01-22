type ActionItem = {
  title: string;
  desc: string;
};

type QuickActionsProps = {
  actions: ActionItem[];
  onActionSelect: (title: string) => void;
};

export default function QuickActions({
  actions,
  onActionSelect
}: QuickActionsProps) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Acciones rápidas
      </h2>
      <div className="mt-4 space-y-4">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={() => onActionSelect(action.title)}
            className="w-full rounded-2xl border border-slate-200/70 bg-slate-100 px-4 py-4 text-left transition hover:border-slate-300 hover:bg-slate-200 dark:border-white/15 dark:bg-black/20 dark:hover:border-white/30 dark:hover:bg-black/30"
          >
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {action.title}
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-white/60">
              {action.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
