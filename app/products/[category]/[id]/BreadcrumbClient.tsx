"use client";

import Breadcrumb from "@/components/Breadcrumb";

export default function BreadcrumbClient({ productName }: { productName: string }) {
  console.log("BreadcrumbClient productName:", productName);
  return <Breadcrumb productName={productName} />;
}
