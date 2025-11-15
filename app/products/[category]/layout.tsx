"use client";
import React, { useEffect, useState } from "react";
import BreadcrumbClient from "./[id]/BreadcrumbClient";
import { useParams } from "next/navigation";

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  return (
    <div>
      <BreadcrumbClient productName={product?.title || ""} />
      <div className="flex w-[90rem] h-[97.5rem]">
        <div className="flex ml-40 gap-8 w-[69.9375rem] h-[92.5rem]">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
