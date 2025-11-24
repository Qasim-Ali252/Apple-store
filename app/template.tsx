"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide navbar and footer on auth pages
  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!isAuthPage && <FooterWrapper />}
    </>
  );
}
