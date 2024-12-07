"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/hooks/useUser";
import { useEffect } from "react";
import type { User } from "@prisma/client";
import MobileNav from "./MobileNav";

export default function Navbar({ data }: { data: User | null }) {
  const pathname = usePathname();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  const navItems = [
    { name: "Sign In", href: "/sign-in", visible: !user },
    { name: "Profile", href: "/profile", visible: !!user },
    { name: "Dashboard", href: "/dashboard", visible: user?.role === "ADMIN" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/75 backdrop-blur-md z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">Auth App</Link>
        <div className="hidden md:flex items-center space-x-6">
          {navItems
            .filter((item) => item.visible)
            .map(({ name, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded text-sm font-medium hover:text-blue-500 transition",
                  pathname === href ? "text-blue-500 " : "text-gray-700"
                )}
              >
                <span>{name}</span>
              </Link>
            ))}
        </div>
        <MobileNav/>
      </div>
      
    </nav>
  );
}
