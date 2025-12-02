import {
  checkout,
  polar,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { prisma } from "./db";
import { sendDeleteAccountConfirmation, sendVerificationEmail } from "./email";
import { polarClient } from "./polar";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        // Send verification email with URL to confirm account deletion
        // Don't await to prevent timing attacks
        await sendDeleteAccountConfirmation(user.email, url).catch((error) => {
          console.error("Failed to send account deletion confirmation:", error);
        });
      },
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // Only handle email verification, not sign-in or password reset
        if (type === "email-verification") {
          // Don't await to prevent timing attacks
          await sendVerificationEmail(email, otp).catch((error) => {
            console.error("Failed to send verification email:", error);
          });
        }
      },
      sendVerificationOnSignUp: true,
      otpLength: 6,
      expiresIn: 300, // 5 minutes
    }),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: process.env.POLAR_PRODUCT_ID || "",
              slug: "pro", // Checkout URL: /checkout/pro
            },
          ],
          successUrl: `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/dashboard?checkout=success`,
          authenticatedUsersOnly: true,
        }),
        portal(),
        usage(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET || "",
          onSubscriptionCreated: async (payload) => {
            console.log("Subscription created:", payload);

            // Create subscription in database
            await prisma.subscription.create({
              data: {
                userId: payload.data.customer.externalId as string,
                polarSubscriptionId: payload.data.id,
                polarCustomerId: payload.data.customerId,
                polarProductId: payload.data.productId,
                status: payload.data.status,
                currentPeriodStart: payload.data.currentPeriodStart,
                currentPeriodEnd: payload.data.currentPeriodEnd,
                monthlyCredits: 20,
                creditsUsed: 0,
              },
            });

            // Reset user credits to 20 for Pro plan
            await prisma.user.update({
              where: { id: payload.data.customer.externalId as string },
              data: {
                credits: 20,
                creditsResetAt: new Date(),
              },
            });
          },
          onSubscriptionUpdated: async (payload) => {
            console.log("Subscription updated:", payload);

            // Update subscription in database
            await prisma.subscription.update({
              where: { polarSubscriptionId: payload.data.id },
              data: {
                status: payload.data.status,
                currentPeriodStart: payload.data.currentPeriodStart,
                currentPeriodEnd: payload.data.currentPeriodEnd,
                cancelAtPeriodEnd: payload.data.cancelAtPeriodEnd || false,
              },
            });
          },
          onSubscriptionActive: async (payload) => {
            console.log("Subscription activated:", payload);

            // Reset credits for new billing period
            const subscription = await prisma.subscription.findUnique({
              where: { polarSubscriptionId: payload.data.id },
            });

            if (subscription) {
              await prisma.subscription.update({
                where: { polarSubscriptionId: payload.data.id },
                data: {
                  creditsUsed: 0,
                  currentPeriodStart: payload.data.currentPeriodStart,
                  currentPeriodEnd: payload.data.currentPeriodEnd,
                },
              });

              await prisma.user.update({
                where: { id: subscription.userId },
                data: {
                  credits: 20,
                  creditsResetAt: new Date(),
                },
              });
            }
          },
          onSubscriptionCanceled: async (payload) => {
            console.log("Subscription canceled:", payload);

            await prisma.subscription.update({
              where: { polarSubscriptionId: payload.data.id },
              data: {
                status: payload.data.status,
                cancelAtPeriodEnd: true,
              },
            });
          },
          onSubscriptionRevoked: async (payload) => {
            console.log("Subscription revoked:", payload);

            const subscription = await prisma.subscription.findUnique({
              where: { polarSubscriptionId: payload.data.id },
            });

            if (subscription) {
              // Delete subscription and reset user to free tier
              await prisma.subscription.delete({
                where: { polarSubscriptionId: payload.data.id },
              });

              await prisma.user.update({
                where: { id: subscription.userId },
                data: {
                  credits: 5,
                  creditsResetAt: new Date(),
                },
              });
            }
          },
        }),
      ],
    }),
  ],
});
