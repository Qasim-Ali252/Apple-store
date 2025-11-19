// app/products/[category]/page.tsx
import CategoryPageClient from "./CategoryPageClient";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;

  return <CategoryPageClient category={category} />;
}
