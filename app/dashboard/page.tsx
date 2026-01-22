import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import DashboardClient from "./DashboardClient";
import { getDashboardStats, getPerformanceSeries } from "@/lib/metrics";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userEmail = session.user?.email ?? "creador@viralify.com";
  const stats = await getDashboardStats(userEmail);
  const performance = await getPerformanceSeries(userEmail);

  return (
    <DashboardClient
      userName={session.user?.name ?? "Creador"}
      userEmail={userEmail}
      stats={stats}
      performance={performance}
    />
  );
}
