"use client";

import { useEffect, useState } from "react";

export function useSectionVisibility(sectionId: string) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(`[data-section="${sectionId}"]`);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section is in viewport (with some margin for better UX)
      const isInView = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
      setIsVisible(isInView);
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionId]);

  return isVisible;
}
