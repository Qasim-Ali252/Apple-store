"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/components/WishlistContext";
import { useUser } from "@/lib/useUser";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa"; 

interface CardListProps {
  id: number;
  imageSrc: string;
  title: string;
  price: string;
  width?: string;
  height?: string;
  category?: string; // Optional: if category is already known
}

const CardList: React.FC<CardListProps> = ({id, imageSrc, title, price, category }) => {
  const router = useRouter();
  const user = useUser();
  const { wishlist, toggleWishlist } = useWishlist();
  const isLiked = wishlist.includes(id);
  const [productCategory, setProductCategory] = useState<string>(category || "");

  // Fetch product category if not provided
  useEffect(() => {
    if (!category) {
      const fetchCategory = async () => {
        try {
          const res = await fetch(`https://dummyjson.com/products/${id}`);
          const data = await res.json();
          setProductCategory(data.category);
        } catch (error) {
          console.error("Error fetching product category:", error);
        }
      };
      fetchCategory();
    }
  }, [id, category]);

  const handleBuyNow = () => {
    // Check if user is logged in
    if (!user) {
      const currentPath = window.location.pathname;
      router.push(`/signin?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    // If logged in, navigate to product page
    if (productCategory) {
      router.push(`/products/${productCategory}/${id}`);
    }
  };

  return (
    <div className="w-full max-w-[250px] mx-auto h-auto min-h-[350px] sm:min-h-[370px] flex flex-col justify-between items-center px-4 py-6 rounded-[9px] bg-gray-lighter shadow-sm hover:shadow-md transition-shadow relative">
      
      {/* Heart icon (Wishlist Button) */}
      <button
        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10"
        onClick={() => toggleWishlist(id)}
      >
        {isLiked ? (
          <FaHeart size={20} className="sm:w-6 sm:h-6" color="#FF0000" />
        ) : (
          <CiHeart size={20} className="sm:w-6 sm:h-6" color="#2C2C2C" />
        )}
      </button>

      {/* Product Image */}
      <img
        src={imageSrc}
        alt={title}
        className="w-auto h-[150px] sm:h-[180px] object-contain mix-blend-multiply rounded-3xl"
      />

      {/* Product Title */}
      <h3 className="text-center font-medium  text-base sm:text-sm text-black leading-tight line-clamp-2 px-2">
        {title}
      </h3>

      {/* Product Price */}
      <p className="text-center text-lg sm:text-xl font-semibold text-black">${price}</p>

      {/* Buy Button */}
      <button 
        onClick={handleBuyNow}
        className="w-full max-w-[183px] h-10 sm:h-12 bg-black text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:scale-95 transition-all"
      >
        Buy Now
      </button>
    </div>
  );
};

export default CardList;
