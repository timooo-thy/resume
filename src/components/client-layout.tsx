"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldShowNavbar = !pathname.startsWith("/studio");

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
    </>
  );
}
