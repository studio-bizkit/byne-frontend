'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export interface ScrollSection {
  id: string;
  element: React.RefObject<HTMLElement>;
  onComplete?: () => void;
  isComplete?: boolean;
}

export interface ScrollControllerState {
  currentSection: string | null;
  isLocked: boolean;
  sections: ScrollSection[];
}

export const useScrollController = () => {
  const [state, setState] = useState<ScrollControllerState>({
    currentSection: null,
    isLocked: false,
    sections: [],
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Register a section
  const registerSection = useCallback((section: ScrollSection) => {
    setState(prev => ({
      ...prev,
      sections: [...prev.sections.filter(s => s.id !== section.id), section],
    }));
  }, []);

  // Unregister a section
  const unregisterSection = useCallback((sectionId: string) => {
    setState(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId),
    }));
  }, []);

  // Mark section as complete
  const completeSection = useCallback((sectionId: string) => {
    setState(prev => ({
      ...prev,
      sections: prev.sections.map(s => 
        s.id === sectionId ? { ...s, isComplete: true } : s
      ),
    }));
  }, []);

  // Lock scrolling
  const lockScroll = useCallback(() => {
    setState(prev => ({ ...prev, isLocked: true }));
    document.body.style.overflow = 'hidden';
  }, []);

  // Unlock scrolling
  const unlockScroll = useCallback(() => {
    setState(prev => ({ ...prev, isLocked: false }));
    document.body.style.overflow = '';
  }, []);

  // Move to next section
  const moveToNextSection = useCallback(() => {
    const currentIndex = state.sections.findIndex(s => s.id === state.currentSection);
    const nextSection = state.sections[currentIndex + 1];
    
    if (nextSection?.element.current) {
      nextSection.element.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setState(prev => ({ ...prev, currentSection: nextSection.id }));
    }
  }, [state.currentSection, state.sections]);

  // Check if current section is complete and move to next
  const checkAndAdvance = useCallback(() => {
    const currentSectionData = state.sections.find(s => s.id === state.currentSection);
    if (currentSectionData?.isComplete && !state.isLocked) {
      unlockScroll();
      setTimeout(() => {
        moveToNextSection();
      }, 100);
    }
  }, [state.currentSection, state.sections, state.isLocked, unlockScroll, moveToNextSection]);

  // Handle scroll events
  useEffect(() => {
    if (!containerRef.current) return;

    let lastScrollTime = 0;
    const scrollThrottle = 100; // ms

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < scrollThrottle) return;
      lastScrollTime = now;

      if (state.isLocked) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      setIsScrolling(true);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        checkAndAdvance();
      }, 200);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (state.isLocked) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchmove', handleTouchMove);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [state.isLocked, checkAndAdvance]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    containerRef,
    state,
    registerSection,
    unregisterSection,
    completeSection,
    lockScroll,
    unlockScroll,
    moveToNextSection,
    isScrolling,
  };
};
