// components/FooterWrapper.tsx
"use client"; // Required for using usePathname

import { usePathname } from "next/navigation";
import Footer from "./Footer"; // Import your existing Footer component

export default function FooterWrapper() {
  const pathname = usePathname();

  // Hide footer only on specific routes if needed
  // Currently showing footer on all pages
  
  // For all pages, show the Footer
  return <Footer />;
}