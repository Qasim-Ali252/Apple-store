"use client";

import { useParams, useRouter } from "next/navigation";

export default function Breadcrumb({ productName }: { productName?: string }) {
  const router = useRouter();
  const params = useParams();
  const category = params?.category as string;

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleCatalogClick = () => {
    // Scroll to Browse By Category section on home page
    router.push("/#browse-category");
    // Small delay to ensure page loads before scrolling
    setTimeout(() => {
      const element = document.getElementById("browse-category");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleCategoryClick = () => {
    if (category) {
      router.push(`/products/${category}`);
    }
  };

  return (
    <div className="w-full max-w-[90rem] mx-auto px-4 md:px-8 lg:px-40 py-6 md:py-10">
      <div className="flex flex-wrap items-center gap-2">
        {/* Home */}
        <button
          onClick={handleHomeClick}
          className="text-sm md:text-base font-medium text-gray-400 hover:text-black transition-colors cursor-pointer"
        >
          Home
        </button>
        <span className="text-gray-400">&gt;</span>

        {/* Catalog */}
        <button
          onClick={handleCatalogClick}
          className="text-sm md:text-base font-medium text-gray-400 hover:text-black transition-colors cursor-pointer"
        >
          Catalog
        </button>
        <span className="text-gray-400">&gt;</span>

        {/* Category - Clickable if we're on a product page */}
        {category && (
          <>
            <button
              onClick={handleCategoryClick}
              className={`text-sm md:text-base font-medium transition-colors capitalize ${
                productName 
                  ? "text-gray-400 hover:text-black cursor-pointer" 
                  : "text-black cursor-default"
              }`}
            >
              {category.replace(/-/g, ' ')}
            </button>
            {productName && <span className="text-gray-400">&gt;</span>}
          </>
        )}

        {/* Product name — only if we are on the product page */}
        {productName && (
          <span className="text-sm md:text-base font-medium text-black">
            {productName}
          </span>
        )}
      </div>
    </div>
  );
}
