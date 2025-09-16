'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create the media query list
    const mediaQuery = window.matchMedia(query);

    // Set the initial value
    setMatches(mediaQuery.matches);

    // Create an event listener function that updates matches
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the listener to handle changes
    mediaQuery.addEventListener('change', listener);

    // Cleanup function to remove listener
    return () => mediaQuery.removeEventListener('change', listener);
  }, [query]); // Only re-run if query changes

  return matches;
}

// Preset hook for mobile detection
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)');
}