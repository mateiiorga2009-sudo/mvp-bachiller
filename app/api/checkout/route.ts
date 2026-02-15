import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

const PRICE_ID = "price_1T17Ul0m3UmkDm1nWCDnl7NY";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl = process.env.NEXTAUTH_URL ?? request.headers.get("origin") ?? "";
  const { priceId } = await request.json().catch(() => ({ priceId: "" }));

  if (!secretKey || !baseUrl) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2023-10-16" });
  const resolvedPriceId = priceId || PRICE_ID;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: resolvedPriceId, quantity: 1 }],
    customer_email: session.user.email,
    success_url: `${baseUrl}/dashboard?success=true`,
    cancel_url: `${baseUrl}/dashboard`
  });

  return NextResponse.json({ url: checkoutSession.url });
}
