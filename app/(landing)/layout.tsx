import type React from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default LandingLayout;
