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

const CardItem: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<"new" | "bestseller" | "featured">("new");

 useEffect(() => {
  async function fetchProducts() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      const products: Product[] = data.products; // Access products array
      setAllProducts(products);
      setDisplayedProducts(products.slice(0, 8)); // Default - New Arrival
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  fetchProducts();
}, []);

  // Function to change product sets based on tab
  const handleTabChange = (tab: "new" | "bestseller" | "featured") => {
    setActiveTab(tab);

    if (allProducts.length === 0) return;

    let products: Product[] = [];

    if (tab === "new") {
      products = allProducts.slice(0, 8);
    } else if (tab === "bestseller") {
      // Simulate bestseller by sorting higher prices
      products = [...allProducts]
        .sort((a, b) => b.price - a.price)
        .slice(0, 8);
    } else if (tab === "featured") {
      // Simulate featured by picking random 8 products
      products = [...allProducts]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);
    }

    setDisplayedProducts(products);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-[160px] py-8 sm:py-10 lg:py-14 flex flex-col gap-6 sm:gap-8 bg-white">
      {/* Navbar */}
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => handleTabChange("new")}
          className={`font-medium pb-1 whitespace-nowrap text-sm sm:text-base ${
            activeTab === "new"
              ? "text-black border-b-[2px] border-black"
              : "text-[#9D9D9D] hover:text-black"
          }`}
        >
          New Arrival
        </button>

        <button
          onClick={() => handleTabChange("bestseller")}
          className={`font-medium pb-1 whitespace-nowrap text-sm sm:text-base ${
            activeTab === "bestseller"
              ? "text-black border-b-[2px] border-black"
              : "text-[#9D9D9D] hover:text-black"
          }`}
        >
          Bestseller
        </button>

        <button
          onClick={() => handleTabChange("featured")}
          className={`font-medium pb-1 whitespace-nowrap text-sm sm:text-base ${
            activeTab === "featured"
              ? "text-black border-b-[2px] border-black"
              : "text-[#9D9D9D] hover:text-black"
          }`}
        >
          Featured Products
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <CardList
              key={product.id}
              id={product.id}
              imageSrc={product.images[0]}
              title={product.title}
              price={`$${product.price}`}
              category={product.category}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            Loading products...
          </p>
        )}
      </div>
    </div>
  );
};

export default CardItem;
