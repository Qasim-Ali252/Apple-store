"use client";

import { useState, useEffect } from "react";

interface Product {
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail?: string;
  images?: string[];
}

const ProductDetail = ({ product }: { product: Product | null }) => {
  const [selectedImg, setSelectedImg] = useState<string>("");

  // Set main image when product loads
  useEffect(() => {
    if (product?.thumbnail) {
      setSelectedImg(product.thumbnail);
    }
  }, [product]);

  // If no product, show loading
  if (!product) return <p className="text-center py-10">Loading product...</p>;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left Section - Images */}
      <div className="flex-1">
        {selectedImg ? (
          <img
            src={selectedImg}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded-xl"
          />
        ) : (
          <div className="w-full h-[400px] bg-gray-200 rounded-xl flex items-center justify-center">
            <p>No image available</p>
          </div>
        )}

        <div className="flex gap-3 mt-4 overflow-x-auto">
          {product.images?.map((img, idx) =>
            img ? (
              <img
                key={idx}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImg(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  selectedImg === img ? "border-black" : "border-transparent"
                }`}
              />
            ) : null
          )}
        </div>
      </div>

      {/* Right Section - Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.title}</h1>
          <p className="text-gray-500 mb-4 capitalize">{product.category}</p>
          <p className="text-lg text-gray-700 mb-6">{product.description}</p>
          <p className="text-2xl font-bold mb-4">${product.price}</p>
        </div>

        <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
