"use client";

import React from "react";
import { useCart } from "../../app/context/CartContext";

interface Props {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItem: React.FC<Props> = ({ id, title, price, image, quantity }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center gap-4">
        <img src={image} alt={title} className="w-20 h-20 object-cover rounded-xl" />
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-gray-500">${price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => updateQuantity(id, quantity - 1)} disabled={quantity <= 1}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => updateQuantity(id, quantity + 1)}>+</button>
      </div>
      <p className="w-24 text-right font-semibold">${(price * quantity).toFixed(2)}</p>
      <button onClick={() => removeFromCart(id)} className="text-red-500">🗑️</button>
    </div>
  );
};

export default CartItem;
