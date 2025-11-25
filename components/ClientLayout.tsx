"use client";

import { Suspense } from "react";
import NProgressBar from "./NProgressBar";
import { WishlistProvider } from "./WishlistContext";
import { CartProvider } from "@/app/context/CartContext";
import { OrderProvider } from "@/app/context/OrderContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <NProgressBar />
      </Suspense>
      <OrderProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </OrderProvider>
    </>
  );
}
