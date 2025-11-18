"use client";

import RelatedProducts from "@/components/relatedProducts";
import relatedProducts from "@/components/relatedProducts";
import { useEffect, useState } from "react";

export default function Reviews({ id }: { id: string }) {
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const breakdown = {
    excellent: reviews.filter((r) => r.rating >= 5).length,
    good: reviews.filter((r) => r.rating === 4).length,
    average: reviews.filter((r) => r.rating === 3).length,
    below: reviews.filter((r) => r.rating === 2).length,
    poor: reviews.filter((r) => r.rating === 1).length,
  };

  const total = reviews.length;

  const percent = (n: number) =>
    total === 0 ? 0 : Math.round((n / total) * 100);

  return (
    <>
      <div className="w-full max-w-5xl mx-auto py-10 px-5 space-y-10 mt-[88px]">
        <span className="font-medium text-[24px] leading-8 text-black">
          Reviews
        </span>

        {/* Rating Summary */}
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex flex-col items-center w-[11.5rem] h-[12rem] rounded-xl p-8 gap-4 bg-[#FAFAFA] md:w-1/4">
            <div className="text-6xl font-semibold">
              {product.rating.toFixed(1)}
            </div>
            <div className="text-gray-500 mt-1">
              of {total} reviews
            </div>
            <div className="flex mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Rating Bars */}
          <div className="flex flex-col gap-3 w-full md:w-3/4">
            {[
              ["Excellent", breakdown.excellent],
              ["Good", breakdown.good],
              ["Average", breakdown.average],
              ["Below Average", breakdown.below],
              ["Poor", breakdown.poor],
            ].map(([label, count]: any) => (
              <div className="flex items-center gap-3" key={label}>
                <span className="w-32 leading-4 font-medium text-black">
                  {label}
                </span>
                <div className="flex-1 bg-gray-200 h-1 rounded-full">
                  <div
                    className="bg-[#FFB547] h-[5px] rounded-2xl"
                    style={{ width: `${percent(count)}%` }}
                  />
                </div>
                <span className="text-gray-500">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Box */}
        <input
          placeholder="Leave Comment"
          className="border rounded-lg p-3 w-full"
        />

        {/* Reviews List */}
        <div className="gap-6">
          {reviews.map((r: any, i: number) => (
            <div
              key={i}
              className="p-6 bg-[#FAFAFA] mb-6 rounded-lg flex gap-4"
            >
              <img
                src={r.reviewerProfileImage}
                className="w-12 h-12 rounded-full object-cover"
                alt=""
              />

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{r.reviewerName}</h3>
                  <span className="text-gray-400 text-sm">
                    {new Date(r.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex text-yellow-400 text-lg">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className="text-gray-600 mt-2 leading-6 font-medium">
                  {r.comment}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="mx-auto block px-6 py-2 border rounded-full text-sm hover:bg-gray-100">
          View More
        </button>
      </div>

      {/* Related products */}
      <RelatedProducts products={related} />
    </>
  );
}
