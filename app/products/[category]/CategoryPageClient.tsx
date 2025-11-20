// app/products/[category]/CategoryPageClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/components/WishlistContext";
import { useUser } from "@/lib/useUser";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Pagination from "@/components/Pagination";
import FilterSidebar from "@/components/filters/FilterSideBar";
import CategoryTopBar from "@/components/CategoryTopBar";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  brand: string;
  category: string;
  rating?: number;
}

interface CategoryPageClientProps {
  category: string;
}

export default function CategoryPageClient({ category }: CategoryPageClientProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  const router = useRouter();
  const user = useUser();
  const { wishlist, toggleWishlist } = useWishlist();
  const [sortOption, setSortOption] = useState("rating");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Handle Buy Now with authentication check
  const handleBuyNow = (e: React.MouseEvent, productCategory: string, productId: number) => {
    if (!user) {
      e.preventDefault();
      // Redirect to login page
      router.push('/signin');
      return;
    }
    // If user is logged in, allow navigation to product page
  };
  // Fetch products for the resolved category
  useEffect(() => {
    if (!category) return;

    let cancelled = false;
    async function fetchProducts() {
      setLoading(true);
      setFetchError(null);
      try {
        const safeCategory = encodeURIComponent(category);
        const res = await fetch(`https://dummyjson.com/products/category/${safeCategory}`);
console.log("res",res)
        // debug: network errors or bad endpoints
        if (!res.ok) {
          // log server code for debugging
          const text = await res.text().catch(() => "");
          console.error("Fetch failed:", res.status, text);
          if (!cancelled) {
            setProducts([]);
            setFetchError(`No products found for category "${category}" (status ${res.status})`);
          }
          return;
        }
        
        const data = await res.json();
        if (!cancelled) {
          // DummyJSON returns `{ products: [...], total, skip, limit }`
          setProducts(Array.isArray(data.products) ? data.products : []);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        if (!cancelled) {
          setProducts([]);
          setFetchError("Network error while fetching products.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }



    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [category]);

  // Filter products by selected brands
  const filteredProducts =
    selectedBrands.length === 0 ? products : products.filter((p) => selectedBrands.includes(p.brand));

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceLow") return a.price - b.price;
    if (sortOption === "priceHigh") return b.price - a.price;
    if (sortOption === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortOption === "newest") return b.id - a.id;
    return 0;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / productsPerPage));
  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

  // Reset page when filters/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrands, sortOption]);

  // Simple debug info in console to help if category mapping is wrong
  useEffect(() => {
    console.log("CategoryPageClient: category=", category, "products.length=", products.length);
  }, [category, products.length]);

  return (
    <div>
      <div className="w-[69.9375rem] flex gap-6">
        {/* Sidebar */}
        <div className="w-[16rem] h-[47.5rem]">
          <FilterSidebar
            products={products}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
          />
        </div>

        {/* Main */}
        <div>
          <CategoryTopBar
            totalProducts={filteredProducts.length}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />

          {loading && <p className="text-gray-500">Loading products...</p>}
          {fetchError && <p className="text-red-500">{fetchError}</p>}

          <div className="grid grid-cols-3 gap-6 w-[52.7rem]">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-50 relative h-[350px] flex flex-col justify-between items-center px-4 py-6 gap-4 rounded-xl shadow-sm"
                >
                  <button
                    className="absolute top-4 right-4"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={`Toggle wishlist for ${product.title}`}
                  >
                    {wishlist.includes(product.id) ? (
                      <FaHeart size={24} color="#FF0000" />
                    ) : (
                      <CiHeart size={24} color="#2C2C2C" />
                    )}
                  </button>

                  <img src={product.thumbnail} alt={product.title} className="h-[180px] object-contain" />

                  <div className="flex flex-col items-center flex-grow">
                    <h3
                      className="text-center text-sm text-[#2C2C2C] leading-tight line-clamp-1 overflow-hidden"
                      title={product.title}
                    >
                      {product.title}
                    </h3>
                    <p className="text-center text-xl font-semibold text-black">${product.price}</p>
                  </div>

                  <Link 
                    href={`/products/${encodeURIComponent(product.category)}/${product.id}`}
                    onClick={(e) => handleBuyNow(e, product.category, product.id)}
                  >
                    <button className="w-40 h-12 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                      Buy Now
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              !loading && <p className="text-gray-500 text-center col-span-3">No products found...</p>
            )}
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}
