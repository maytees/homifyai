import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface VerificationOTPEmailProps {
  otp: string;
  email: string;
}

export default function VerificationOTPEmail({
  otp,
  email,
}: VerificationOTPEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Tailwind>
        <Body className="bg-background font-sans">
          <Container className="mx-auto my-10 max-w-lg rounded-lg border border-border bg-card p-8">
            <Heading className="text-2xl font-bold text-foreground mb-6">
              Verify your email address
            </Heading>
            <Text className="text-base text-muted-foreground mb-4">
              Thank you for signing up! Please use the following verification
              code to verify your email address:
            </Text>
            <Section className="bg-muted rounded-lg p-6 text-center mb-6">
              <Text className="text-3xl font-bold tracking-wider text-foreground m-0">
                {otp}
              </Text>
            </Section>
            <Text className="text-sm text-muted-foreground mb-4">
              This code will expire in 5 minutes.
            </Text>
            <Text className="text-sm text-muted-foreground mb-4">
              If you didn't request this verification code, you can safely
              ignore this email.
            </Text>
            <Text className="text-xs text-muted-foreground border-t border-border pt-4 mt-6">
              This email was sent to {email}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
