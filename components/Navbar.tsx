"use client";

import { useEffect, useState } from "react";
import { Search, Menu, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

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
             {/* Social Icons */}
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
          <Link href="/about" className="font-sans text-xs font-bold tracking-[0.2em] text-stone-500 hover:text-stone-900">
            ABOUT
          </Link>
          <span className="text-stone-300">/</span>
          <Link href="#" className="font-sans text-xs font-bold tracking-[0.2em] text-stone-500 hover:text-stone-900">
            NEWSLETTER
          </Link>
          <span className="text-stone-300">/</span>
          {!loading && (
            user ? (
              <>
                <Link href="/profile" className="font-sans text-xs font-bold tracking-[0.2em] text-stone-500 hover:text-stone-900">
                  PROFILE
                </Link>
                <span className="text-stone-300">/</span>
                <button
                  onClick={handleSignOut}
                  className="font-sans text-xs font-bold tracking-[0.2em] text-stone-500 hover:text-stone-900"
                >
                  SIGN OUT
                </button>
              </>
            ) : (
              <Link href="/login" className="font-sans text-xs font-bold tracking-[0.2em] text-stone-500 hover:text-stone-900">
                LOGIN
              </Link>
            )
          )}
        </div>

        {/* Mobile Menu Trigger (Right side on mobile) */}
        <div className="flex justify-end md:hidden">
             <Menu className="h-6 w-6 text-stone-900" />
        </div>

      </div>
    </header>
  );
}
