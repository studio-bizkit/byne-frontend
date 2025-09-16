"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useIsMobile } from '@/lib/useMediaQuery';

// Type definition for SVG path methods we're using
declare module 'react' {
  interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    preserveAspectRatio?: string;
  }
}
function getProgressForX(path: SVGPathElement, targetX: number, pathLength: number): number {
  let low = 0;
  let high = pathLength;
  let mid = 0; // initialize

  while (low < high) {
    mid = (low + high) / 2;
    const point = path.getPointAtLength(mid);

    if (point.x < targetX) {
      low = mid + 0.5; // step size
    } else {
      high = mid - 0.5;
    }

    if (Math.abs(point.x - targetX) < 1) break;
  }

  return mid / pathLength;
}


const WavyPathScroll = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [isPathComplete, setIsPathComplete] = useState(false);
  const [currentMobileText, setCurrentMobileText] = useState(0);
  const [thresholds, setThresholds] = useState<{ q1: number; q2: number; q3: number }>({
    q1: 0,
    q2: 0,
    q3: 0,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth spring animation for the progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scroll progress to path offset
  const pathOffset = useTransform(smoothProgress, [0, 1], [0, 1]);

  // States for text visibility
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);

  // Bean position along the path
  const [beanPosition, setBeanPosition] = useState({ x: 0, y: 0 });
  const [beanRotation, setBeanRotation] = useState(0);

  // The SVG path data for a wavy line from left edge to right edge
  const pathData = "M 2 2 Q 269 17 400 200 T 813 308 Q 1068 220 1303 373 T 1669 491";

  useEffect(() => {
    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      setPathLength(length);

      const q1 = getProgressForX(path, 417, length);
      const q2 = getProgressForX(path, 834, length);
      const q3 = getProgressForX(path, 1251, length);
      setThresholds({ q1, q2, q3 });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = pathOffset.on("change", (latest) => {
      const path = pathRef.current;
      if (path && pathLength > 0) {
        const point = path.getPointAtLength(latest * pathLength);
        setBeanPosition({ x: point.x, y: point.y });

        // Calculate rotation based on path tangent
        const nextPoint = path.getPointAtLength(Math.min((latest + 0.01) * pathLength, pathLength));
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
        setBeanRotation(angle);

        if (isMobile) {
          // For mobile, update current text based on progress
          if (latest >= thresholds.q3) setCurrentMobileText(2);
          else if (latest >= thresholds.q2) setCurrentMobileText(1);
          else if (latest >= thresholds.q1) setCurrentMobileText(0);
        } else {
          // For desktop, show/hide individual texts
          setShowText1(latest >= thresholds.q1);
          setShowText2(latest >= thresholds.q2);
          setShowText3(latest >= thresholds.q3);
        }

        // Check if path is complete
        setIsPathComplete(latest >= 0.98);
      }
    });

    return () => unsubscribe();
  }, [pathOffset, pathLength, thresholds, isMobile]);

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  } as const;

  // Bean SVG component
  const BeanSVG = ({ x, y, rotation }: { x: number, y: number, rotation: number }) => (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      <motion.image
        href="/bean.svg"
        x="-20"
        y="-20"
        width="40"
        height="40"
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
      />
    </g>
  );

  return (
    <>
      {/* Main scrollable container */}
      <div
        ref={containerRef}
        className="relative h-[300vh]"
      >
        {/* Fixed positioned content */}
        <div className="sticky top-0 min-h-screen">
          <div className="relative w-full h-screen overflow-hidden">
            {/* SVG Path */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1600 500"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background wavy path */}
              <path
                ref={pathRef}
                d={pathData}
                fill="none"
                stroke="rgba(0, 51, 153, 0.3)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Animated path reveal */}
              <motion.path
                d={pathData}
                fill="none"
                stroke="rgb(0, 51, 153)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                style={{ pathLength: pathOffset }}
              />

              {/* Traveling coffee bean */}
              <motion.g
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                <BeanSVG x={beanPosition.x} y={beanPosition.y} rotation={beanRotation} />
              </motion.g>
              {/* Removed milestone markers */}
            </svg>

            {/* Text content - responsive layout */}
            <div className="absolute inset-0 pointer-events-none">
              {isMobile ? (
                // Mobile: Single text container that updates content
                <motion.div
                  className="absolute left-[20%] top-[20%] max-w-xs mx-6 text-right pointer-events-auto"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  key={currentMobileText} // Force animation restart when content changes
                >
                  {currentMobileText === 0 && (
                    <>
                      <h2 className="text-3xl font-light italic text-primary mb-2">
                        Established in 1931,
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        the estate carries a legacy stretching over a century. Known for its sustainable, wildlife-friendly farming practices, Bynekere produces the finest S795 Arabica coffee.
                      </p>
                    </>
                  )}
                  {currentMobileText === 1 && (
                    <>
                      <h2 className="text-3xl font-light italic text-primary mb-2">
                        Premium Processing
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        Our beans undergo meticulous processing, from hand-picking at peak ripeness to careful sun-drying on raised beds, ensuring exceptional flavor profiles in every batch.
                      </p>
                    </>
                  )}
                  {currentMobileText === 2 && (
                    <>
                      <h2 className="text-3xl font-light italic text-primary mb-2">
                        Award Winning Quality
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        Recognized globally for excellence, our coffee has won multiple international cupping competitions and is served in the world&apos;s finest establishments.
                      </p>
                    </>
                  )}
                </motion.div>
              ) : (
                // Desktop: Multiple text containers
                <>
                  <motion.div
                    className="absolute left-[30%] top-[30%] max-w-sm pointer-events-auto"
                    variants={textVariants}
                    initial="hidden"
                    animate={showText1 ? "visible" : "hidden"}
                  >
                    <h2 className="text-3xl font-light italic text-primary mb-2">
                      Established in 1931,
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      the estate carries a legacy stretching over a century. Known for its sustainable, wildlife-friendly farming practices, Bynekere produces the finest S795 Arabica coffee.
                    </p>
                  </motion.div>

                  <motion.div
                    className="absolute left-[50%] top-[60%] max-w-sm pointer-events-auto"
                    variants={textVariants}
                    initial="hidden"
                    animate={showText2 ? "visible" : "hidden"}
                  >
                    <h2 className="text-3xl font-light italic text-primary mb-2">
                      Premium Processing
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Our beans undergo meticulous processing, from hand-picking at peak ripeness to careful sun-drying on raised beds, ensuring exceptional flavor profiles in every batch.
                    </p>
                  </motion.div>

                  <motion.div
                    className="absolute right-[5%] top-[30%] max-w-sm pointer-events-auto"
                    variants={textVariants}
                    initial="hidden"
                    animate={showText3 ? "visible" : "hidden"}
                  >
                    <h2 className="text-3xl font-light italic text-primary mb-2">
                      Award Winning Quality
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Recognized globally for excellence, our coffee has won multiple international cupping competitions and is served in the world&apos;s finest establishments.
                    </p>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Next Section - Only scrollable after path is complete */}
      {isPathComplete && (
        <motion.div
          className="min-h-screen bg-primary p-20 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl text-center">
            <h2 className="text-5xl font-bold text-primary mb-6">Welcome to Our Coffee Journey</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Continue scrolling to discover more about our premium coffee heritage,
              sustainable practices, and the passion that goes into every cup.
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default WavyPathScroll;