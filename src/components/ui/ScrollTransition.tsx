"use client";
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";

interface ScrollTransitionProps {
  svgPath: string; // SVG path data
  nextSection: React.ReactNode; // content to reveal
  svgSize?: number; // optional size of SVG viewBox
}

const ScrollTransition: React.FC<ScrollTransitionProps> = ({
  svgPath,
  nextSection,
  svgSize = 500,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (!svgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        svgRef.current,
        { scale: 0 },
        {
          scale: 1,
          transformOrigin: "center center",
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden">
      <motion.svg
        ref={svgRef}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="absolute inset-0 w-full h-full"
        style={{ scale }}
      >
        <path d={svgPath} fill="currentColor" />
      </motion.svg>
      <div className="relative z-10">{nextSection}</div>
    </div>
  );
};

export default ScrollTransition;
