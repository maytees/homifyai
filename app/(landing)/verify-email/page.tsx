"use client";

import { Loader2, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [isVerifying, startVerify] = useTransition();
  const [isResending, startResend] = useTransition();
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!email) {
      router.push("/register");
      return;
    }

    // Countdown timer for resend
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown, email, router]);

  const handleVerify = async () => {
    if (!email || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    startVerify(async () => {
      try {
        const { error } = await authClient.emailOtp.verifyEmail({
          email,
          otp,
        });

        if (error) {
          toast.error(error.message || "Verification failed");
          return;
        }

        toast.success("Email verified successfully!");
        router.push("/dashboard");
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("An error occurred during verification");
      }
    });
  };

  const handleResend = async () => {
    if (!email) return;

    startResend(async () => {
      try {
        const { error } = await authClient.emailOtp.sendVerificationOtp({
          email,
          type: "email-verification",
        });

        if (error) {
          toast.error(error.message || "Failed to resend code");
          return;
        }

        toast.success("Verification code sent!");
        setCanResend(false);
        setCountdown(60);
      } catch (error) {
        console.error("Resend error:", error);
        toast.error("An error occurred while resending code");
      }
    });
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            We've sent a 6-digit verification code to
            <br />
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              onComplete={handleVerify}
              disabled={isVerifying}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <p className="text-sm text-muted-foreground text-center">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <Button
            onClick={handleVerify}
            disabled={otp.length !== 6 || isVerifying}
            className="w-full"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            {canResend ? (
              <Button
                variant="link"
                onClick={handleResend}
                disabled={isResending}
                className="p-0 h-auto font-normal"
              >
                {isResending ? "Sending..." : "Resend code"}
              </Button>
            ) : (
              <p>Resend code in {countdown}s</p>
            )}
          </div>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => router.push("/login")}
              className="p-0 h-auto font-normal text-sm"
            >
              Back to login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
