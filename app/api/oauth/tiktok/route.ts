import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const baseUrl = process.env.NEXTAUTH_URL ?? request.headers.get("origin") ?? "";
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI;
  const scope = process.env.TIKTOK_SCOPE ?? "user.info.basic";

  if (!clientKey || !redirectUri) {
    return NextResponse.redirect(`${baseUrl}/dashboard?error=tiktok_oauth`);
  }

  const url = new URL("https://www.tiktok.com/v2/auth/authorize/");
  url.searchParams.set("client_key", clientKey);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", scope);
  url.searchParams.set("state", "viralify");

  return NextResponse.redirect(url.toString());
}
