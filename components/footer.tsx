import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Image
                src="/logo.svg"
                alt="Spacemint AI Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-medium text-sm">Spacemint AI</span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-xs">
              Transform floor plans into beautifully staged interiors with the
              power of AI.
            </p>
          </div>

          <div className="flex gap-8">
            <div>
              <h4 className="text-xs font-medium mb-3 uppercase tracking-wider">
                Product
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#how-it-works"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-medium mb-3 uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t">
          <p className="text-xs text-muted-foreground text-center">
            © 2025 Spacemint AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
