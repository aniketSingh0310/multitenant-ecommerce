"use client";
import React, { useState } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { NavbarSidebar } from "./navbar-sidebar";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}
const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      className={cn(
        "bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-base",
        isActive
          ? "bg-black text-white hover:bg-black hover:text-white"
          : "text-black/70"
      )}
      variant={"outline"}
    >
      <Link href={href} className="flex items-center gap-2">
        {children}
      </Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/contact", children: "Contact" },
  { href: "/blog", children: "Blog" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="h-15 border-b flex justify-between bg-white">
      <Link href={"/"} className="items-center flex">
        <span className={cn("text-3xl tracking-tighter font-semibold pl-6", poppins.className)}>
          MetaShopper.
        </span>
      </Link>

      <div className="items-center gap-4 hidden lg:flex ">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>
      <div className="hidden lg:flex">
        <Button
          asChild
          variant="outline"
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-yellow-300 transition-colors text-base"
        >
          <Link prefetch href={"/sign-in"}>Log In</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-yellow-300 transition-colors text-base"
        >
          <Link prefetch  href={"/sign-up"}>Start Selling</Link>
        </Button>
      </div>
      {/* Mobile side bar */}
      <div className="flex lg:hidden items-center justify-center">
         <Button
          variant="ghost"
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-yellow-300 transition-colors text-base"
            onClick={() => setOpen(!open)}
            >
                <MenuIcon className="w-6 h-6 text-black" />
                </Button> 
      </div>
      <NavbarSidebar items={navbarItems} open={open} onOpenChange={setOpen}/>
    </nav>
  );
};
