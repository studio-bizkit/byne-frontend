"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";

export default function ScrollingText() {
  const container = useRef<HTMLDivElement | null>(null);
  const textPath = useRef<SVGTextPathElement | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'] // Adjust these values to control when animation starts/ends
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (e) => {
      if (textPath.current) {
        // Animate from -50% to 150% as you scroll
        // This creates a smooth text movement along the path
        const offset = -50 + (e * 200);
        textPath.current.setAttribute("startOffset", offset + "%");
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={container} className="w-full flex flex-col justify-center items-center gap-10 mt-20">
      <h6 className="text-2xl text-primary font-serif">
        From our farms to your cups
      </h6>
      <svg className="w-full" viewBox="0 0 900 300">
        <path
          fill="none"
          id="curve"
          stroke="transparent"
          strokeWidth="1"
          d="m58 70c171 86 169 139 385 12C570 21 582 351 843 42"
        />
        <motion.text
          className="text-6xl font-light font-serif tracking-wider"
          fill="#003399"
        >
          <textPath 
            ref={textPath}
            startOffset="50%" 
            textAnchor="middle" 
            href="#curve"
          >
            Experience coffee with us
          </textPath>
        </motion.text>
      </svg>
    </div>
  );
}