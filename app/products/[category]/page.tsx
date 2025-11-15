// app/products/[category]/page.tsx
import CategoryPageClient from "./CategoryPageClient";

interface PageProps {
  params: {
    category: string;
    // id: string;
  };
}

export default async function Page({ params }: PageProps) {
  // ✅ Wait for params before passing
  const resolvedParams = await params;
  const category = resolvedParams.category;

  console.log("Server: category =", category); // optional debug log

  return <CategoryPageClient category={ category} />;
}
