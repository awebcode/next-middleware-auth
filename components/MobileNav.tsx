import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/hooks/useUser";

export default function MobileNav() {
  const pathname = usePathname();
  const {user}=useUserStore()
   const navItems = [
     { name: "Sign In", href: "/sign-in", visible: !user },
     { name: "Profile", href: "/profile", visible: !!user },
     { name: "Dashboard", href: "/dashboard", visible: user?.role === "ADMIN" },
   ];
  return (
    <Sheet>
      <SheetTrigger asChild className="block md:hidden">
        <Button size={"icon"}>
          <span className="sr-only">Open Menu</span>☰
        </Button>
      </SheetTrigger>
      <SheetContent>
        <>
          <SheetTitle>Auth</SheetTitle>
          <SheetDescription>Learn web development like a pro</SheetDescription>
        </>
        <div className="flex flex-col py-4  space-y-2">
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
      </SheetContent>
    </Sheet>
  );
}
