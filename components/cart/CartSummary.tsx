"use client";

import { useState } from "react";
import { useCart } from "../../app/context/CartContext";
import { useRouter } from "next/navigation";

const CartSummary: React.FC = () => {
  const { cartItems } = useCart();
  const router = useRouter();
  const [promoCode, setPromoCode] = useState("");
  const [bonusCard, setBonusCard] = useState("");

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal > 0 ? subtotal * 0.05 : 0;
  const shipping = subtotal > 0 ? 29 : 0;
  const total = subtotal + tax + shipping;

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      console.log("Promo code applied:", promoCode);
    }
  };

  const handleApplyBonus = () => {
    if (bonusCard.trim()) {
      console.log("Bonus card applied:", bonusCard);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 w-full lg:w-[400px] h-fit lg:sticky lg:top-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Order Summary</h2>
      
      {/* Discount Code / Promo Code */}
      <div className="mb-4">
        <label className="text-xs sm:text-sm text-gray-600 mb-2 block">
          Discount code / Promo code
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Code"
            className="flex-1 px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={handleApplyPromo}
            className="px-4 sm:px-6 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition-colors font-medium text-sm whitespace-nowrap"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Bonus Card Number */}
      <div className="mb-6">
        <label className="text-xs sm:text-sm text-gray-600 mb-2 block">
          Your bonus card number
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={bonusCard}
            onChange={(e) => setBonusCard(e.target.value)}
            placeholder="Enter Card Number"
            className="flex-1 px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={handleApplyBonus}
            className="px-4 sm:px-6 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition-colors font-medium text-sm whitespace-nowrap"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Order Summary Details */}
      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated shipping & Handling</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 flex justify-between font-semibold text-sm sm:text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => router.push("/checkout")}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 active:scale-95 transition-all font-medium text-sm sm:text-base"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
