"use client";

import { useEffect, useState } from "react";
import { Crown, ExternalLink, Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface SubscriptionData {
  hasSubscription: boolean;
  status?: string;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  monthlyCredits?: number;
  creditsUsed?: number;
}

export default function SettingsPage() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user/credits");
        const data = await response.json();
        setCredits(data.credits);
        setSubscription({
          hasSubscription: data.hasSubscription,
          status: data.subscriptionStatus,
          currentPeriodEnd: data.currentPeriodEnd,
          monthlyCredits: data.monthlyCredits,
          creditsUsed: data.creditsUsed,
        });
      } catch (error) {
        console.error("Failed to fetch subscription data:", error);
        toast.error("Failed to load subscription data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleManageSubscription = async () => {
    try {
      await authClient.customer.portal();
    } catch (error) {
      console.error("Failed to open customer portal:", error);
      toast.error("Failed to open billing portal");
    }
  };

  const handleUpgrade = async () => {
    try {
      await authClient.checkout({ slug: "pro" });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const isProUser = subscription?.hasSubscription && subscription?.status === "active";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your subscription and billing
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isProUser ? (
                <Crown className="h-5 w-5 text-yellow-500" />
              ) : (
                <Zap className="h-5 w-5 text-primary" />
              )}
              <CardTitle>{isProUser ? "Pro Plan" : "Free Plan"}</CardTitle>
            </div>
            {isProUser ? (
              <Button onClick={handleManageSubscription} variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                Manage Subscription
              </Button>
            ) : (
              <Button onClick={handleUpgrade}>Upgrade to Pro</Button>
            )}
          </div>
          <CardDescription>
            {isProUser
              ? "You're on the Pro plan with premium features"
              : "You're on the Free plan"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Credits Available</p>
              <p className="text-2xl font-bold">{credits}</p>
            </div>
            {isProUser && subscription && (
              <>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Credits Used</p>
                  <p className="text-2xl font-bold">
                    {subscription.creditsUsed} / {subscription.monthlyCredits}
                  </p>
                </div>
                <div className="p-4 border rounded-lg col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Next Billing Date</p>
                  <p className="text-lg font-medium">
                    {subscription.currentPeriodEnd
                      ? new Date(subscription.currentPeriodEnd).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                  {subscription.cancelAtPeriodEnd && (
                    <p className="text-sm text-destructive mt-2">
                      Your subscription will be canceled on this date
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {!isProUser && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Upgrade to Pro for:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  20 credits per month
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Faster staging & priority queue
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  No watermarks
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Unlimited history & downloads
                </li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
