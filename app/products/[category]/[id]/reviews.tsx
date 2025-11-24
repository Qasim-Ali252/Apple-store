"use client";

import RelatedProducts from "@/components/relatedProducts";
import { useEffect, useState } from "react";

export default function Reviews({ id }: { id: string }) {
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const INITIAL_REVIEWS_COUNT = 3;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // 1) Fetch main product
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);

        // 2) Fetch related products by matching category
        const relatedRes = await fetch(
          `https://dummyjson.com/products/category/${data.category}`
        );
        const relatedData = await relatedRes.json();

        // Remove current product from related list
        const filtered = relatedData.products.filter((p: any) => p.id !== data.id);

        setRelated(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product or related data:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-10">Loading...</p>;
  if (!product?.reviews) return <p>No reviews found.</p>;

  const reviews = product.reviews;
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, INITIAL_REVIEWS_COUNT);
  const hasMoreReviews = reviews.length > INITIAL_REVIEWS_COUNT;

  const breakdown = {
    excellent: reviews.filter((r: any) => r.rating >= 5).length,
    good: reviews.filter((r: any) => r.rating === 4).length,
    average: reviews.filter((r: any) => r.rating === 3).length,
    below: reviews.filter((r: any) => r.rating === 2).length,
    poor: reviews.filter((r: any) => r.rating === 1).length,
  };

  const total = reviews.length;

  const percent = (n: number) =>
    total === 0 ? 0 : Math.round((n / total) * 100);

  return (
    <>
      <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-6 sm:space-y-10 mt-12 sm:mt-[88px]">
        <h2 className="font-medium text-xl sm:text-2xl text-black">
          Reviews
        </h2>

        {/* Rating Summary */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-10">
          <div className="flex flex-col items-center w-full sm:w-[11.5rem] h-auto sm:h-[12rem] rounded-xl p-6 sm:p-8 gap-3 sm:gap-4 bg-[#FAFAFA] md:w-1/4">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold">
              {product.rating.toFixed(1)}
            </div>
            <div className="text-gray-500 text-sm sm:text-base">
              of {total} reviews
            </div>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg sm:text-xl">
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Rating Bars */}
          <div className="flex flex-col gap-2 sm:gap-3 w-full md:w-3/4">
            {[
              ["Excellent", breakdown.excellent],
              ["Good", breakdown.good],
              ["Average", breakdown.average],
              ["Below Average", breakdown.below],
              ["Poor", breakdown.poor],
            ].map(([label, count]: any) => (
              <div className="flex items-center gap-2 sm:gap-3" key={label}>
                <span className="w-24 sm:w-32 text-xs sm:text-sm leading-4 font-medium text-black">
                  {label}
                </span>
                <div className="flex-1 bg-gray-200 h-1 rounded-full">
                  <div
                    className="bg-[#FFB547] h-[5px] rounded-2xl transition-all"
                    style={{ width: `${percent(count)}%` }}
                  />
                </div>
                <span className="text-gray-500 text-xs sm:text-sm w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Box */}
        <input
          placeholder="Leave Comment"
          className="border border-gray-300 rounded-lg p-3 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Reviews List */}
        <div className="space-y-4 sm:space-y-6">
          {displayedReviews.map((r: any, i: number) => (
            <div
              key={i}
              className="p-4 sm:p-6 bg-[#FAFAFA] rounded-lg flex gap-3 sm:gap-4"
            >
              {r.reviewerProfileImage ? (
                <img
                  src={r.reviewerProfileImage}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover bg-gray-200 flex-shrink-0"
                  alt={r.reviewerName}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-base sm:text-lg flex-shrink-0 ${r.reviewerProfileImage ? 'hidden' : ''}`}>
                {r.reviewerName?.charAt(0).toUpperCase() || '?'}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-semibold text-sm sm:text-base truncate">{r.reviewerName}</h3>
                  <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">
                    {new Date(r.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex text-yellow-400 text-base sm:text-lg mt-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
                  {r.comment}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View More / View Less Button */}
        {hasMoreReviews && (
          <button 
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="mx-auto block px-6 py-2.5 sm:py-3 border-2 border-gray-300 rounded-full text-sm sm:text-base font-medium hover:bg-gray-100 hover:border-gray-400 active:scale-95 transition-all"
          >
            {showAllReviews ? "View Less" : `View More (${reviews.length - INITIAL_REVIEWS_COUNT} more)`}
          </button>
        )}
      </div>

      {/* Related products */}
      <RelatedProducts products={related} />
        
    </>
    
  );
}

