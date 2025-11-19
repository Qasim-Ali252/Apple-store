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
  const { id } = await params;

  return (
    <>
      <ProductDetailsClient id={id} />
      <div>
        <Reviews id={id} />
      </div>
    </>
  );
}
