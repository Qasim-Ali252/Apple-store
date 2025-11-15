"use client";

import React from "react";
import { useCart } from "../../app/context/CartContext";
import ThirdCartItem from "@/components/cart/ThirdCartItem";
import CartSummary from "@/components/cart/CartSummary";

const CartPage = () => {
  const { cartItems } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <ThirdCartItem key={item.id} {...item} />
            ))}
          </div>
          <CartSummary />
        </div>
      )}
    </div>
  );
};

export default CartPage;
