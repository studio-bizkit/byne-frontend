"use client";
import React, { useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/lib/useMediaQuery";
import Image from "next/image";

// Generate strategic bean positions for mobile around text
const generateMobileBeans = () => {
  const beans: Array<{
    id: number;
    image: string;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    delay: number;
    duration: number;
    isMain: boolean;
  }> = [
    // Two main regular-sized beans near the center-right area
    {
      id: 1,
      image: "/beans/1.png",
      x: 70,
      y: 70,
      rotation: 0,
      scale: 0.8,
      delay: 0.2,
      duration: 6,
      isMain: true,
    },
    {
      id: 2,
      image: "/beans/3.png",
      x: 75,
      y: 75,
      rotation: 0,
      scale: 0.8,
      delay: 0.4,
      duration: 7,
      isMain: true,
    },
  ];

  // Fixed small beans positions to avoid clustering (spread top/mid/bottom and left/center/right)
  const fixedSmallBeans = [
    // Top band (y 4-18), varied x
    {
      id: 3,
      image: "/beans/2.png",
      x: 12,
      y: 4,
      rotation: 30,
      scale: 0.42,
      delay: 0.6,
      duration: 6,
    },
    {
      id: 4,
      image: "/beans/4.png",
      x: 26,
      y: 18,
      rotation: -45,
      scale: 0.38,
      delay: 0.7,
      duration: 7,
    },
    {
      id: 5,
      image: "/beans/1.png",
      x: 44,
      y: 2,
      rotation: 15,
      scale: 0.36,
      delay: 0.8,
      duration: 6,
    },
    {
      id: 6,
      image: "/beans/3.png",
      x: 63,
      y: 30,
      rotation: 60,
      scale: 0.34,
      delay: 0.9,
      duration: 7,
    },
    {
      id: 7,
      image: "/beans/2.png",
      x: 82,
      y: 40,
      rotation: -20,
      scale: 0.4,
      delay: 1.0,
      duration: 6,
    },
    {
      id: 8,
      image: "/beans/4.png",
      x: 90,
      y: 12,
      rotation: 95,
      scale: 0.36,
      delay: 1.1,
      duration: 6,
    },

    // Mid band (y 30-55), staggered x
    {
      id: 9,
      image: "/beans/1.png",
      x: 14,
      y: 34,
      rotation: 110,
      scale: 0.35,
      delay: 0.8,
      duration: 6,
    },
    {
      id: 10,
      image: "/beans/3.png",
      x: 32,
      y: 42,
      rotation: -80,
      scale: 0.32,
      delay: 0.9,
      duration: 7,
    },
    {
      id: 11,
      image: "/beans/2.png",
      x: 50,
      y: 48,
      rotation: 90,
      scale: 0.33,
      delay: 1.0,
      duration: 6,
    },
    {
      id: 12,
      image: "/beans/4.png",
      x: 68,
      y: 40,
      rotation: -120,
      scale: 0.31,
      delay: 1.1,
      duration: 7,
    },
    {
      id: 13,
      image: "/beans/3.png",
      x: 86,
      y: 36,
      rotation: 45,
      scale: 0.36,
      delay: 1.2,
      duration: 6,
    },

    // Mid-lower band (y 60-70)
    {
      id: 14,
      image: "/beans/3.png",
      x: 10,
      y: 62,
      rotation: -30,
      scale: 0.39,
      delay: 1.0,
      duration: 7,
    },
    {
      id: 15,
      image: "/beans/2.png",
      x: 28,
      y: 68,
      rotation: 75,
      scale: 0.34,
      delay: 1.1,
      duration: 6,
    },
    {
      id: 16,
      image: "/beans/4.png",
      x: 52,
      y: 72,
      rotation: -100,
      scale: 0.37,
      delay: 1.2,
      duration: 7,
    },
    {
      id: 17,
      image: "/beans/1.png",
      x: 74,
      y: 66,
      rotation: 130,
      scale: 0.33,
      delay: 1.3,
      duration: 6,
    },
    {
      id: 18,
      image: "/beans/3.png",
      x: 88,
      y: 64,
      rotation: -60,
      scale: 0.35,
      delay: 1.4,
      duration: 7,
    },

    // Lower band (y 75-85)
    {
      id: 19,
      image: "/beans/2.png",
      x: 12,
      y: 78,
      rotation: 20,
      scale: 0.38,
      delay: 1.2,
      duration: 6,
    },
    {
      id: 20,
      image: "/beans/1.png",
      x: 34,
      y: 82,
      rotation: -15,
      scale: 0.36,
      delay: 1.3,
      duration: 7,
    },
    {
      id: 21,
      image: "/beans/4.png",
      x: 56,
      y: 84,
      rotation: 40,
      scale: 0.34,
      delay: 1.4,
      duration: 6,
    },
    {
      id: 22,
      image: "/beans/3.png",
      x: 76,
      y: 80,
      rotation: -75,
      scale: 0.32,
      delay: 1.5,
      duration: 7,
    },
    {
      id: 23,
      image: "/beans/2.png",
      x: 90,
      y: 82,
      rotation: 95,
      scale: 0.35,
      delay: 1.6,
      duration: 6,
    },
  ];

  fixedSmallBeans.forEach(b => {
    beans.push({ ...b, isMain: false });
  });

  return beans;
};

// Generate random bean positions for desktop
const generateDesktopBeans = (count: number) => {
  const beans = [];
  for (let i = 0; i < count; i++) {
    // Determine which of the 9 sections this bean belongs to
    const sectionIndex = i % 9;

    // Define 9 sections in a 3x3 grid
    const sectionWidth = 100 / 3; // ~33.33% per column
    const sectionHeight = 80 / 3; // ~26.67% per row

    const col = sectionIndex % 3; // 0, 1, or 2
    const row = Math.floor(sectionIndex / 3); // 0, 1, or 2

    // Calculate base position for this section
    const baseX = col * sectionWidth;
    const baseY = 10 + row * sectionHeight; // Start at 10% from top

    // Add randomization within the section
    const x = baseX + Math.random() * (sectionWidth * 0.8); // Use 80% of section width
    const y = baseY + Math.random() * (sectionHeight * 0.8); // Use 80% of section height

    beans.push({
      id: i,
      image: `/beans/${(i % 4) + 1}.png`,
      x,
      y,
      rotation: Math.random() * 360,
      scale: 8 + Math.random() * 0.3,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 2,
      isMain: false, // Desktop beans are not main beans
    });
  }
  return beans;
};

export default function ScrollingText() {
  const container = useRef<HTMLDivElement | null>(null);
  const textPath = useRef<SVGTextPathElement | null>(null);
  const isMobile = useIsMobile();

  const beans = useMemo(() => {
    return isMobile ? generateMobileBeans() : generateDesktopBeans(10);
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: isMobile
      ? ["start center", "end start"]
      : ["start end", "end start"],
  });

  // Create smooth scroll-based Y transform for beans
  const beanYTransform = useTransform(scrollYProgress, [0, 1], [0, -20]);

  // Path scrolling effect for desktop
  useEffect(() => {
    if (isMobile) return; // Skip for mobile

    const unsubscribe = scrollYProgress.on("change", e => {
      if (textPath.current) {
        const offset = -50 + e * 200;
        textPath.current.setAttribute("startOffset", offset + "%");
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isMobile]);

  // Mobile-specific scroll transforms for text lines
  const beanY = useTransform(scrollYProgress, [0, 0.7], [100, 0]);
  const scaleY = useTransform(scrollYProgress, [0.1, 0.4], [1.3, 1]);
  const fromY = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);
  const experienceY = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);
  const coffeeY = useTransform(scrollYProgress, [0.2, 0.5], [50, 0]);
  const withUsY = useTransform(scrollYProgress, [0.4, 0.6], [30, 0]);

  if (isMobile) {
    return (
      <div
        ref={container}
        className="w-full flex flex-col justify-center items-start relative gap-0 -mt-8 pb-0 px-6 overflow-hidden -mb-54 md:-mb-12"
        style={{ minHeight: "120vh" }}
      >
        {/* Animated coffee beans for mobile */}
        {beans.map(bean => (
          <motion.img
            key={bean.id}
            src={bean.image}
            alt="Coffee bean"
            className={`absolute object-contain pointer-events-none z-10 ${
              bean.isMain ? "w-8 h-8" : "w-4 h-4"
            }`}
            style={{
              left: `${bean.x}%`,
              top: `${bean.y}%`,
              y: beanY,
            }}
            initial={{
              rotate: bean.rotation,
              scale: bean.isMain ? bean.scale * 0.2 : bean.scale * 0.1,
              y: 100,
              opacity: 0,
            }}
            animate={{
              rotate: [
                bean.rotation,
                bean.rotation === 0 ? 30 : bean.rotation + 360,
              ],
              y: [0, -15, 0],
              opacity: 1,
            }}
            transition={{
              y: {
                duration: 1.5,
                delay: bean.delay,
                ease: "easeOut",
                times: [0, 0.2, 1],
              },
              opacity: {
                duration: 1,
                delay: bean.delay,
                ease: "easeOut",
              },
              rotate: {
                duration: bean.duration,
                delay: bean.delay + 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        ))}
        {/* Centered blue arch logo above text, behind beans */}
        {/* <motion.div className="absolute z-0 left-1/2 -translate-x-1/2 top-48 w-40 h-48 pointer-events-none"
        style={{scale:scaleY}}>
          <div className="relative w-full h-full">
            <Image
              src="/logo-blue-arch.svg"
              alt="Bynekere Estate Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div> */}
        {/* Mobile text layout - bottom-left anchored */}
        <div className="absolute z-20 left-6 bottom-48 flex flex-col gap-0">
          <h6 className="text-2xl text-primary font-serif z-20 -mt-24">
            <motion.div style={{ y: fromY }}>
              From our farms to your cups
            </motion.div>
          </h6>
          <motion.div
            style={{ y: experienceY }}
            className="text-8xl font-medium font-serif tracking-tight text-[#003399] leading-tighter"
          >
            Experience
          </motion.div>
          <motion.div
            style={{ y: coffeeY }}
            className="text-8xl font-medium font-serif tracking-tight text-[#003399] leading-tighter"
          >
            coffee
          </motion.div>
          <motion.div
            style={{ y: withUsY }}
            className="text-8xl font-medium font-serif tracking-tight text-[#003399] leading-tighter -mt-4"
          >
            with Us
          </motion.div>
        </div>
      </div>
    );
  }

  // Desktop version (original)
  return (
    <div
      ref={container}
      className="w-full flex flex-col justify-center items-center relative overflow-hidden gap-10 mt-20 pt-20 -mb-24 "
    >
      {/* Animated coffee beans for desktop */}
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
            } w-8 h-8`}
            style={{
              left: `${bean.x}%`,
              top: `${bean.y}%`,
              y: beanYTransform,
            }}
            initial={{
              rotate: bean.rotation,
              scale: bean.scale,
              y: 100,
              opacity: 0,
            }}
            animate={{
              rotate: [bean.rotation, bean.rotation + 360],
              y: [0, -30, 0],
              opacity: 1,
            }}
            transition={{
              y: {
                duration: 1.5,
                delay: bean.delay,
                ease: "easeOut",
                times: [0, 0.2, 1],
              },
              opacity: {
                duration: 1,
                delay: bean.delay,
                ease: "easeOut",
              },
              rotate: {
                duration: bean.duration,
                delay: bean.delay + 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        );
      })}

      <h6 className="text-4xl text-primary font-serif relative z-10">
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
