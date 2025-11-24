"use client";

import { useCart } from "../../app/context/CartContext";
import ThirdCartItem from "@/components/cart/ThirdCartItem";
import CartSummary from "@/components/cart/CartSummary";

const CartPage = () => {
  const { cartItems } = useCart();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8">
          <div className="space-y-4 sm:space-y-6">
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
