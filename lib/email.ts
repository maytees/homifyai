import { Resend } from "resend";
import VerificationOTPEmail from "@/emails/verification-otp";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  otp: string,
): Promise<void> {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: email,
      subject: "Verify your email address",
      react: VerificationOTPEmail({ otp, email }),
    });
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Failed to send verification email");
  }
}
