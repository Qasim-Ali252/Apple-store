"use client";

import CardList from "./CardList";

interface RelatedProductsProps {
  products: any[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const limitedProducts = products.slice(0, 4);

  return (
    <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {limitedProducts.map((item) => (
          <CardList
            key={item.id}
            id={item.id}
            imageSrc={item.images?.[0] || ""}
            title={item.title}
            price={`${item.price}`}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
