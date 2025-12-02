export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last Updated: December 1, 2025
      </p>

      <div className="space-y-8 prose prose-sm max-w-none">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Spacemint AI ("we," "our," or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our Service. By using
            Spacemint AI, you agree to the collection and use of information in
            accordance with this policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">
            2.1 Information You Provide
          </h3>
          <p>We collect information that you voluntarily provide to us:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Account Information:</strong> Name, email address, and
              password when you register
            </li>
            <li>
              <strong>Profile Information:</strong> Optional profile picture and
              other account preferences
            </li>
            <li>
              <strong>Floor Plans:</strong> Blueprint images you upload to
              generate 3D renderings
            </li>
            <li>
              <strong>Communications:</strong> Messages you send us through
              support channels
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">
            2.2 Automatically Collected Information
          </h3>
          <p>When you use the Service, we may automatically collect:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Usage Data:</strong> Pages visited, features used,
              generation history, and interaction patterns
            </li>
            <li>
              <strong>Device Information:</strong> Browser type, operating
              system, IP address, and device identifiers
            </li>
            <li>
              <strong>Technical Data:</strong> Error logs, performance metrics,
              and diagnostic information
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">
            2.3 Payment Information
          </h3>
          <p>
            We do not directly collect or store your payment card details. All
            payment processing is handled securely by Polar, our third-party
            payment processor. Polar collects and processes payment information
            according to their own privacy policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve the Service</li>
            <li>Process your floor plan generations and deliver results</li>
            <li>Manage your account and subscription</li>
            <li>Send you service-related emails (verification, confirmations)</li>
            <li>Respond to your questions and support requests</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Monitor and analyze usage patterns to improve user experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
          <p>
            We do not sell your personal information. We may share your
            information only in the following circumstances:
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">
            4.1 Service Providers
          </h3>
          <p>We share information with third-party service providers who help us operate the Service:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Polar:</strong> Payment processing and subscription
              management
            </li>
            <li>
              <strong>Email Service:</strong> Sending transactional emails
              (verification, confirmations)
            </li>
            <li>
              <strong>Cloud Infrastructure:</strong> Hosting and data storage
            </li>
            <li>
              <strong>AI Services:</strong> Processing floor plans for
              generation
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">
            4.2 Legal Requirements
          </h3>
          <p>
            We may disclose your information if required by law or in response
            to valid legal requests, such as subpoenas or court orders.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">
            4.3 Business Transfers
          </h3>
          <p>
            If we are involved in a merger, acquisition, or sale of assets, your
            information may be transferred as part of that transaction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your information against unauthorized access, alteration,
            disclosure, or destruction. These measures include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of data in transit using SSL/TLS</li>
            <li>Secure password storage using industry-standard hashing</li>
            <li>Regular security assessments and updates</li>
            <li>Limited employee access to personal information</li>
          </ul>
          <p className="mt-4">
            However, no method of transmission over the Internet is 100% secure.
            While we strive to protect your information, we cannot guarantee
            absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
          <p>
            We retain your information for as long as your account is active or
            as needed to provide you with the Service. When you delete your
            account, your personal information and all associated data
            (including generated floor plans) are immediately and permanently
            deleted from our servers.
          </p>
          <p className="mt-4">
            We may retain certain information if required by law or for
            legitimate business purposes, such as fraud prevention or resolving
            disputes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Your Privacy Rights</h2>
          <p>You have the following rights regarding your personal information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Access:</strong> Request a copy of the personal information
              we hold about you
            </li>
            <li>
              <strong>Correction:</strong> Update or correct your personal
              information through your account settings
            </li>
            <li>
              <strong>Deletion:</strong> Delete your account and all associated
              data at any time
            </li>
            <li>
              <strong>Export:</strong> Download your generated floor plans and
              data
            </li>
            <li>
              <strong>Opt-out:</strong> Unsubscribe from marketing emails (note:
              we currently do not send marketing emails)
            </li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact us at{" "}
            <a
              href="mailto:support@spacemintai.com"
              className="text-primary underline"
            >
              support@spacemintai.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to maintain your
            session and improve your experience. Cookies are small data files
            stored on your device that help us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Keep you logged in</li>
            <li>Remember your preferences</li>
            <li>Understand how you use the Service</li>
            <li>Improve performance and security</li>
          </ul>
          <p className="mt-4">
            We do not currently use third-party analytics or advertising
            tracking cookies. You can control cookies through your browser
            settings, but disabling cookies may affect the functionality of the
            Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
          <p>
            Our Service is available to users aged 13 and older. We do not
            knowingly collect personal information from children under 13. If
            you believe we have collected information from a child under 13,
            please contact us immediately, and we will take steps to delete that
            information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries
            other than your country of residence, including the United States.
            We ensure that any such transfers comply with applicable data
            protection laws and that your information remains protected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by posting the new Privacy Policy on
            this page and updating the "Last Updated" date. We encourage you to
            review this Privacy Policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our privacy
            practices, please contact us:
          </p>
          <p className="mt-4">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@spacemintai.com"
              className="text-primary underline"
            >
              support@spacemintai.com
            </a>
            <br />
            <strong>Website:</strong>{" "}
            <a
              href="https://spacemintai.com"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              spacemintai.com
            </a>
            <br />
            <strong>Location:</strong> Virginia, USA
          </p>
        </section>

        <section className="border-t pt-8 mt-12">
          <p className="text-sm text-muted-foreground">
            By using Spacemint AI, you acknowledge that you have read and
            understood this Privacy Policy and agree to its terms.
          </p>
        </section>
      </div>
    </div>
  );
}
