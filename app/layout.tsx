// app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";
// import Footer from "@/components/Footer";
import FooterWrapper from "@/components/FooterWrapper";
import { WishlistProvider } from "@/components/WishlistContext";

import { CartProvider } from "./context/CartContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <CartProvider>
            <WishlistProvider>
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <FooterWrapper />
            </WishlistProvider>
         </CartProvider>
      </body>
    </html>
  );
}
