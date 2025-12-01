"use client";

import { AlertCircle, Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function EmailVerificationBanner() {
  const router = useRouter();
  const [isResending, startResend] = useTransition();
  const [user, setUser] = useState<{
    email: string;
    emailVerified: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser({
            email: session.data.user.email,
            emailVerified: session.data.user.emailVerified,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleResendVerification = async () => {
    if (!user?.email) return;

    startResend(async () => {
      try {
        const { error } = await authClient.emailOtp.sendVerificationOtp({
          email: user.email,
          type: "email-verification",
        });

        if (error) {
          toast.error(error.message || "Failed to send verification email");
          return;
        }

        toast.success("Verification email sent!");
        router.push(`/verify-email?email=${encodeURIComponent(user.email)}`);
      } catch (error) {
        console.error("Resend error:", error);
        toast.error("An error occurred while sending verification email");
      }
    });
  };

  // Don't show anything while loading or if user is verified
  if (loading || !user || user.emailVerified) {
    return null;
  }

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Email Verification Required</AlertTitle>
      <AlertDescription className="flex items-center justify-between gap-4">
        <span>
          Please verify your email address to generate floor plans. Would you
          like us to send a verification code to <strong>{user.email}</strong>?
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResendVerification}
          disabled={isResending}
          className="shrink-0 bg-background"
        >
          {isResending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Send Code
            </>
          )}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
