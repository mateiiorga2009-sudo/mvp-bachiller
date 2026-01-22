import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase-admin";

export type DashboardStat = {
  label: string;
  value: string;
  trend: string;
};

type ClipRow = {
  impressions: number | null;
  clicks: number | null;
  retention_avg: number | null;
  duration_seconds: number | null;
  source_duration_seconds: number | null;
};

const formatPercent = (value: number) => `${value.toFixed(1)}%`;
const formatHours = (seconds: number) => `${(seconds / 3600).toFixed(1)}h`;

export const getDashboardStats = async (
  userEmail: string
): Promise<DashboardStat[]> => {
  if (!isSupabaseConfigured()) {
    return [
      { label: "Retención promedio", value: "0.0%", trend: "sin datos" },
      { label: "CTR estimado", value: "0.0%", trend: "sin datos" },
      { label: "Clips sugeridos", value: "0", trend: "sin datos" },
      { label: "Tiempo ahorrado", value: "0.0h", trend: "sin datos" }
    ];
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("clips")
    .select(
      "impressions, clicks, retention_avg, duration_seconds, source_duration_seconds"
    )
    .eq("user_email", userEmail);

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as ClipRow[];
  const totalClips = rows.length;
  const totalImpressions = rows.reduce(
    (sum, row) => sum + (row.impressions ?? 0),
    0
  );
  const totalClicks = rows.reduce(
    (sum, row) => sum + (row.clicks ?? 0),
    0
  );
  const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

  const retentionValues = rows
    .map((row) => row.retention_avg)
    .filter((value): value is number => value !== null && value !== undefined);
  const avgRetention =
    retentionValues.length > 0
      ? retentionValues.reduce((sum, value) => sum + value, 0) /
        retentionValues.length
      : 0;

  const timeSavedSeconds = rows.reduce((sum, row) => {
    const source = row.source_duration_seconds ?? 0;
    const clip = row.duration_seconds ?? 0;
    return sum + Math.max(source - clip, 0);
  }, 0);

  return [
    {
      label: "Retención promedio",
      value: formatPercent(avgRetention),
      trend: totalClips > 0 ? "actual" : "sin datos"
    },
    {
      label: "CTR estimado",
      value: formatPercent(ctr),
      trend: totalClips > 0 ? "actual" : "sin datos"
    },
    {
      label: "Clips sugeridos",
      value: `${totalClips}`,
      trend: totalClips > 0 ? "actual" : "sin datos"
    },
    {
      label: "Tiempo ahorrado",
      value: formatHours(timeSavedSeconds),
      trend: totalClips > 0 ? "actual" : "sin datos"
    }
  ];
};

export const getPerformanceSeries = async (
  userEmail: string
): Promise<number[]> => {
  if (!isSupabaseConfigured()) {
    return [12, 16, 20, 18, 22, 24, 20];
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("clips")
    .select("created_at")
    .eq("user_email", userEmail);

  if (error) {
    throw new Error(error.message);
  }

  const today = new Date();
  const dayBuckets = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    return date.toDateString();
  });

  const counts = dayBuckets.reduce<Record<string, number>>((acc, day) => {
    acc[day] = 0;
    return acc;
  }, {});

  (data ?? []).forEach((row: { created_at: string | null }) => {
    if (!row.created_at) return;
    const dayKey = new Date(row.created_at).toDateString();
    if (counts[dayKey] !== undefined) {
      counts[dayKey] += 1;
    }
  });

  const series = dayBuckets.map((day) => counts[day]);
  const max = Math.max(...series, 0);

  return series.map((value) =>
    max > 0 ? Math.round((value / max) * 70 + 10) : 10
  );
};
