import { Resend } from "resend";
import VerificationOTPEmail from "@/emails/verification-otp";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  otp: string,
): Promise<void> {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@spacemintai.com",
      to: email,
      subject: "Verify your email address",
      react: VerificationOTPEmail({ otp, email }),
    });
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Failed to send verification email");
  }
}

export async function sendEmailChangeVerification(
  email: string,
  url: string,
): Promise<void> {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@spacemintai.com",
      to: email,
      subject: "Verify your new email address",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Verify Your New Email</h2>
          <p>You requested to change your email address to this email (<strong>${email}</strong>).</p>
          <p>Click the button below to verify this email and complete the change:</p>
          <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 6px; margin: 16px 0;">
            Verify New Email
          </a>
          <p style="color: #666; font-size: 14px;">If you didn't request this change, you can safely ignore this email.</p>
          <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send email change verification:", error);
    throw new Error("Failed to send email change verification");
  }
}

export async function sendDeleteAccountConfirmation(
  email: string,
  url: string,
): Promise<void> {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@spacemintai.com",
      to: email,
      subject: "Confirm account deletion",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Confirm Account Deletion</h2>
          <p><strong>Warning:</strong> You requested to permanently delete your account.</p>
          <p>This action cannot be undone. All your data will be permanently removed from our servers.</p>
          <p>Click the button below to confirm account deletion:</p>
          <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #dc2626; color: #fff; text-decoration: none; border-radius: 6px; margin: 16px 0;">
            Delete My Account
          </a>
          <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email and consider changing your password.</p>
          <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send account deletion confirmation:", error);
    throw new Error("Failed to send account deletion confirmation");
  }
}
