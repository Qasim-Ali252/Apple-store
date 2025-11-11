"use client";

import React, { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

// In Next.js 15+, `params` is a Promise when passed to client components
interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // ✅ unwrap the params Promise
  const { category } = React.use(params);

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // 4 cols × 3 rows

  // ✅ Fetch products dynamically based on category
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}`
        );
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    if (category) {
      fetchProducts();
    }
  }, [category]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="p-8 w-full min-h-screen">
      <div className="grid grid-cols-4 gap-6">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 relative h-[350px] flex flex-col justify-between items-center px-4 py-6 gap-4 rounded-xl shadow-sm"
            >
              <button className="absolute top-4 right-4">
                <img src="/Like.png" alt="Like" />
              </button>

              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-[180px] object-contain"
              />

              <div className="flex flex-col items-center flex-grow">
                <h3
                  className="text-center text-sm text-[#2C2C2C] leading-tight line-clamp-1 overflow-hidden"
                  title={product.title}
                >
                  {product.title}
                </h3>
                <p className="text-center text-xl font-semibold text-black">
                  ${product.price}
                </p>
              </div>

              <button className="w-40 h-12 bg-black text-white rounded-lg text-sm font-medium">
                Buy Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-4">
            Loading products...
          </p>
        )}
      </div>

      {/* ✅ Pagination at the bottom */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
