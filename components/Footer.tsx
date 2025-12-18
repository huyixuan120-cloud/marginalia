"use client";

import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic will go here
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="border-t border-stone-200 bg-[#FBF9F4]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-20 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr_1fr] lg:gap-20">

          {/* Column 1: Brand & Newsletter */}
          <div>
            <Link
              href="/"
              className="mb-6 inline-block font-serif text-3xl font-bold tracking-tight text-stone-900 transition-opacity hover:opacity-70"
            >
              Marginalia
            </Link>
            <p className="mb-8 max-w-md font-sans text-base leading-relaxed text-stone-600">
              Essays on philosophy, culture, and the human experience. Delivered weekly.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="flex max-w-md gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 border border-stone-300 bg-white px-4 py-3 font-sans text-sm text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-stone-900 px-6 py-3 font-sans text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-stone-700"
              >
                Join
              </button>
            </form>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h3 className="mb-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
              Platform
            </h3>
            <nav className="space-y-4">
              <Link
                href="/about"
                className="block font-sans text-base text-stone-700 transition-colors hover:text-stone-900"
              >
                About
              </Link>
              <Link
                href="#"
                className="block font-sans text-base text-stone-700 transition-colors hover:text-stone-900"
              >
                Donate
              </Link>
              <Link
                href="#"
                className="block font-sans text-base text-stone-700 transition-colors hover:text-stone-900"
              >
                Newsletter
              </Link>
            </nav>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="mb-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
              Legal
            </h3>
            <nav className="space-y-4">
              <Link
                href="/terms"
                className="block font-sans text-base text-stone-700 transition-colors hover:text-stone-900"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="block font-sans text-base text-stone-700 transition-colors hover:text-stone-900"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="block font-sans text-base text-stone-700 transition-colors hover:text-stone-900"
              >
                Cookies
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-200 bg-white">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 lg:flex-row lg:px-12">
          <p className="font-sans text-sm text-stone-500">
            © 2025 Marginalia. All rights reserved.
          </p>
          <p className="font-sans text-sm italic text-stone-400">
            Designed for Deep Reading
          </p>
        </div>
      </div>
    </footer>
  );
}
