import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl mx-auto py-20 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-16 relative">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-mono border border-primary/30 rounded-full bg-primary/5">
          LEGAL.DOCUMENT
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          Privacy <span className="text-primary">Policy_</span>
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono">
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Last Updated: December 1, 2025</span>
        </div>
        {/* Decorative line */}
        <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
      </div>

      <div className="space-y-12">
        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[01]</span> Introduction
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Spacemint AI ("we," "our," or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our Service. By using
            Spacemint AI, you agree to the collection and use of information in
            accordance with this policy.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[02]</span> Information We Collect
          </h2>

          <h3 className="text-lg font-semibold mb-3 mt-6 text-foreground/90">
            2.1 Information You Provide
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">We collect information that you voluntarily provide to us:</p>
          <ul className="space-y-2.5 ml-4">
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">Account Information:</strong> Name, email address, and password when you register</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">Profile Information:</strong> Optional profile picture and other account preferences</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">Floor Plans:</strong> Blueprint images you upload to generate 3D renderings</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">Communications:</strong> Messages you send us through support channels</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold mb-3 mt-6 text-foreground/90">
            2.2 Automatically Collected Information
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">When you use the Service, we may automatically collect:</p>
          <ul className="space-y-2.5 ml-4">
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">Usage Data:</strong> Pages visited, features used, generation history, and interaction patterns</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">Device Information:</strong> Browser type, operating system, IP address, and device identifiers</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">Technical Data:</strong> Error logs, performance metrics, and diagnostic information</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold mb-3 mt-6 text-foreground/90">
            2.3 Payment Information
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            We do not directly collect or store your payment card details. All
            payment processing is handled securely by Polar, our third-party
            payment processor. Polar collects and processes payment information
            according to their own privacy policy.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[03]</span> How We Use Your Information
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
          <ul className="space-y-2.5 ml-4">
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Provide, maintain, and improve the Service</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Process your floor plan generations and deliver results</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Manage your account and subscription</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Send you service-related emails (verification, confirmations)</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Respond to your questions and support requests</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Detect and prevent fraud or abuse</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Monitor and analyze usage patterns to improve user experience</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Comply with legal obligations</span>
            </li>
          </ul>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[04]</span> Information Sharing and Disclosure
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            We do not sell your personal information. We may share your
            information only in the following circumstances:
          </p>

          <h3 className="text-lg font-semibold mb-3 mt-6 text-foreground/90">
            4.1 Service Providers
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">We share information with third-party service providers who help us operate the Service:</p>
          <ul className="space-y-2.5 ml-4">
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">Polar:</strong> Payment processing and subscription management</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">Email Service:</strong> Sending transactional emails (verification, confirmations)</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">Cloud Infrastructure:</strong> Hosting and data storage</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">AI Services:</strong> Processing floor plans for generation</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold mb-3 mt-6 text-foreground/90">
            4.2 Legal Requirements
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            We may disclose your information if required by law or in response
            to valid legal requests, such as subpoenas or court orders.
          </p>

          <h3 className="text-lg font-semibold mb-3 mt-6 text-foreground/90">
            4.3 Business Transfers
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            If we are involved in a merger, acquisition, or sale of assets, your
            information may be transferred as part of that transaction.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[05]</span> Data Security
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We implement appropriate technical and organizational measures to
            protect your information against unauthorized access, alteration,
            disclosure, or destruction. These measures include:
          </p>
          <ul className="space-y-2.5 ml-4 mb-4">
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Encryption of data in transit using SSL/TLS</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Secure password storage using industry-standard hashing</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Regular security assessments and updates</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Limited employee access to personal information</span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            However, no method of transmission over the Internet is 100% secure.
            While we strive to protect your information, we cannot guarantee
            absolute security.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[06]</span> Data Retention
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              We retain your information for as long as your account is active or
              as needed to provide you with the Service. When you delete your
              account, your personal information and all associated data
              (including generated floor plans) are immediately and permanently
              deleted from our servers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We may retain certain information if required by law or for
              legitimate business purposes, such as fraud prevention or resolving
              disputes.
            </p>
          </div>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[07]</span> Your Privacy Rights
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">You have the following rights regarding your personal information:</p>
          <ul className="space-y-2.5 ml-4 mb-4">
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">Access:</strong> Request a copy of the personal information we hold about you</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">Correction:</strong> Update or correct your personal information through your account settings</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">Deletion:</strong> Delete your account and all associated data at any time</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">Export:</strong> Download your generated floor plans and data</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span><strong className="text-foreground">Opt-out:</strong> Unsubscribe from marketing emails (note: we currently do not send marketing emails)</span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            To exercise these rights, please contact us at{" "}
            <Link
              href="mailto:support@spacemintai.com"
              className="text-primary underline hover:text-primary/80 transition-colors font-mono"
            >
              support@spacemintai.com
            </Link>
            .
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[08]</span> Cookies and Tracking
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use cookies and similar tracking technologies to maintain your
            session and improve your experience. Cookies are small data files
            stored on your device that help us:
          </p>
          <ul className="space-y-2.5 ml-4 mb-4">
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Keep you logged in</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Remember your preferences</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Understand how you use the Service</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Improve performance and security</span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            We do not currently use third-party analytics or advertising
            tracking cookies. You can control cookies through your browser
            settings, but disabling cookies may affect the functionality of the
            Service.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[09]</span> Children's Privacy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our Service is available to users aged 13 and older. We do not
            knowingly collect personal information from children under 13. If
            you believe we have collected information from a child under 13,
            please contact us immediately, and we will take steps to delete that
            information.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[10]</span> International Data Transfers
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Your information may be transferred to and processed in countries
            other than your country of residence, including the United States.
            We ensure that any such transfers comply with applicable data
            protection laws and that your information remains protected.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[11]</span> Changes to This Privacy Policy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by posting the new Privacy Policy on
            this page and updating the "Last Updated" date. We encourage you to
            review this Privacy Policy periodically.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[12]</span> Contact Us
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you have any questions about this Privacy Policy or our privacy
            practices, please contact us:
          </p>
          <div className="space-y-2 font-mono text-sm">
            <p className="text-muted-foreground">
              <strong className="text-foreground">Email:</strong>{" "}
              <Link
                href="mailto:support@spacemintai.com"
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                support@spacemintai.com
              </Link>
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Website:</strong>{" "}
              <Link
                href="https://spacemintai.com"
                className="text-primary underline hover:text-primary/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                spacemintai.com
              </Link>
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Location:</strong> Virginia, USA
            </p>
          </div>
        </section>

        <section className="border-t border-border/20 pt-8 mt-12">
          <p className="text-sm text-muted-foreground leading-relaxed font-mono">
            By using Spacemint AI, you acknowledge that you have read and
            understood this Privacy Policy and agree to its terms.
          </p>
        </section>
      </div>
    </div>
  );
}
