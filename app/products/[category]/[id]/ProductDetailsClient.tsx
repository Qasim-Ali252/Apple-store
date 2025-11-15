"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/components/WishlistContext";
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
  const { wishlist, toggleWishlist } = useWishlist();
  const router = useRouter();

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
          <div>

         
    <div className="max-w-6xl  p-6 grid grid-cols-1 md:grid-cols-2 gap-10 ">
      
      {/* LEFT SIDE – IMAGE + THUMBNAILS */}
      <div className="space-y-4">
        <div className="bg-gray-100 h-[500px] rounded-xl flex justify-center items-center p-6">
          <img
            src={selectedImage}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="flex gap-4 overflow-x-auto">
          {product.images?.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(img)}
              className={`w-24 h-24 p-1 rounded-lg border-2 ${
                selectedImage === img ? "border-black" : "border-transparent"
              }`}
            >
              <img src={img} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE – DETAILS */}
      <div className="space-y-6">

        {/* TITLE + WISHLIST ICON */}
        <div className="flex justify-between items-start">
          <h1 className="text-4xl font-bold leading-tight">
            {product.title}
          </h1>

          <button onClick={() => toggleWishlist(product.id)}>
            {wishlist.includes(product.id) ? (
              <FaHeart size={30} color="red" />
            ) : (
              <CiHeart size={30} />
            )}
          </button>
        </div>

        {/* PRICE SECTION */}
        <div className="flex gap-3 items-center">
          {discountedPrice ? (
            <>
              <p className="text-3xl font-medium text-black">
                ${discountedPrice}
              </p>
              <p className="text-xl line-through text-gray-400">
                ${product.price}
              </p>
              
            </>
          ) : (
            <p className="text-3xl font-semibold text-black">${product.price}</p>
          )}
        </div>

        {/* COLOR SELECTOR */}
        <div className="space-y-2 flex  items-center">
          <p className="font-normal text-[15px] mt-1 leading-6 text-black">Select color :</p>
          <div className="flex gap-3 ml-[24px] ">
            {["#000000", "#781DBC", "#E10000", "#E1B000", "#E8E8E8"].map(
              (c, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full cursor-pointer"
                  style={{ backgroundColor: c }}
                ></div>
              )
            )}
          </div>
        </div>

        {/* STORAGE OPTIONS */}
        <div className="grid grid-cols-4 gap-4">
          {["128GB", "256GB", "512GB", "1TB"].map((size) => (
            <button
              key={size}
              className={`border px-4 py-2 rounded-lg ${
                size === "1TB"
                  ? "border-black"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* SPECIFICATION BOXES */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold">Screen size</p>
            <p className="text-gray-600">6.7"</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold">CPU</p>
            <p className="text-gray-600">Apple A16 Bionic</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold">Battery</p>
            <p className="text-gray-600">4323 mAh</p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-700">{product.description}</p>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4">
          <button className="flex-1 h-14 bg-white border-2 border-black rounded-lg font-semibold hover:bg-gray-100">
            Add to Wishlist
          </button>
          <button className="flex-1 h-14 bg-black text-white rounded-lg font-semibold hover:bg-gray-800">
            Add to Cart
          </button>
        </div>

        {/* EXTRA FEATURES */}
        <div className="grid grid-cols-3 gap-5 text-center pt-4">
          <div className=" text-sm flex gap-[16px] items-center">
            <img className="h-[56px] w-[56px]" src="/Delivery.png" alt="" />
            <div className="flex flex-col items-start">
            <p className="font-semibold text-gray-500  ">Free Delivery</p>
            <p className="text-black font-medium">1-2 days</p>
            </div>
            
          </div>

          <div className="text-sm flex gap-[16px] items-center">
            <img className="h-[56px] w-[56px]" src="/Stock.png" alt="" />
            <div className="flex flex-col items-start">
            <p className="font-semibold text-gray-500">In Stock</p>
            <p className="text-black font-medium">Today</p>
            </div>
           
          </div>

          <div className="text-sm flex gap-[16px] items-center">
            <img className="h-[56px] w-[56px]" src="/Guaranteed.png" alt="" />
            <div className="flex flex-col items-start">
            <p className="font-semibold text-gray-500">Guaranteed</p>
            <p className="text-black font-medium">1 year</p>
            </div>
            
          </div>
        </div>
      </div>
     
    </div>
    
         {/* <div className="bg-black">
      
        <DetailsSection/>
      </div> */}
     </div>
  );
}
