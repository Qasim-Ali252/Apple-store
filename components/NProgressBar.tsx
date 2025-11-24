"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 50,
  minimum: 0.08,
  easing: 'ease',
  speed: 1000
});

export default function NProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href) {
        const targetUrl = new URL(anchor.href);
        const currentUrl = new URL(window.location.href);
        
        // Check if it's an internal link and not the same page
        if (
          targetUrl.origin === currentUrl.origin &&
          targetUrl.pathname !== currentUrl.pathname &&
          !anchor.target &&
          !anchor.hasAttribute('download')
        ) {
          NProgress.start();
        }
      }
    };

    // Add click listener to document
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
