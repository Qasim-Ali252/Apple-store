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
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Detect screen size for products per page
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const productsPerPage = isMobile ? 8 : 9; // 2x4 on mobile, 3x3 on desktop

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
    <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Sidebar - Hidden below 1280px, shown as modal */}
        <div className="hidden xl:block w-[16rem]">
          <FilterSidebar
            products={products}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
          />
        </div>

        {/* Filter Modal for mobile/tablet - Below 1280px */}
        {showFilters && (
          <div className="fixed inset-0 z-50 xl:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowFilters(false)}
            />
            
            {/* Modal Content */}
            <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-500 hover:text-black text-2xl"
                  >
                    ×
                  </button>
                </div>
                <FilterSidebar
                  products={products}
                  selectedBrands={selectedBrands}
                  setSelectedBrands={setSelectedBrands}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          <CategoryTopBar
            totalProducts={filteredProducts.length}
            sortOption={sortOption}
            setSortOption={setSortOption}
            onFilterClick={() => setShowFilters(true)}
          />

          {loading && <p className="text-gray-500 text-center py-8">Loading products...</p>}
          {fetchError && <p className="text-red-500 text-center py-8">{fetchError}</p>}

          {/* Product Grid - 2 cols mobile, 3 cols desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-6">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-50 relative min-h-[300px] sm:min-h-[350px] flex flex-col justify-between items-center px-3 sm:px-4 py-4 sm:py-6 gap-3 sm:gap-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={`Toggle wishlist for ${product.title}`}
                  >
                    {wishlist.includes(product.id) ? (
                      <FaHeart size={20} className="sm:w-6 sm:h-6" color="#FF0000" />
                    ) : (
                      <CiHeart size={20} className="sm:w-6 sm:h-6" color="#2C2C2C" />
                    )}
                  </button>

                  <img 
                    src={product.thumbnail} 
                    alt={product.title} 
                    className="h-[120px] sm:h-[150px] lg:h-[180px] w-auto object-contain" 
                  />

                  <div className="flex flex-col items-center flex-grow gap-1 sm:gap-2">
                    <h3
                      className="text-center text-xs sm:text-sm text-[#2C2C2C] leading-tight line-clamp-2 px-1"
                      title={product.title}
                    >
                      {product.title}
                    </h3>
                    <p className="text-center text-lg sm:text-xl font-semibold text-black">
                      ${product.price}
                    </p>
                  </div>

                  <Link 
                    href={`/products/${encodeURIComponent(product.category)}/${product.id}`}
                    onClick={(e) => handleBuyNow(e, product.category, product.id)}
                    className="w-full flex justify-center"
                  >
                    <button className="w-full  max-w-[160px] h-10 sm:h-12 bg-black text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:scale-95 transition-all">
                      Buy Now
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              !loading && (
                <p className="text-gray-500 text-center col-span-2 lg:col-span-3 py-12">
                  No products found...
                </p>
              )
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination 
            totalPages={totalPages} 
            currentPage={currentPage} 
            onPageChange={setCurrentPage} 
          />
        </div>
      )}
    </div>
  );
}
