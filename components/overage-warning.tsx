"use client";

import { AlertCircle, DollarSign } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface OverageWarningProps {
  credits: number;
  hasSubscription: boolean;
  subscriptionStatus?: string;
  monthlyCredits?: number;
  creditsUsed?: number;
  overageRate?: number; // Cost per credit overage (default: $0.50)
}

export function OverageWarning({
  credits,
  hasSubscription,
  subscriptionStatus,
  monthlyCredits = 20,
  creditsUsed = 0,
  overageRate = 0.5,
}: OverageWarningProps) {
  const isProUser = hasSubscription && subscriptionStatus === "active";

  // Free users - no overage, just out of credits
  if (!isProUser) {
    if (credits === 0) {
      return (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Credits Remaining</AlertTitle>
          <AlertDescription>
            You've used all your free credits. Upgrade to Pro for 20 credits per
            month plus overage billing.
          </AlertDescription>
        </Alert>
      );
    }
    return null;
  }

  // Pro users - show overage warnings
  const includedCredits = monthlyCredits;
  const currentOverage = Math.max(0, creditsUsed - includedCredits);
  const willBeOverage = credits <= 0;

  // Already in overage
  if (currentOverage > 0) {
    const overageCost = currentOverage * overageRate;
    return (
      <Alert className="mb-6 border-orange-500 bg-orange-50 dark:bg-orange-950">
        <DollarSign className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        <AlertTitle className="text-orange-900 dark:text-orange-100">
          Overage Usage
        </AlertTitle>
        <AlertDescription className="text-orange-800 dark:text-orange-200">
          You've used {currentOverage} credit{currentOverage !== 1 ? "s" : ""}{" "}
          beyond your included {includedCredits}. You'll be charged $
          {overageCost.toFixed(2)} at the end of your billing cycle.
        </AlertDescription>
      </Alert>
    );
  }

  // About to go into overage
  if (willBeOverage) {
    return (
      <Alert className="mb-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
        <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
        <AlertTitle className="text-yellow-900 dark:text-yellow-100">
          Overage Warning
        </AlertTitle>
        <AlertDescription className="text-yellow-800 dark:text-yellow-200">
          You've used all your included credits. Additional generations will be
          charged ${overageRate.toFixed(2)} per credit at the end of your
          billing cycle.
        </AlertDescription>
      </Alert>
    );
  }

  // Getting close to overage (less than 3 credits left)
  if (credits <= 3 && credits > 0) {
    return (
      <Alert className="mb-6 border-blue-500 bg-blue-50 dark:bg-blue-950">
        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-900 dark:text-blue-100">
          Low Credits
        </AlertTitle>
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          You have {credits} credit{credits !== 1 ? "s" : ""} remaining. After
          that, additional generations will be charged ${overageRate.toFixed(2)}{" "}
          per credit.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
