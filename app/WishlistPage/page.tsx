"use client";
import React, { useEffect, useState } from "react";
import { useWishlist } from "@/components/WishlistContext";
import CardList from "@/components/CardList";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  brand: string;
}

const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
   useEffect(() => {
    if (!wishlist || wishlist.length === 0) {
      setProducts([]);
      return;
    }

    let cancelled = false;
    async function fetchProducts() {
      setLoading(true);
      setErr(null);
      try {
        // fetch details in parallel
        const fetches = wishlist.map((id) =>
          fetch(`https://dummyjson.com/products/${id}`).then((r) => r.ok ? r.json() : null)
        );
        const results = await Promise.all(fetches);
        if (!cancelled) setProducts(results.filter(Boolean));
      } catch (e) {
        console.error(e);
        if (!cancelled) setErr("Failed to fetch wishlist products");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProducts();
    return () => { cancelled = true; };
  }, [wishlist]);

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <CardList
              id={product.id}
              key={product.id}
              imageSrc={product.thumbnail}
              title={product.title}
              price={`$${product.price}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
