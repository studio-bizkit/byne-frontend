"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Helper: Get point on quadratic bezier
function getQuadraticXY(t: number, start: [number, number], cp: [number, number], end: [number, number]) {
  const x = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * cp[0] + t * t * end[0];
  const y = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * cp[1] + t * t * end[1];
  return { x, y };
}

export const WavyScrollPath = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current) {
        setDimensions({
          width: contentRef.current.offsetWidth,
          height: window.innerHeight,  // fixes: sticky should reference viewport, not content
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Create wavy path - for clarity, use two quadratic segments
  function createWavyPath(width: number, height: number) {
    const startX = 50;
    const endX = width - 50;
    const midX = width * 0.5;
    const y1 = height * 0.3;
    const y2 = height * 0.7;

    // Path: Q1 (start to mid), Q2 (mid to end)
    return `
      M ${startX} ${y1}
      Q ${width * 0.3} ${height * 0.1} ${midX} ${y1}
      Q ${width * 0.7} ${height * 0.5} ${endX} ${y2}
    `;
  }

  // Get XY along the path (split: progress 0 to 0.5 is first Q, 0.5 to 1 is second Q)
  function getCirclePosition(progress: number, width: number, height: number) {
    const start = [50, height * 0.3];
    const mid = [width * 0.5, height * 0.3];
    const end = [width - 50, height * 0.7];
    const cp1 = [width * 0.3, height * 0.1];
    const cp2 = [width * 0.7, height * 0.5];
    if (progress <= 0.5) {
      return getQuadraticXY(progress * 2, start, cp1, mid);
    } else {
      return getQuadraticXY((progress - 0.5) * 2, mid, cp2, end);
    }
  }

  // Visible part of the path (0=none, 1=all)
  const drawProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
  });
  // Opacity for the full path (dimmed)
  const baseOpacity = useTransform(scrollYProgress, [0, 0.05], [0.18, 0.18]);
  // Opacity for the outlined (drawing) path (full)
  const outlineOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 1]);

  // Section triggers roughly at thirds along progress
  const sections = [
    useTransform(scrollYProgress, [0.08, 0.18], [0, 1]), // Section 1
    useTransform(scrollYProgress, [0.26, 0.36], [0, 1]), // Section 2
    useTransform(scrollYProgress, [0.48, 0.60], [0, 1]), // Section 3
  ];

  // In Tailwind breakpoints, adjust minWidth threshold if needed
  const svgWidth = dimensions.width < 400 ? 400 : dimensions.width || 800;
  const svgHeight = dimensions.height || 600;

  // How much is the entire path? Will animate to that length
  const pathLength = svgWidth + svgHeight;
  
  return (
    <section className="relative min-h-[220vh]">
      <motion.div ref={ref} className="sticky top-0 h-screen w-full" style={{ pointerEvents: "none" }}>
        <svg
          width={svgWidth}
          height={svgHeight}
          className="absolute inset-0"
        >
          {/* Faint base path */}
          <motion.path
            d={createWavyPath(svgWidth, svgHeight)}
            stroke="#003399"
            strokeWidth={6}
            fill="none"
            style={{
              opacity: baseOpacity,
            }}
          />
          {/* Drawn animated path */}
          <motion.path
            d={createWavyPath(svgWidth, svgHeight)}
            stroke="#003399"
            strokeWidth={6}
            fill="none"
            style={{
              opacity: outlineOpacity,
              strokeDasharray: pathLength,
              strokeDashoffset: drawProgress.to(p => (1 - p) * pathLength),
            }}
          />
          {/* Moving circle */}
          <motion.circle
            r={13}
            fill="#003399"
            style={{
              x: drawProgress.to(p => getCirclePosition(p, svgWidth, svgHeight).x),
              y: drawProgress.to(p => getCirclePosition(p, svgWidth, svgHeight).y),
            }}
            // Key: using x and y for motion instead of cx/cy for Framer Motion
          />
        </svg>
      </motion.div>
      <div ref={contentRef} className="relative z-10 space-y-48 px-8 py-20">
        {/* Section 1 */}
        <motion.div
          className="flex items-center justify-start"
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ opacity: sections[0] }}
          transition={{ duration: 0.7 }}
        >
          <div className="p-8 max-w-md bg-white/90 rounded-lg shadow text-primary">
            <h2 className="text-2xl italic mb-4">Established in 1931</h2>
            <p className="text-gray-600 leading-relaxed">
              The estate carries a legacy stretching over a century. Known for its sustainable, wildlife-friendly farming practices, Bynekere produces the finest S795 Arabica coffee.
            </p>
          </div>
        </motion.div>
        {/* Section 2 */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ opacity: sections[1] }}
          transition={{ duration: 0.7 }}
        >
          <div className="p-8 max-w-md bg-white/90 rounded-lg shadow text-primary">
            <h2 className="text-2xl italic mb-4">A Unique Craft</h2>
            <p className="text-gray-600 leading-relaxed">
              Our artisanal process preserves biodiversity and ensures that every bean tells its own story through bold, balanced flavor.
            </p>
          </div>
        </motion.div>
        {/* Section 3 */}
        <motion.div
          className="flex items-center justify-end"
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ opacity: sections[2] }}
          transition={{ duration: 0.7 }}
        >
          <div className="p-8 max-w-md bg-white/90 rounded-lg shadow text-primary">
            <h2 className="text-2xl italic mb-4">Proudly Grown</h2>
            <p className="text-gray-600 leading-relaxed">
              Bynekere represents the heritage of Indian coffee, cultivated in harmony with nature.
            </p>
          </div>
        </motion.div>
        <div className="h-96"></div>
      </div>
    </section>
  );
};

// Demo page
export default function WavyScrollDemo() {
  return (
    <div className="min-h-screen">
      <WavyScrollPath className="w-full">

        {null}
        {/* Content inside WavyScrollPath */}
      </WavyScrollPath>
    </div>
  );
}
