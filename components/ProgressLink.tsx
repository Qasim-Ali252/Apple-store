"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import { ComponentProps } from "react";

type ProgressLinkProps = ComponentProps<typeof Link>;

export default function ProgressLink({ href, children, ...props }: ProgressLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    NProgress.start();
    router.push(href.toString());
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
