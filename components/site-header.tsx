"use client";

import { ArrowUpCircle, Crown, SidebarIcon, Zap } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { onCreditsUpdate } from "@/lib/credits-events";

interface UserCredits {
  credits: number;
  hasSubscription: boolean;
  subscriptionStatus?: string;
  monthlyCredits?: number;
  creditsUsed?: number;
  currentPeriodEnd?: Date;
}

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCredits = async () => {
    try {
      const session = await authClient.getSession();
      if (session?.data?.user) {
        const response = await fetch("/api/user/credits", {
          cache: "no-store",
        });
        const data = await response.json();
        setUserCredits(data);
      }
    } catch (error) {
      console.error("Failed to fetch credits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();

    // Listen for credit updates
    const cleanup = onCreditsUpdate(() => {
      fetchCredits();
    });

    return cleanup;
  }, []);

  const handleUpgrade = async () => {
    await authClient.checkout({ slug: "pro" });
  };

  const isProUser =
    userCredits?.hasSubscription &&
    userCredits?.subscriptionStatus === "active";
  const maxCredits = isProUser ? userCredits?.monthlyCredits || 20 : 5;
  const progress = userCredits ? (userCredits.credits / maxCredits) * 100 : 0;

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="size-[23px]"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Homeify AI</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Credits Popover */}
        <div className="ml-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                {isProUser ? (
                  <Crown className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Zap className="h-4 w-4 text-primary" />
                )}
                <span className="hidden sm:inline">
                  {loading ? "..." : `${userCredits?.credits || 0} credits`}
                </span>
                <span className="sm:hidden">
                  {loading ? "..." : userCredits?.credits || 0}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isProUser ? (
                      <Crown className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Zap className="h-5 w-5 text-primary" />
                    )}
                    <h4 className="font-semibold">
                      {isProUser ? "Pro Plan" : "Free Plan"}
                    </h4>
                  </div>
                  {!isProUser && (
                    <Button size="sm" onClick={handleUpgrade}>
                      <ArrowUpCircle className="h-4 w-4 mr-1" />
                      Upgrade
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Credits</span>
                    <span className="font-medium">
                      {userCredits?.credits || 0} of {maxCredits}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {isProUser && userCredits && (
                  <>
                    {userCredits.currentPeriodEnd && (
                      <p className="text-xs text-muted-foreground">
                        Resets on{" "}
                        {new Date(
                          userCredits.currentPeriodEnd,
                        ).toLocaleDateString()}
                      </p>
                    )}
                    {userCredits.creditsUsed !== undefined &&
                      userCredits.creditsUsed > (userCredits.monthlyCredits || 20) && (
                        <div className="pt-2 border-t border-orange-200 bg-orange-50 dark:bg-orange-950 -mx-3 px-3 py-2 rounded">
                          <p className="text-xs font-medium text-orange-900 dark:text-orange-100">
                            Overage Usage
                          </p>
                          <p className="text-xs text-orange-800 dark:text-orange-200 mt-1">
                            You've used{" "}
                            {userCredits.creditsUsed -
                              (userCredits.monthlyCredits || 20)}{" "}
                            credit(s) beyond your included{" "}
                            {userCredits.monthlyCredits || 20}. You'll be charged
                            $0.50 per credit at the end of your billing cycle.
                          </p>
                        </div>
                      )}
                    {userCredits.credits <= 0 &&
                      userCredits.creditsUsed <=
                        (userCredits.monthlyCredits || 20) && (
                        <div className="pt-2 border-t border-yellow-200 bg-yellow-50 dark:bg-yellow-950 -mx-3 px-3 py-2 rounded">
                          <p className="text-xs font-medium text-yellow-900 dark:text-yellow-100">
                            Additional Usage
                          </p>
                          <p className="text-xs text-yellow-800 dark:text-yellow-200 mt-1">
                            You've used all your included credits. Additional
                            generations will be charged $0.50 per credit.
                          </p>
                        </div>
                      )}
                  </>
                )}

                {!isProUser && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-2">
                      Upgrade to Pro for:
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• 20 credits/month</li>
                      <li>• Priority queue</li>
                      <li>• No watermarks</li>
                      <li>• Unlimited downloads</li>
                    </ul>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
