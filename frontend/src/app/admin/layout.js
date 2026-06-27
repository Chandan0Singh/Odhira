"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
      return;
    }

    if (user?.role !== "admin" && user?.role !== "superadmin") {
      router.replace("/");
    }
  }, [user, isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return children;
}