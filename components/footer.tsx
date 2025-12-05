import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-background/50 backdrop-blur-sm">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-12 border-b border-border/20">
          {/* Brand Section */}
          <div className="md:col-span-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-4 w-fit group"
            >
              <div className="relative">
                <Image
                  src="/logo.svg"
                  alt="Spacemint AI Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute -inset-1 bg-primary/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity -z-10" />
              </div>
              <span className="font-semibold text-sm tracking-tight">
                Spacemint<span className="text-primary">_</span>AI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed font-mono">
              {"//"} Transform floor plans into beautifully staged interiors
              with the power of AI.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>System Online</span>
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Product Column */}
            <div>
              <h4 className="text-xs font-semibold mb-4 uppercase tracking-wider text-foreground/80 font-mono">
                [Product]
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/#how-it-works"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono inline-flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                    <span>Process</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#who-its-for"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono inline-flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                    <span>Users</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#pricing"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono inline-flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                    <span>Pricing</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono inline-flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                    <span>FAQ</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-xs font-semibold mb-4 uppercase tracking-wider text-foreground/80 font-mono">
                [Legal]
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono inline-flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                    <span>Privacy</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono inline-flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                    <span>Terms</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-xs font-semibold mb-4 uppercase tracking-wider text-foreground/80 font-mono">
                [Resources]
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/register"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono inline-flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                    <span>Get Started</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono inline-flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                    <span>Login</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            © 2025 Spacemint AI<span className="text-primary">_</span> All
            rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
            <span className="hidden sm:inline">v2.0.0</span>
            <span className="hidden sm:inline">•</span>
            <span>Virginia, USA</span>
          </div>
        </div>
      </div>

      {/* Decorative bottom corner accents */}
      <div className="absolute bottom-0 left-0 w-32 h-px bg-linear-to-r from-primary/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-32 h-px bg-linear-to-l from-primary/20 to-transparent" />
    </footer>
  );
}
