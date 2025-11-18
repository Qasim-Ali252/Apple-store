// app/products/[category]/[id]/page.tsx
import ProductDetailsClient from "./ProductDetailsClient";
import Reviews from "./reviews";

interface PageProps {
  params: Promise<{
    category: string;
    id: string;
  }>;
}


export default async function ProductPage({ params }: PageProps) {
  const { id, category } = await params;

  // Fetch product title on the server
  const product = await fetch(`https://dummyjson.com/products/${id}`)
    .then((res) => res.json());

  return (
    <>
    <ProductDetailsClient
      id={id}
      category={category}
      productName={product.title}
      description={product.description}
      rating={product.rating}
      reviews={product.reviews}

    />
        <div>
      {/* product details */}
      <Reviews id={id} />
    </div>
    </>
  );
}
