"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "success", text: "Welcome back!" });
        router.push("/");
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({
          type: "success",
          text: "Account created! Check your email to confirm your account."
        });
        // Don't redirect immediately for sign up - user needs to confirm email
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper py-32">
      <div className="container mx-auto max-w-md px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="mb-4 inline-block font-serif text-4xl font-bold text-stone-900">
            Marginalia
          </Link>
          <p className="font-sans text-stone-600">Sign in to your account</p>
        </div>

        {/* Form */}
        <div className="rounded-lg border border-stone-200 bg-white p-8 shadow-sm">
          <form className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="mb-2 block font-sans text-sm font-medium text-stone-900">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
                required
                className="w-full rounded-none border border-stone-300 bg-transparent px-4 py-3 text-sm focus:border-stone-900 focus:outline-none disabled:opacity-50"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="mb-2 block font-sans text-sm font-medium text-stone-900">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                required
                className="w-full rounded-none border border-stone-300 bg-transparent px-4 py-3 text-sm focus:border-stone-900 focus:outline-none disabled:opacity-50"
              />
            </div>

            {/* Message */}
            {message && (
              <div
                className={`rounded-md p-4 text-sm ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                onClick={handleLogin}
                disabled={loading || !email || !password}
                className="flex-1 bg-stone-900 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-stone-700 disabled:opacity-50"
              >
                {loading ? "..." : "Log In"}
              </button>
              <button
                type="button"
                onClick={handleSignUp}
                disabled={loading || !email || !password}
                className="flex-1 border border-stone-900 bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-100 disabled:opacity-50"
              >
                {loading ? "..." : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link href="/" className="font-sans text-sm text-stone-600 hover:text-stone-900">
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
