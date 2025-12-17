"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validate email
    if (!email || !email.includes("@")) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("subscribers")
        .insert({ email });

      if (error) {
        // Check for duplicate email error
        if (error.code === "23505") {
          setMessage({ type: "error", text: "This email is already subscribed." });
        } else {
          setMessage({ type: "error", text: "Something went wrong. Please try again." });
        }
      } else {
        setMessage({ type: "success", text: "Thank you for subscribing!" });
        setEmail(""); // Clear the input
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#F5F1ED] px-6 py-24 font-sans text-stone-600">
      <div className="container mx-auto grid grid-cols-1 gap-12 md:grid-cols-4">
        {/* Newsletter Section - Spans 2 cols */}
        <div className="md:col-span-2">
          <h3 className="mb-4 font-serif text-2xl font-bold text-stone-900">Marginalia</h3>
          <p className="mb-6 max-w-sm leading-relaxed">
            Essays on philosophy, culture, and the human experience. Delivered weekly.
          </p>
          <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                disabled={loading}
                className="w-full rounded-none border border-stone-300 bg-transparent px-4 py-2 text-sm placeholder:text-stone-400 focus:border-stone-900 focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-stone-900 px-6 py-2 text-xs font-bold uppercase tracking-widest text-[#FDFBF7] transition-colors hover:bg-stone-700 disabled:opacity-50"
              >
                {loading ? "..." : "Join"}
              </button>
            </div>
            {message && (
              <p className={`text-sm ${message.type === "success" ? "text-green-700" : "text-red-600"}`}>
                {message.text}
              </p>
            )}
          </form>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-stone-900">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-stone-900 hover:underline">About</a></li>
            <li><a href="#" className="hover:text-stone-900 hover:underline">Donate</a></li>
            <li><a href="#" className="hover:text-stone-900 hover:underline">Newsletter</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-stone-900">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-stone-900 hover:underline">Terms</a></li>
            <li><a href="#" className="hover:text-stone-900 hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:text-stone-900 hover:underline">Cookies</a></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-16 flex flex-col items-center justify-between border-t border-stone-300 pt-8 text-xs md:flex-row">
        <p>&copy; 2025 Marginalia. All rights reserved.</p>
        <p>Designed for Deep Reading.</p>
      </div>
    </footer>
  );
}
