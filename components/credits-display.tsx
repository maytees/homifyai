"use client";

import { ArrowUpCircle, Crown, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { authClient } from "@/lib/auth-client";

interface UserCredits {
  credits: number;
  hasSubscription: boolean;
  subscriptionStatus?: string;
  monthlyCredits?: number;
  creditsUsed?: number;
  currentPeriodEnd?: Date;
}

export function CreditsDisplay() {
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          // Fetch user credits from your API
          const response = await fetch("/api/user/credits");
          const data = await response.json();
          setUserCredits(data);
        }
      } catch (error) {
        console.error("Failed to fetch credits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, []);

  const handleUpgrade = async () => {
    await authClient.checkout({ slug: "pro" });
  };

  if (loading || !userCredits) {
    return null;
  }

  const isProUser =
    userCredits.hasSubscription && userCredits.subscriptionStatus === "active";
  const maxCredits = isProUser ? userCredits.monthlyCredits || 20 : 5;
  const progress = (userCredits.credits / maxCredits) * 100;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isProUser ? (
              <Crown className="h-5 w-5 text-yellow-500" />
            ) : (
              <Zap className="h-5 w-5 text-primary" />
            )}
            <CardTitle className="text-lg">
              {isProUser ? "Pro Plan" : "Free Plan"}
            </CardTitle>
          </div>
          {!isProUser && (
            <Button size="sm" onClick={handleUpgrade}>
              <ArrowUpCircle className="h-4 w-4 mr-2" />
              Upgrade
            </Button>
          )}
        </div>
        <CardDescription>
          {userCredits.credits} of {maxCredits} credits remaining
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="h-2" />
        {isProUser && userCredits.currentPeriodEnd && (
          <p className="text-xs text-muted-foreground mt-2">
            Resets on{" "}
            {new Date(userCredits.currentPeriodEnd).toLocaleDateString()}
          </p>
        )}
        {!isProUser && (
          <p className="text-xs text-muted-foreground mt-2">
            Upgrade to Pro for 20 credits/month + unlimited downloads
          </p>
        )}
      </CardContent>
    </Card>
  );
}
