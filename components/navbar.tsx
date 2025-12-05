"use client";

import { LogOut, Settings, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

interface UserData {
  name: string;
  email: string;
  image?: string;
}

export function Navbar() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser({
            name: session.data.user.name,
            email: session.data.user.email,
            image: session.data.user.image || undefined,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          posthog.reset();
          router.push("/login"); // redirect to login page
        },
      },
    });
  };

  return (
    <nav className="border-b border-border/40 sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* Decorative top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

        {/* Logo - Left Side */}
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2.5 w-fit group">
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
        </div>

        {/* Navigation Links - Center */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <Link
            href="/#how-it-works"
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap rounded-md hover:bg-primary/5 font-mono"
          >
            [Process]
          </Link>
          <Link
            href="/#who-its-for"
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap rounded-md hover:bg-primary/5 font-mono"
          >
            [Users]
          </Link>
          <Link
            href="/#pricing"
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap rounded-md hover:bg-primary/5 font-mono"
          >
            [Pricing]
          </Link>
          <Link
            href="/#faq"
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap rounded-md hover:bg-primary/5 font-mono"
          >
            [FAQ]
          </Link>
        </div>

        {/* User Menu / Auth Buttons - Right Side */}
        <div className="flex-1 flex justify-end">
          <div className="flex flex-row gap-2 items-center">
            {loading ? (
              <div className="w-8 h-8" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full hover:ring-2 hover:ring-primary/20 transition-all"
                  >
                    <Avatar className="h-9 w-9 ring-1 ring-border">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 border-border/40"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground font-mono">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <Zap className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    // className="cursor-pointer text-destructive focus:text-destructive"
                    variant="destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-9 font-mono"
                >
                  <Link href="/login">Login_</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="h-9 bg-primary hover:bg-primary/90 font-mono"
                >
                  <Link href="/register">Start_</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
