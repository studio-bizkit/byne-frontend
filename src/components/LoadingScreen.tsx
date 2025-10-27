"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AnimatedBean from "./ui/AnimatedBean";

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

  // Initial load and video tracking
  useEffect(() => {
    const handleLoad = () => {
      // Check if there are any video elements loading
      const videos = document.querySelectorAll('video');
      let videoLoaded = true;

      if (videos.length > 0) {
        videoLoaded = Array.from(videos).every(video => 
          video.readyState >= 3 || // HAVE_FUTURE_DATA
          video.dataset.muxComplete === 'true' // Check Mux loading state
        );
      }

      if (videoLoaded) {
        setProgress(100);
        setTimeout(() => setLoading(false), 300);
      }
    };

    // Listen for Mux video ready event
    const handleMuxInit = () => {
      setProgress(prev => Math.min(prev + 20, 90));
    };

    window.addEventListener('mux-video-ready', handleMuxInit);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Cleanup
    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener('mux-video-ready', handleMuxInit);
    };
  }, []);

  // Route change tracking
  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      setProgress(10); // reset
    };

    // ❌ In App Router `useRouter` does not expose .events
    // ✅ Use window events instead
    window.addEventListener("beforeunload", handleStart);
    // Keep router ref to prevent eslint warning
    void router;

    return () => {
      window.removeEventListener("beforeunload", handleStart);
    };
  }, [router]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[9999] transition-opacity duration-300">
      {/* Progress container */}
      <div className="flex items-center gap-3">
        
        {/* Animated Bean */}
        <AnimatedBean progress={progress} size={40} />
        {/* Percentage */}
        <p className="text-4xl font-serif text-primary">{progress}</p>
      </div>
    </div>
  );
}