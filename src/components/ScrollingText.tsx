"use client";
import React, { useEffect, useRef, useMemo } from "react";
import { motion, useScroll } from "framer-motion";
import { useIsMobile } from "@/lib/useMediaQuery";

// Generate random bean positions
// Generate semi-uniform bean positions (clustered center, sides)
const generateBeans = (count: number) => {
  const beans = [];
  for (let i = 0; i < count; i++) {
    let x;
    // Cluster some beans near the middle, some left/right
    if (i % 3 === 0) {
      // left cluster
      x = 10 + Math.random() * 20;
    } else if (i % 3 === 1) {
      // center cluster
      x = 40 + Math.random() * 20;
    } else {
      // right cluster
      x = 70 + Math.random() * 20;
    }

    const y = 20 + Math.random() * 60; // keep within visible vertical range

    beans.push({
      id: i,
      image: `/beans/${(i % 4) + 1}.png`,
      x,
      y,
      rotation: Math.random() * 360,
      scale: 8 + Math.random() * 0.3,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 2,
    });
  }
  return beans;
};

export default function ScrollingText() {
  const container = useRef<HTMLDivElement | null>(null);
  const textPath = useRef<SVGTextPathElement | null>(null);
  const isMobile = useIsMobile();

  const beans = useMemo(() => generateBeans(isMobile ? 6 : 12), [isMobile]);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", e => {
      if (textPath.current) {
        const offset = -50 + e * 200;
        textPath.current.setAttribute("startOffset", offset + "%");
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div
      ref={container}
      className={`w-full flex flex-col justify-center items-center relative overflow-hidden ${
        isMobile ? "gap-6 mt-10 py-12 pb-0" : "gap-10 mt-20 py-20"
      }`}
    >
      {/* Animated coffee beans */}
      {beans.map(bean => {
        // 30% chance of appearing above text
        const isForeground = Math.random() < 0.3;
        return (
          <motion.img
            key={bean.id}
            src={bean.image}
            alt="Coffee bean"
            className={`absolute object-contain pointer-events-none ${
              isForeground ? "z-20" : "z-0"
            } ${isMobile ? "w-6 h-6" : "w-8 h-8"}`}
            style={{
              left: `${bean.x}%`,
              top: `${bean.y}%`,
            }}
            initial={{
              rotate: bean.rotation,
              scale: isMobile ? bean.scale * 0.6 : bean.scale,
            }}
            animate={{
              rotate: [bean.rotation, bean.rotation + 360],
              y: [0, isMobile ? -15 : -30, 0],
            }}
            transition={{
              duration: bean.duration,
              delay: bean.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}

      <h6 className={`${isMobile ? "text-2xl" : "text-4xl"} text-primary font-serif relative z-10`}>
        From our farms to your cups
      </h6>
      <svg className="w-full relative z-10" viewBox="0 0 900 300">
        <path
          fill="none"
          id="curve"
          stroke="transparent"
          strokeWidth="1"
          d="m58 70c171 86 169 139 325 34C499 37 582 351 843 42"
        />
        <motion.text
          className={`${isMobile ? "text-8xl" : "text-6xl"} font-light font-serif tracking-wider`}
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
