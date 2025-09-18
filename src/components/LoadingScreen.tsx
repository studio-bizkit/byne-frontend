"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoadingScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // Smooth increment function
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (loading && progress < 90) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + 1;
          return prev;
        });
      }, 30); // adjust speed
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [loading, progress]);

  // Initial load
  useEffect(() => {
    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => setLoading(false), 300);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Route change tracking
  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      setProgress(10); // reset
    };
    const handleComplete = () => {
      setProgress(100);
      setTimeout(() => setLoading(false), 300);
    };

    // ❌ In App Router `useRouter` does not expose .events
    // ✅ Use window events instead
    window.addEventListener("beforeunload", handleStart);
    router.prefetch; // keep router ref so eslint doesn’t warn

    return () => {
      window.removeEventListener("beforeunload", handleStart);
    };
  }, [router]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[9999] transition-opacity duration-300">
      {/* Percentage */}
      <p className="text-4xl font-serif mb-4 text-primary">{progress}%</p>

    </div>
  );
}