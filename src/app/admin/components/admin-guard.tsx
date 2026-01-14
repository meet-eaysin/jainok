"use client";

import { useEffect } from "react";

import { useRouter, usePathname } from "next/navigation";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const key = sessionStorage.getItem("adminKey");
    if (!key && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [router, pathname]);

  // Don't guard the login page itself to prevent loop
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return <>{children}</>;
}
