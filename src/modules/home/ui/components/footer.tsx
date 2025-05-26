import React from 'react'
import { Poppins } from 'next/font/google';
import { cn } from "@/lib/utils";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
export const Footer = () => {
  return (
    <div className={cn("text-2xl tracking-tighter font-semibold border-t py-2",poppins.className)}>MetaShopper.</div>
  )
}
