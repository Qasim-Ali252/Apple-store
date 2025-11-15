"use client";
import React from "react";
import { useWishlist } from "@/components/WishlistContext";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa"; 

interface CardListProps {
  id: number;
  imageSrc: string;
  title: string;
  price: string;
  width?: string;
  height?: string;
}

const CardList: React.FC<CardListProps> = ({id, imageSrc, title, price }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const isLiked = wishlist.includes(id);

  return (
    <div className="w-[268px] h-[370px] min-w-[200px] flex flex-col justify-between items-center px-[16px] py-[24px] rounded-[9px] bg-gray-lighter shadow-sm relative">
      
      {/* Heart icon (Wishlist Button) */}
      <button
        className="absolute top-[16px] right-[16px]"
        onClick={() => toggleWishlist(id)}
      >
        {isLiked ? (
          <FaHeart size={24} color="#FF0000" /> // filled red heart when liked
        ) : (
          <CiHeart size={24} color="#2C2C2C" /> // outline heart when not liked
        )}
      </button>

      {/* Product Image */}
      <img
        src={imageSrc}
        alt={title}
        className="w-auto h-[180px] object-contain mix-blend-multiply rounded-3xl"
      />

      {/* Product Title */}
      <h3 className="text-center text-[14px] text-[#2C2C2C] leading-tight">
        {title}
      </h3>

      {/* Product Price */}
      <p className="text-center text-[20px] font-semibold text-black">{price}</p>

      {/* Buy Button */}
      <button className="w-[183px] h-[48px] bg-black text-white rounded-[8px] text-[14px] font-medium">
        Buy Now
      </button>
    </div>
  );
};

export default CardList;
