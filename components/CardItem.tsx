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
    <div className="w-[1440px] h-[1056px] px-[160px] py-[56px] flex flex-col gap-[32px] bg-[#FFFFFF]">
      {/* Navbar */}
      <div className="flex w-[1120px] h-[32px] items-center gap-[32px]">
        <button
          onClick={() => handleTabChange("new")}
          className={`font-medium pb-1 ${
            activeTab === "new"
              ? "text-black border-b-[2px] border-black"
              : "text-[#9D9D9D] hover:text-black"
          }`}
        >
          New Arrival
        </button>

        <button
          onClick={() => handleTabChange("bestseller")}
          className={`font-medium pb-1 ${
            activeTab === "bestseller"
              ? "text-black border-b-[2px] border-black"
              : "text-[#9D9D9D] hover:text-black"
          }`}
        >
          Bestseller
        </button>

        <button
          onClick={() => handleTabChange("featured")}
          className={`font-medium pb-1 ${
            activeTab === "featured"
              ? "text-black border-b-[2px] border-black"
              : "text-[#9D9D9D] hover:text-black"
          }`}
        >
          Featured Products
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-[32px] w-[1120px]">
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
          <p className="text-gray-500 text-center col-span-4">
            Loading products...
          </p>
        )}
      </div>
    </div>
  );
};

export default CardItem;
