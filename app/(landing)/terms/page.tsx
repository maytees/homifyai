import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-20 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-16 relative">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-mono border border-primary/30 rounded-full bg-primary/5">
          LEGAL.DOCUMENT
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          Terms of <span className="text-primary">Service_</span>
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
            <span className="text-primary">[01]</span> Agreement to Terms
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using Spacemint AI ("Service"), you agree to be
            bound by these Terms of Service. If you do not agree to these terms,
            please do not use the Service.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[02]</span> Description of Service
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Spacemint AI is a web-based application that transforms floor plan
            blueprints into furnished 3D renderings using artificial
            intelligence. The Service is operated by Spacemint AI, a sole
            proprietorship located in Virginia, USA.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[03]</span> Eligibility
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You must be at least 13 years old to use this Service. By using the
            Service, you represent and warrant that you meet this age
            requirement.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[04]</span> User Accounts
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            To access certain features of the Service, you must create an
            account. You are responsible for:
          </p>
          <ul className="space-y-2.5 ml-4">
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>
                Maintaining the confidentiality of your account credentials
              </span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>All activities that occur under your account</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Providing accurate and current information</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>Notifying us immediately of any unauthorized use</span>
            </li>
          </ul>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[05]</span> Acceptable Use
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You agree NOT to use the Service to:
          </p>
          <ul className="space-y-2.5 ml-4 mb-4">
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-destructive mt-1.5">×</span>
              <span>
                Generate inappropriate, offensive, or explicit content of any
                kind
              </span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-destructive mt-1.5">×</span>
              <span>
                Engage in any illegal activities or violate any applicable laws
              </span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-destructive mt-1.5">×</span>
              <span>
                Upload malicious code, viruses, or any harmful software
              </span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-destructive mt-1.5">×</span>
              <span>
                Attempt to gain unauthorized access to the Service or other
                users' accounts
              </span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-destructive mt-1.5">×</span>
              <span>Interfere with or disrupt the Service or servers</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-destructive mt-1.5">×</span>
              <span>
                Use the Service in any way that could damage, disable, or impair
                the Service
              </span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to suspend or terminate accounts that violate
            these terms.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[06]</span> Subscription and Payment
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Spacemint AI offers both free and paid subscription plans. Payment
            processing is handled by Polar, a third-party payment processor.
          </p>
          <ul className="space-y-2.5 ml-4">
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>
                Free Plan: 5 generations per month with watermarked results
              </span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>
                Pro Plan: $12/month for 20 credits plus overage billing at $0.50
                per additional credit
              </span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>
                Subscriptions automatically renew unless cancelled before the
                renewal date
              </span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1.5">→</span>
              <span>
                You can cancel your subscription at any time through your
                account settings
              </span>
            </li>
          </ul>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[07]</span> Refund Policy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            All sales are final. We do not offer refunds for subscription fees
            or credit purchases. However, if you experience technical issues or
            have special circumstances, please contact us at{" "}
            <Link
              href="mailto:spacemintaiapp@gmail.com"
              className="text-primary underline hover:text-primary/80 transition-colors font-mono"
            >
              spacemintaiapp@gmail.com
            </Link>{" "}
            to discuss your situation.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[08]</span> Intellectual Property
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Your Content:</strong> You
              retain ownership of the floor plans you upload. By using the
              Service, you grant us a license to process your uploads solely for
              the purpose of providing the Service.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Generated Content:</strong>{" "}
              You own the 3D renderings generated by the Service. You may
              download, use, and distribute your generated content as you see
              fit.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Our Platform:</strong> The
              Service, including its code, design, and branding, is owned by
              Spacemint AI and protected by intellectual property laws.
            </p>
          </div>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[09]</span> Data Export and
            Portability
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You may download and export your generated floor plans at any time
            through the Service. Pro users have unlimited download access, while
            free users may have limited access as specified in their plan.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[10]</span> Account Termination
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">By You:</strong> You may
              delete your account at any time through your account settings.
              Upon deletion, your data will be immediately and permanently
              removed from our servers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">By Us:</strong> We reserve the
              right to suspend or terminate your account if you violate these
              Terms of Service or engage in fraudulent or illegal activities.
            </p>
          </div>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[11]</span> Disclaimer of Warranties
          </h2>
          <p className="text-muted-foreground leading-relaxed font-mono text-xs uppercase tracking-wide">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
            WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT
            GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR
            COMPLETELY SECURE.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[12]</span> Limitation of Liability
          </h2>
          <p className="text-muted-foreground leading-relaxed font-mono text-xs uppercase tracking-wide">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, SPACEMINT AI SHALL NOT BE
            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER
            INCURRED DIRECTLY OR INDIRECTLY.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[13]</span> Changes to Terms
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify these Terms of Service at any time.
            We will notify users of any material changes via email or through
            the Service. Your continued use of the Service after changes
            constitutes acceptance of the updated terms.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[14]</span> Governing Law
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            These Terms of Service shall be governed by and construed in
            accordance with the laws of the State of Virginia, USA, without
            regard to its conflict of law provisions.
          </p>
        </section>

        <section className="relative pl-6 border-l border-border/40">
          <h2 className="text-2xl font-semibold mb-4 font-mono">
            <span className="text-primary">[15]</span> Contact Information
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you have any questions about these Terms of Service, please
            contact us at:
          </p>
          <div className="space-y-2 font-mono text-sm">
            <p className="text-muted-foreground">
              <strong className="text-foreground">Email:</strong>{" "}
              <Link
                href="mailto:spacemintaiapp@gmail.com"
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                spacemintaiapp@gmail.com
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
          </div>
        </section>
      </div>
    </div>
  );
}
