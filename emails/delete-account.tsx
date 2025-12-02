import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface DeleteAccountEmailProps {
  email: string;
  url: string;
}

export default function DeleteAccountEmail({
  email,
  url,
}: DeleteAccountEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        Confirm account deletion - This action cannot be undone
      </Preview>
      <Tailwind>
        <Body className="bg-[#F6F8FA] font-sans py-10">
          <Container className="bg-[#FFFFFF] mx-auto px-8 py-10 rounded-xl max-w-[600px]">
            {/* Logo */}
            <Section className="text-center mb-2">
              <Img
                src="https://www.spacemintai.com/logo.png"
                alt="Spacemint AI"
                className="w-full h-auto max-w-18 mx-auto"
              />
            </Section>

            {/* Main Content */}
            <Section>
              <Heading className="text-[#dc2626] text-[24px] font-bold mb-6 text-center">
                Confirm Account Deletion
              </Heading>

              <div className="bg-[#FEE2E2] border-2 border-solid border-[#dc2626] rounded-xl px-6 py-5 mb-6">
                <Text className="text-[#991b1b] text-[16px] font-bold leading-6 m-0">
                  ⚠️ Warning: This action cannot be undone
                </Text>
              </div>

              <Text className="text-[#020304] text-[16px] leading-6 mb-6">
                You requested to permanently delete your Spacemint AI account.
              </Text>

              <Text className="text-[#020304] text-[16px] leading-6 mb-6">
                If you proceed, all your data will be permanently removed from
                our servers, including:
              </Text>

              <ul className="text-[#020304] text-[16px] leading-6 mb-6 pl-5">
                <li>All generated floor plans and images</li>
                <li>Your account settings and preferences</li>
                <li>Your subscription and billing history</li>
                <li>All saved projects and folders</li>
              </ul>

              {/* Delete Button */}
              <Section className="text-center mb-8">
                <Button
                  href={url}
                  className="bg-[#dc2626] text-white text-[16px] font-semibold px-8 py-4 rounded-lg inline-block no-underline"
                >
                  Delete My Account
                </Button>
              </Section>

              <Text className="text-[#020304] text-[14px] leading-5 mb-6 text-center">
                <strong>This link will expire in 24 hours.</strong>
              </Text>

              <Text className="text-[#020304] text-[16px] leading-6 mb-8">
                If you didn't request this, please ignore this email and
                consider changing your password immediately.
              </Text>

              <Text className="text-[#666666] text-[14px] leading-5">
                This email was sent to {email}
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-[#E5E7EB] pt-8 mt-10">
              <Text className="text-[#666666] text-[14px] leading-5 text-center mb-4">
                Transform floor plans into beautifully staged interiors with the
                power of AI.
              </Text>

              <Text className="text-[#666666] text-[12px] leading-4 text-center mb-2">
                Visit us at{" "}
                <Link
                  href="https://spacemintai.com"
                  className="text-[#392e58] underline"
                >
                  spacemintai.com
                </Link>
              </Text>

              <Text className="text-[#666666] text-[12px] leading-4 text-center m-0">
                © 2025 Spacemint AI. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export const PreviewProps: DeleteAccountEmailProps = {
  email: "maythamajam@gmail.com",
  url: "https://spacemintai.com/delete-account?token=abc123",
};
