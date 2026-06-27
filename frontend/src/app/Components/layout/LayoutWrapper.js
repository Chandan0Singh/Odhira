"use client";

import { usePathname } from "next/navigation";
import Header from "../Header";
import Footer from "../Footer";
import AdminHeader from "../admin/adminHeader";
import AdminFooter from "../admin/adminFooter";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin ? <Header /> : <AdminHeader />}

      {children}

      {!isAdmin ? <Footer /> : <AdminFooter />}
    </>
  );
}