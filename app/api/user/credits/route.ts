import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json({
    credits: user.credits,
    hasSubscription: !!user.subscription,
    subscriptionStatus: user.subscription?.status,
    monthlyCredits: user.subscription?.monthlyCredits,
    creditsUsed: user.subscription?.creditsUsed,
    currentPeriodEnd: user.subscription?.currentPeriodEnd,
    cancelAtPeriodEnd: user.subscription?.cancelAtPeriodEnd,
  });
}
