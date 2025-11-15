"use client";
import React, { useEffect, useState } from "react";
import CardList from "./CardList";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
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
    <div className="w-[90rem] h-auto px-[160px] py-[56px] flex flex-col gap-[32px] bg-[#F6F6F6]">
      {/* Section Header */}
      <div className="flex w-[1120px] h-[32px] items-center gap-[32px]">
        <h2 className="ml-[50px] text-[24px] leading-6 font-medium text-black">Discounts up to -50%</h2>
      </div>

   
      <div className="grid grid-cols-4 gap-[32px] w-[1120px]">
        {products.map((product) => (
          <CardList
            id={product.id}
            key={product.id}
            imageSrc={product.images[0]}
            title={product.title}
            price={`$${product.price}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscountCard;
