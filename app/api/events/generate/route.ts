import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url } = await request.json().catch(() => ({ url: "" }));
  const sourceUrl = typeof url === "string" ? url : "";

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("clips").insert({
    user_email: session.user.email,
    source_url: sourceUrl,
    title: "Clip generado",
    duration_seconds: 45,
    source_duration_seconds: 300,
    impressions: 0,
    clicks: 0,
    retention_avg: 0
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
