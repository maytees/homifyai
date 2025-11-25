import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { auth } from "@/lib/auth";

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default LandingLayout;
