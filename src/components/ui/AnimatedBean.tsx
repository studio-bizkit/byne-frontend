"use client";
import { useIsMobile } from "@/lib/useMediaQuery";
import { motion, useTransform, useScroll } from "framer-motion";
import { useMemo, useRef, useEffect, useState } from "react";

const SemicircleScrollAnimation = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform values for the semicircles
  const leftSemicircleX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [isMobile ? "-200px" : "-400px", "0px", "0px"]
  );

  const rightSemicircleX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [isMobile ? "200px" : "400px", "0px", "0px"]
  );

  // Semicircle SVG component
  const SemicircleSVG = ({ isLeft = true }) => (
    <svg
      width={isMobile ? "200" : "300"}
      height={isMobile ? "400" : "600"}
      viewBox={`0 0 ${isMobile ? 200 : 300} ${isMobile ? 400 : 600}`}
      fill="none"
    >
      <path
        d={
          isLeft
            ? `M ${isMobile ? 200 : 300} 0 A ${isMobile ? 200 : 300} ${
                isMobile ? 300 : 450
              } 0 0 0 ${isMobile ? 200 : 300} ${isMobile ? 400 : 600} Z`
            : `M 0 0 A ${isMobile ? 200 : 300} ${
                isMobile ? 300 : 450
              } 0 0 1 0 ${isMobile ? 400 : 600} Z`
        }
        fill="#1e40af"
        stroke="none"
      />
      {/* Inner curved line */}
      <path
        d={
          isLeft
            ? `M ${isMobile ? 160 : 240} ${isMobile ? 50 : 75} A ${
                isMobile ? 120 : 180
              } ${isMobile ? 180 : 270} 0 0 0 ${isMobile ? 160 : 240} ${
                isMobile ? 350 : 525
              }`
            : `M ${isMobile ? 40 : 60} ${isMobile ? 50 : 75} A ${
                isMobile ? 120 : 180
              } ${isMobile ? 180 : 270} 0 0 1 ${isMobile ? 40 : 60} ${
                isMobile ? 350 : 525
              }`
        }
        stroke="#f8f4ed"
        strokeWidth={isMobile ? "3" : "4"}
        fill="none"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
     
      {/* Main animation container */}
      <div
        ref={containerRef}
        className="relative flex items-center justify-center overflow-hidden bg-[#f8f4ed]"
      >
        {/* Left semicircle */}
        <motion.div
          style={{ x: leftSemicircleX }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
        >
          <SemicircleSVG isLeft={true} />
        </motion.div>

        {/* Right semicircle */}
        <motion.div
          style={{ x: rightSemicircleX }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
        >
          <SemicircleSVG isLeft={false} />
        </motion.div>

        {/* Center content */}
        <motion.div
          className="relative z-20 text-center px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="mb-6">
            {/* Blue oval logo */}
            <div className="mx-auto w-16 h-24 bg-blue-600 rounded-full relative mb-4">
              <div className="absolute inset-2 bg-white rounded-full"></div>
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-16 bg-blue-600 rounded-full"
                style={{
                  clipPath: "ellipse(50% 80% at 30% 50%)",
                }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-blue-600 text-sm font-medium tracking-wide">
              Activities offered at
            </p>
            <h1 className="text-blue-800 text-4xl md:text-5xl font-bold">
              Villa Bynekere
            </h1>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SemicircleScrollAnimation;
