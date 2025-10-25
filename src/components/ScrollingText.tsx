"use client";
import React, { useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/lib/useMediaQuery";

// Generate strategic bean positions for mobile around text
const generateMobileBeans = () => {
  return [
    // Two main regular-sized beans (you can adjust these positions)
    {
      id: 1,
      image: "/beans/1.png",
      x: 70, // Left side of "Experience"
      y: 60,
      rotation: 0,
      scale: 0.8, // Regular size
      delay: 0.2,
      duration: 6,
      isMain: true,
    },
    {
      id: 2,
      image: "/beans/3.png",
      x: 75, // Right side of "with Us"
      y: 65,
      rotation: 0,
      scale: 0.8, // Regular size
      delay: 0.4,
      duration: 7,
      isMain: true,
    },

    // Small random-sized beans (6-8 total)
    {
      id: 3,
      image: "/beans/3.png",
      x: 8,
      y: 25,
      rotation: 60,
      scale: 0.3 + Math.random() * 0.2, // Random small size (0.3-0.5)
      delay: 0.6,
      duration: 5,
      isMain: false,
    },
    {
      id: 4,
      image: "/beans/4.png",
      x: 85,
      y: 40,
      rotation: -45,
      scale: 0.3 + Math.random() * 0.2,
      delay: 0.8,
      duration: 8,
      isMain: false,
    },
    {
      id: 5,
      image: "/beans/1.png",
      x: 12,
      y: 60,
      rotation: 120,
      scale: 0.3 + Math.random() * 0.2,
      delay: 1.0,
      duration: 6,
      isMain: false,
    },
    {
      id: 6,
      image: "/beans/2.png",
      x: 88,
      y: 85,
      rotation: -60,
      scale: 0.3 + Math.random() * 0.2,
      delay: 1.2,
      duration: 7,
      isMain: false,
    },
    {
      id: 7,
      image: "/beans/3.png",
      x: 5,
      y: 85,
      rotation: 90,
      scale: 0.3 + Math.random() * 0.2,
      delay: 1.4,
      duration: 5,
      isMain: false,
    },
    {
      id: 8,
      image: "/beans/4.png",
      x: 70,
      y: 15,
      rotation: -120,
      scale: 0.3 + Math.random() * 0.2,
      delay: 1.6,
      duration: 8,
      isMain: false,
    },
  ];
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
    offset: isMobile?["start center", "end start"]:["start end", "end start"],
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
  const experienceY = useTransform(scrollYProgress, [0, 0.6], [100, 0]);
  const coffeeY = useTransform(scrollYProgress, [0.1, 0.7], [100, 0]);
  const withUsY = useTransform(scrollYProgress, [0.2, 0.8], [100, 0]);

  if (isMobile) {
    return (
      <div
        ref={container}
        className="w-full flex flex-col justify-center items-start relative gap-0 mt-10 py-12 pb-0 px-6 overflow-hidden"
        style={{ minHeight: '400px' }}
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
              y: beanYTransform,
            }}
            initial={{
              rotate: bean.rotation,
              scale: bean.isMain ? bean.scale * 0.2 : bean.scale * 0.1,
              y: 100,
              opacity: 0,
            }}
            animate={{
              rotate: [bean.rotation, bean.rotation === 0 ? 30 : bean.rotation + 360],
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

        <h6 className="text-2xl text-primary font-serif relative z-10">
          From our farms to your cups
        </h6>

        {/* Mobile text layout - left aligned, bigger text */}
        <div className="relative z-10 w-full flex flex-col gap-0" style={{ minHeight: '300px', paddingBottom: '100px' }}>
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
      className="w-full flex flex-col justify-center items-center relative overflow-hidden gap-10 mt-20 py-20"
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
