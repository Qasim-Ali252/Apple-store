"use client";
import React, { useEffect, useState } from "react";
import CardList from "./CardList";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string;
}

const DiscountCard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      const products: Product[] = data.products; // ✅ get actual array

      // Take only 4 random products
      const selected = products.sort(() => 0.5 - Math.random()).slice(0, 4);

      setProducts(selected);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []);


  return (
    <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-[160px] py-8 sm:py-10 lg:py-14 flex flex-col gap-6 sm:gap-8 bg-white">
      {/* Section Header */}
      <div className="flex items-center">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-black">
          Discounts up to -50%
        </h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {products.map((product) => (
          <CardList
            id={product.id}
            key={product.id}
            imageSrc={product.images[0]}
            title={product.title}
            price={`$${product.price}`}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscountCard;
