// app/layout.tsx
"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";
import { WishlistProvider } from "@/components/WishlistContext";
import { CartProvider } from "./context/CartContext";
import NProgressBar from "@/components/NProgressBar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Hide navbar and footer on auth pages
  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <NProgressBar />
        <CartProvider>
          <WishlistProvider>
            {!isAuthPage && <Navbar />}
            <main className="flex-1">
              {children}
            </main>
            {!isAuthPage && <FooterWrapper />}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
