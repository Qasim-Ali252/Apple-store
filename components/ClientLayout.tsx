"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import FooterWrapper from "./FooterWrapper";
import NProgressBar from "./NProgressBar";
import { WishlistProvider } from "./WishlistContext";
import { CartProvider } from "@/app/context/CartContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide navbar and footer on auth pages
  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  return (
    <>
      <Suspense fallback={null}>
        <NProgressBar />
      </Suspense>
      <CartProvider>
        <WishlistProvider>
          {!isAuthPage && <Navbar />}
          <main className="flex-1">
            {children}
          </main>
          {!isAuthPage && <FooterWrapper />}
        </WishlistProvider>
      </CartProvider>
    </>
  );
}
