"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Users,
  FileText,
  Ticket,
  BarChart3,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const links = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Home",
      href: "/admin/home",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: <Package size={18} />,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: <Users size={18} />,
    },
    {
      name: "Blogs",
      href: "/admin/blogs",
      icon: <FileText size={18} />,
    },
    {
      name: "Coupons",
      href: "/admin/coupons",
      icon: <Ticket size={18} />,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart3 size={18} />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/admin/dashboard"
          className="text-2xl font-bold tracking-wide"
        >
          Admin Panel
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium">{user?.name || "Admin"}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
