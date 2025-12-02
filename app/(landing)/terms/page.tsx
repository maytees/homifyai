import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last Updated: December 1, 2025
      </p>

      <div className="space-y-8 prose prose-sm max-w-none">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using Spacemint AI ("Service"), you agree to be
            bound by these Terms of Service. If you do not agree to these
            terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p>
            Spacemint AI is a web-based application that transforms floor plan
            blueprints into furnished 3D renderings using artificial
            intelligence. The Service is operated by Spacemint AI, a sole
            proprietorship located in Virginia, USA.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Eligibility</h2>
          <p>
            You must be at least 13 years old to use this Service. By using the
            Service, you represent and warrant that you meet this age
            requirement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. User Accounts</h2>
          <p>
            To access certain features of the Service, you must create an
            account. You are responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Providing accurate and current information</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
          <p>You agree NOT to use the Service to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Generate inappropriate, offensive, or explicit content of any kind
            </li>
            <li>
              Engage in any illegal activities or violate any applicable laws
            </li>
            <li>
              Upload malicious code, viruses, or any harmful software
            </li>
            <li>
              Attempt to gain unauthorized access to the Service or other users'
              accounts
            </li>
            <li>
              Interfere with or disrupt the Service or servers
            </li>
            <li>
              Use the Service in any way that could damage, disable, or impair
              the Service
            </li>
          </ul>
          <p className="mt-4">
            We reserve the right to suspend or terminate accounts that violate
            these terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Subscription and Payment</h2>
          <p>
            Spacemint AI offers both free and paid subscription plans. Payment
            processing is handled by Polar, a third-party payment processor.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Free Plan: 5 generations per month with watermarked results
            </li>
            <li>
              Pro Plan: $12/month for 20 credits plus overage billing at $0.50
              per additional credit
            </li>
            <li>
              Subscriptions automatically renew unless cancelled before the
              renewal date
            </li>
            <li>
              You can cancel your subscription at any time through your account
              settings
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Refund Policy</h2>
          <p>
            All sales are final. We do not offer refunds for subscription fees
            or credit purchases. However, if you experience technical issues or
            have special circumstances, please contact us at{" "}
            <Link
              href="mailto:support@spacemintai.com"
              className="text-primary underline"
            >
              support@spacemintai.com
            </Link>{" "}
            to discuss your situation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
          <p>
            <strong>Your Content:</strong> You retain ownership of the floor
            plans you upload. By using the Service, you grant us a license to
            process your uploads solely for the purpose of providing the
            Service.
          </p>
          <p className="mt-4">
            <strong>Generated Content:</strong> You own the 3D renderings
            generated by the Service. You may download, use, and distribute your
            generated content as you see fit.
          </p>
          <p className="mt-4">
            <strong>Our Platform:</strong> The Service, including its code,
            design, and branding, is owned by Spacemint AI and protected by
            intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Data Export and Portability</h2>
          <p>
            You may download and export your generated floor plans at any time
            through the Service. Pro users have unlimited download access, while
            free users may have limited access as specified in their plan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Account Termination</h2>
          <p>
            <strong>By You:</strong> You may delete your account at any time
            through your account settings. Upon deletion, your data will be
            immediately and permanently removed from our servers.
          </p>
          <p className="mt-4">
            <strong>By Us:</strong> We reserve the right to suspend or terminate
            your account if you violate these Terms of Service or engage in
            fraudulent or illegal activities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES
            OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THE
            SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, SPACEMINT AI SHALL NOT BE
            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER
            INCURRED DIRECTLY OR INDIRECTLY.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time.
            We will notify users of any material changes via email or through the
            Service. Your continued use of the Service after changes constitutes
            acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">14. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in
            accordance with the laws of the State of Virginia, USA, without
            regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact us at:
          </p>
          <p className="mt-4">
            <strong>Email:</strong>{" "}
            <Link
              href="mailto:support@spacemintai.com"
              className="text-primary underline"
            >
              support@spacemintai.com
            </Link>
            <br />
            <strong>Website:</strong>{" "}
            <Link
              href="https://spacemintai.com"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              spacemintai.com
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
