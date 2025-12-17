"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }

      setLoading(false);
    };

    getUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <p className="font-sans text-stone-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const memberSince = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-paper py-32">
      <div className="container mx-auto max-w-2xl px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold text-stone-900">Your Profile</h1>
          <p className="font-sans text-stone-600">Manage your Marginalia account</p>
        </div>

        {/* Profile Card */}
        <div className="rounded-lg border border-stone-200 bg-white p-8 shadow-sm">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="mb-2 font-serif text-2xl font-bold text-stone-900">
              Welcome back!
            </h2>
            <p className="font-sans text-lg text-stone-600">{user.email}</p>
          </div>

          {/* Member Info */}
          <div className="mb-8 rounded-md bg-stone-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 font-sans text-xs font-bold uppercase tracking-widest text-stone-500">
                  Member Since
                </p>
                <p className="font-serif text-lg text-stone-900">{memberSince}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-stone-900 flex items-center justify-center">
                <span className="font-sans text-xl font-bold text-white">
                  {user.email?.[0].toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="mb-8 space-y-4 border-t border-stone-200 pt-6">
            <div>
              <p className="mb-1 font-sans text-xs font-bold uppercase tracking-widest text-stone-500">
                Email Address
              </p>
              <p className="font-sans text-stone-900">{user.email}</p>
            </div>
            <div>
              <p className="mb-1 font-sans text-xs font-bold uppercase tracking-widest text-stone-500">
                User ID
              </p>
              <p className="font-mono text-sm text-stone-600">{user.id}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 border-t border-stone-200 pt-6">
            <button
              onClick={handleSignOut}
              className="flex-1 border border-red-600 bg-transparent px-6 py-3 font-sans text-sm font-bold uppercase tracking-widest text-red-600 transition-colors hover:bg-red-50"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a href="/" className="font-sans text-sm text-stone-600 hover:text-stone-900">
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
