"use client";
import { Search, Menu, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/50 bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 md:px-12">

        {/* LEFT: Nav & Socials */}
        <div className="flex items-center gap-6">
          <button className="group flex items-center gap-2">
            <span className="font-sans text-xs font-bold tracking-[0.2em] text-stone-900">MENU</span>
            <Search className="h-4 w-4 text-stone-400 group-hover:text-stone-900" />
          </button>

          <div className="hidden h-4 w-px bg-stone-300 md:block" />

          <div className="hidden gap-4 md:flex">
             {/* Social Icons (Hover effect needed) */}
             <Facebook className="h-4 w-4 text-stone-400 hover:text-stone-900 cursor-pointer" />
             <Instagram className="h-4 w-4 text-stone-400 hover:text-stone-900 cursor-pointer" />
             <Twitter className="h-4 w-4 text-stone-400 hover:text-stone-900 cursor-pointer" />
          </div>
        </div>

        {/* CENTER: Logo */}
        <div className="text-center">
          <Link href="/" className="font-serif text-4xl font-bold tracking-tighter text-stone-900">
            Marginalia
          </Link>
        </div>

        {/* RIGHT: Utilities */}
        <div className="hidden items-center justify-end gap-6 md:flex">
          <Link href="#" className="font-sans text-xs font-bold tracking-[0.2em] text-stone-500 hover:text-stone-900">
            DONATE
          </Link>
          <span className="text-stone-300">/</span>
          <Link href="#" className="font-sans text-xs font-bold tracking-[0.2em] text-stone-500 hover:text-stone-900">
            NEWSLETTER
          </Link>
          <span className="text-stone-300">/</span>
          <Link href="#" className="font-sans text-xs font-bold tracking-[0.2em] text-stone-500 hover:text-stone-900">
            SIGN IN
          </Link>
        </div>

        {/* Mobile Menu Trigger (Right side on mobile) */}
        <div className="flex justify-end md:hidden">
             <Menu className="h-6 w-6 text-stone-900" />
        </div>

      </div>
    </header>
  );
}
