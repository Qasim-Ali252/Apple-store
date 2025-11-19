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
    <div className="min-h-screen">
      <BreadcrumbClient productName={product?.title || ""} />
      <div className="w-full max-w-[90rem] mx-auto px-4 md:px-8 lg:px-40">
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
