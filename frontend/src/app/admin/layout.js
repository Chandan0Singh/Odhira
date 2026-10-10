"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }) {
  const { user, isAuthenticated, loading } = useAuth(); // 👈 get loading
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // 👈 wait until localStorage is read

    if (!isAuthenticated) {
      router.replace("/");
      return;
    }

    if (user?.role !== "admin" && user?.role !== "superadmin") {
      router.replace("/");
    }
  }, [user, isAuthenticated, loading]); // 👈 add loading to deps

  // 👇 Show nothing while auth state is being restored
  if (loading) return null;

  if (!isAuthenticated) return null;

  return children;
}