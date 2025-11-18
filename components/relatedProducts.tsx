"use client";

import React from "react";
import CardList from "./CardList";

interface RelatedProductsProps {
  products: any[]; // you can type it later
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  // show only 4
  const limitedProducts = products.slice(0, 4);

  return (
    <div className="w-full flex flex-wrap gap-4 justify-center">
      {limitedProducts.map((item) => (
        <CardList
          key={item.id}
          id={item.id}
          imageSrc={item.images?.[0] || ""}
          title={item.title}
          price={`$${item.price}`}
        />
      ))}
    </div>
  );
};

export default RelatedProducts;
