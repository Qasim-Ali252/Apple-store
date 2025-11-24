"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/components/WishlistContext";
import { useCart } from "@/app/context/CartContext";
import { useUser } from "@/lib/useUser";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
// import DetailsSection from "@/components/DetailsSection";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating?: number;
  reviews?: any[];
}

interface ProductDetailsClientProps {
  id: string;
}




export default function ProductDetailsClient({ id}: ProductDetailsClientProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity] = useState(1);
  
  const router = useRouter();
  const user = useUser();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.thumbnail);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading product details...
      </div>
    );

  if (error || !product)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.back()}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );

  const discountedPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div className="w-full pb-8 sm:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
      
      
      {/* LEFT SIDE – IMAGE + THUMBNAILS */}
      <div className="space-y-3 sm:space-y-4">
        <div className="bg-gray-100 h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl flex justify-center items-center p-4 sm:p-6">
          <img
            src={selectedImage}
            className="max-w-full max-h-full object-contain"
            alt={product.title}
          />
        </div>

        <div className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2">
          {product.images?.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(img)}
              className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-1 rounded-lg border-2 transition-all ${
                selectedImage === img ? "border-black" : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <img src={img} className="w-full h-full object-contain" alt={`Product view ${i + 1}`} />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE – DETAILS */}
      <div className="space-y-4 sm:space-y-6">

        {/* TITLE + WISHLIST ICON */}
        <div className="flex justify-between items-start gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            {product.title}
          </h1>

          <button onClick={() => toggleWishlist(product.id)} className="flex-shrink-0">
            {wishlist.includes(product.id) ? (
              <FaHeart size={24} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8" color="red" />
            ) : (
              <CiHeart size={24} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            )}
          </button>
        </div>

        {/* PRICE SECTION */}
        <div className="flex gap-2 sm:gap-3 items-center flex-wrap">
          {discountedPrice ? (
            <>
              <p className="text-2xl sm:text-3xl font-medium text-black">
                ${discountedPrice}
              </p>
              <p className="text-lg sm:text-xl line-through text-gray-400">
                ${product.price}
              </p>
            </>
          ) : (
            <p className="text-2xl sm:text-3xl font-semibold text-black">${product.price}</p>
          )}
        </div>

        {/* COLOR SELECTOR */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <p className="font-normal text-sm sm:text-base text-black">Select color:</p>
          <div className="flex gap-2 sm:gap-3">
            {["#000000", "#781DBC", "#E10000", "#E1B000", "#E8E8E8"].map(
              (c, i) => (
                <div
                  key={i}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full cursor-pointer border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: c }}
                ></div>
              )
            )}
          </div>
        </div>

        {/* STORAGE OPTIONS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {["128GB", "256GB", "512GB", "1TB"].map((size) => (
            <button
              key={size}
              className={`border px-3 py-2 sm:px-4 rounded-lg text-sm sm:text-base transition-all ${
                size === "1TB"
                  ? "border-black bg-black text-white"
                  : "border-gray-300 text-gray-500 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* SPECIFICATION BOXES */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
          <div className="p-3 sm:p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold">Screen size</p>
            <p className="text-gray-600 mt-1">6.7"</p>
          </div>
          <div className="p-3 sm:p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold">CPU</p>
            <p className="text-gray-600 mt-1">A16 Bionic</p>
          </div>
          <div className="p-3 sm:p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold">Battery</p>
            <p className="text-gray-600 mt-1">4323 mAh</p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{product.description}</p>

        {/* ACTION BUTTONS - Full width on all screens */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => toggleWishlist(product.id)}
            className="w-full h-12 sm:h-14 bg-white border-2 border-black rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-100 active:scale-95 transition-all"
          >
            {wishlist.includes(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
          <button 
            onClick={() => {
              if (!user) {
                const currentPath = window.location.pathname;
                router.push(`/signin?redirect=${encodeURIComponent(currentPath)}`);
                return;
              }
              
              addToCart({
                id: product.id,
                title: product.title,
                price: discountedPrice ? parseFloat(discountedPrice) : product.price,
                image: product.thumbnail,
                quantity: quantity
              });
              router.push('/cart');
            }}
            className="w-full h-12 sm:h-14 bg-black text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-800 active:scale-95 transition-all"
          >
            Add to Cart
          </button>
        </div>

        {/* EXTRA FEATURES - Always in row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5 pt-4">
          <div className="flex flex-col items-center text-center gap-2">
            <img className="h-12 w-12 sm:h-14 sm:w-14" src="/Delivery.png" alt="Free Delivery" />
            <div className="flex flex-col">
              <p className="font-semibold text-gray-500 text-xs sm:text-sm">Free Delivery</p>
              <p className="text-black font-medium text-xs sm:text-sm lg:text-base">1-2 days</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-2">
            <img className="h-12 w-12 sm:h-14 sm:w-14" src="/Stock.png" alt="In Stock" />
            <div className="flex flex-col">
              <p className="font-semibold text-gray-500 text-xs sm:text-sm">In Stock</p>
              <p className="text-black font-medium text-xs sm:text-sm lg:text-base">Today</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-2">
            <img className="h-12 w-12 sm:h-14 sm:w-14" src="/Guaranteed.png" alt="Guaranteed" />
            <div className="flex flex-col">
              <p className="font-semibold text-gray-500 text-xs sm:text-sm">Guaranteed</p>
              <p className="text-black font-medium text-xs sm:text-sm lg:text-base">1 year</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
