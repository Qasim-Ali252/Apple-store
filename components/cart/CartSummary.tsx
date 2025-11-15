"use client";

import React from "react";
import { useCart } from "../../app/context/CartContext";
import { useRouter } from "next/navigation";

const CartSummary: React.FC = () => {
  const { cartItems } = useCart();
  const router = useRouter();

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-md w-full md:w-[350px]">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span> <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-base">
          <span>Total</span> <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={() => router.push("/checkout")}
        className="mt-5 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
