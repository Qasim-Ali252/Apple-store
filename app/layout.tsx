// app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { WishlistProvider } from "@/components/WishlistContext";

import { CartProvider } from "./context/CartContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
            <WishlistProvider>
        <Navbar />
        {children}
           

            <footer>
            <Footer/>
      </footer>
         </WishlistProvider>
         </CartProvider>
      </body>
     
      
      
    </html>
  );
}
