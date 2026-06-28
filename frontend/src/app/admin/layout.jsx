"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) { router.replace("/"); return; }
    if (user?.role !== "admin" && user?.role !== "superadmin") {
      router.replace("/");
    }
  }, [user, isAuthenticated, loading]);

  if (loading || !isAuthenticated) return null;
  return <>{children}</>;
}
