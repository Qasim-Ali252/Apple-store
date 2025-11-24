"use client";

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
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-200 py-4 sm:py-6">
      {/* Product Image and Info */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1">
        <img 
          src={image} 
          alt={title} 
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0" 
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{title}</h3>
          <p className="text-gray-500 text-sm sm:text-base mt-1">${price.toFixed(2)}</p>
        </div>
      </div>

      {/* Quantity Controls and Total */}
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
        {/* Quantity Controls - Border only around number */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => updateQuantity(id, quantity - 1)} 
            disabled={quantity <= 1}
            className="text-xl sm:text-2xl font-normal w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            −
          </button>
          <span className="font-medium text-base sm:text-lg border border-gray-300 rounded-lg px-4 py-2 min-w-[50px] text-center">
            {quantity}
          </span>
          <button 
            onClick={() => updateQuantity(id, quantity + 1)}
            className="text-xl sm:text-2xl font-normal w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
          >
            +
          </button>
        </div>

        {/* Total Price */}
        <p className="w-20 sm:w-28 text-right font-semibold text-base sm:text-xl">
          ${(price * quantity).toFixed(2)}
        </p>

        {/* Remove Button - X icon */}
        <button 
          onClick={() => removeFromCart(id)} 
          className="text-gray-400 hover:text-gray-600 text-2xl sm:text-3xl font-light transition-colors flex items-center justify-center w-8 h-8"
          aria-label="Remove item"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CartItem;
