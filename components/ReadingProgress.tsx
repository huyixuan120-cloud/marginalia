"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Get scroll position
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Get total scrollable height
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Calculate percentage (0 to 100)
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

      // Clamp between 0 and 100
      const clampedProgress = Math.min(Math.max(scrollPercentage, 0), 100);

      setProgress(clampedProgress);
    };

    // Set initial progress
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 h-1 bg-gradient-to-r from-yellow-600 to-yellow-500 origin-left transition-transform duration-150 ease-out"
      style={{ transform: `scaleX(${progress / 100})` }}
      aria-label={`Reading progress: ${Math.round(progress)}%`}
    />
  );
}
