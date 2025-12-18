"use client";

import { useEffect, useState } from "react";
import { Search, Menu, Facebook, Instagram, Twitter, X, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Category definitions for menu
  const categories = [
    { name: 'Economia', slug: 'economia' },
    { name: 'Storia', slug: 'storia' },
    { name: 'Società', slug: 'societa' },
    { name: 'Geopolitica', slug: 'geopolitica' },
    { name: 'Filosofia', slug: 'filosofia' },
    { name: 'Tecnologia', slug: 'tecnologia' },
  ];

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

  // Block body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <>
      {/* ========== STICKY HEADER BAR ========== */}
      <header className="sticky top-0 z-50 w-full border-b border-stone-200/50 bg-paper/95 backdrop-blur-sm">
        {/* Unified Layout: Mobile uses flex, Desktop uses grid */}
        <nav className="flex w-full items-center justify-between px-6 py-5 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8 lg:py-6 xl:px-12">

          {/* LEFT ZONE: PUSHED TO FAR LEFT EDGE */}
          <div className="flex items-center justify-start gap-4 lg:gap-8">
            {/* Menu Button - Opens Overlay */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group"
            >
              <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-stone-700 transition-colors hover:text-stone-900 lg:text-[13px] lg:tracking-[0.25em]">
                Menu
              </span>
            </button>

            {/* Search Icon - Hidden on mobile */}
            <button className="hidden transition-colors lg:block" aria-label="Search">
              <Search className="h-5 w-5 text-stone-600 hover:text-stone-900" />
            </button>

            {/* Divider - Hidden on mobile */}
            <div className="hidden h-5 w-px bg-stone-300 lg:block" />

            {/* Social Icons - Hidden on mobile */}
            <div className="hidden items-center gap-5 lg:flex">
              <button className="transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-stone-600 hover:text-stone-900" />
              </button>
              <button className="transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-stone-600 hover:text-stone-900" />
              </button>
              <button className="transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-stone-600 hover:text-stone-900" />
              </button>
            </div>
          </div>

          {/* CENTER ZONE: LOGO (Responsive sizing) */}
          <div className="flex items-center justify-center lg:px-12">
            <Link
              href="/"
              className="whitespace-nowrap font-serif text-3xl font-bold tracking-tight text-stone-900 transition-opacity hover:opacity-70 lg:text-5xl xl:text-6xl"
            >
              Marginalia
            </Link>
          </div>

          {/* RIGHT ZONE - DESKTOP: TEXT LINKS */}
          <div className="hidden w-full items-center justify-end gap-10 lg:flex">
            <Link
              href="/about"
              className="font-sans text-[13px] font-medium uppercase tracking-[0.25em] text-stone-700 transition-colors hover:text-stone-900"
            >
              About
            </Link>

            {!loading && (
              user ? (
                <>
                  <Link
                    href="/profile"
                    className="font-sans text-[13px] font-medium uppercase tracking-[0.25em] text-stone-700 transition-colors hover:text-stone-900"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="font-sans text-[13px] font-medium uppercase tracking-[0.25em] text-stone-700 transition-colors hover:text-stone-900"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="font-sans text-[13px] font-medium uppercase tracking-[0.25em] text-stone-700 transition-colors hover:text-stone-900"
                >
                  Login
                </Link>
              )
            )}
          </div>

          {/* RIGHT ZONE - MOBILE: USER ICON */}
          {!loading && (
            <Link
              href={user ? "/profile" : "/login"}
              className="flex items-center justify-center lg:hidden"
              aria-label={user ? "User profile" : "Login"}
            >
              <UserIcon className="h-6 w-6 text-stone-900" />
            </Link>
          )}
        </nav>
      </header>

      {/* ========== MEGA MENU OVERLAY (OUTSIDE HEADER - ISOLATED) ========== */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 overflow-y-auto"
          style={{
            backgroundColor: '#FFFFFF',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            opacity: 1,
            visibility: 'visible',
          }}
        >
          {/* Close Button & Header */}
          <div className="flex items-center justify-between border-b border-stone-200 px-6 py-6 lg:px-12 bg-white">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="group flex items-center gap-2"
            >
              <X className="h-6 w-6 text-stone-900" />
              <span className="font-sans text-sm font-bold uppercase tracking-[0.25em] text-stone-700 transition-colors hover:text-stone-900">
                Close
              </span>
            </button>

            {/* Logo in Menu */}
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="font-serif text-3xl font-bold tracking-tight text-stone-900"
            >
              Marginalia
            </Link>

            <div className="w-24" />
          </div>

          {/* 2-Column Grid Layout */}
          <div className="grid min-h-[calc(100vh-88px)] grid-cols-1 lg:grid-cols-2 bg-white">

            {/* LEFT COLUMN: CATEGORIES */}
            <div className="flex flex-col justify-center border-b px-6 py-8 lg:border-r lg:border-b-0 lg:px-16 lg:py-12 bg-white">
              <nav className="space-y-4 lg:space-y-6">
                <h2 className="mb-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-stone-500 lg:mb-8 lg:text-sm">
                  Esplora per Categoria
                </h2>

                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block font-serif text-3xl font-bold leading-tight tracking-tight text-stone-900 transition-colors hover:text-stone-600 lg:text-4xl xl:text-5xl"
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* RIGHT COLUMN: POPULAR & UTILITIES */}
            <div className="flex flex-col justify-start gap-12 px-6 py-8 lg:gap-20 lg:px-16 lg:py-12 bg-white">

              {/* Popular Essays */}
              <div>
                <h3 className="mb-6 font-sans text-sm font-bold uppercase tracking-[0.2em] text-stone-500">
                  Articoli Popolari
                </h3>
                <div className="space-y-6">
                  <Link
                    href="/essay/elogio-della-lentezza"
                    onClick={() => setIsMenuOpen(false)}
                    className="block group"
                  >
                    <h4 className="font-serif text-2xl font-medium leading-tight text-stone-900 transition-colors group-hover:text-stone-600">
                      Elogio della Lentezza
                    </h4>
                    <p className="mt-2 font-sans text-base leading-relaxed text-stone-500">
                      Perché correre non serve a nulla se non sai dove andare
                    </p>
                  </Link>

                  <Link
                    href="/essay/digital-minimalism"
                    onClick={() => setIsMenuOpen(false)}
                    className="block group"
                  >
                    <h4 className="font-serif text-2xl font-medium leading-tight text-stone-900 transition-colors group-hover:text-stone-600">
                      Digital Minimalism
                    </h4>
                    <p className="mt-2 font-sans text-base leading-relaxed text-stone-500">
                      Reclaiming attention in the age of distraction
                    </p>
                  </Link>

                  <Link
                    href="/essay/the-art-of-waiting"
                    onClick={() => setIsMenuOpen(false)}
                    className="block group"
                  >
                    <h4 className="font-serif text-2xl font-medium leading-tight text-stone-900 transition-colors group-hover:text-stone-600">
                      The Art of Waiting
                    </h4>
                    <p className="mt-2 font-sans text-base leading-relaxed text-stone-500">
                      Finding meaning in the spaces between
                    </p>
                  </Link>
                </div>
              </div>

              {/* About Link */}
              <div className="border-t border-stone-200 pt-8">
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-block font-serif text-2xl font-bold text-stone-900 transition-colors hover:text-stone-600"
                >
                  About Marginalia →
                </Link>
              </div>

              {/* Search Bar */}
              <div>
                <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-[0.2em] text-stone-500">
                  Cerca
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cerca articoli..."
                    className="w-full border-b-2 border-stone-300 bg-transparent py-4 pr-10 font-sans text-lg text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:outline-none"
                  />
                  <Search className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
