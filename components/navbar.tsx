import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 border flex items-center justify-center">
            <Home className="w-4 h-4" />
          </div>
          <span className="font-medium text-sm">Homeify AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#how-it-works"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How it Works
          </Link>
          <Link
            href="#who-is-this-for"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Who it's For
          </Link>
          <Link
            href="#faq"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </Link>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <Button asChild variant={"outline"} size="sm" className="h-9">
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button asChild size="sm" className="h-9">
            <Link href={"/register"}>Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
