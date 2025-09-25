"use client";

import React, { useState } from "react";
import { motion, Transition, TargetAndTransition } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/lib/useMediaQuery";

type AnimationPath = {
  animate: TargetAndTransition;
  transition: Transition;
};

const PolaroidBoundingBox = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const images = [
    {
      id: 1,
      src: "/homestay/1.png",
      title: "Portrait Study",
      subtitle: "Natural Light",
      width: 240,
      height: 320,
    },
    {
      id: 2,
      src: "/homestay/2.png",
      title: "Fashion Editorial",
      subtitle: "Studio Session",
      width: 240,
      height: 320,
    },
    {
      id: 3,
      src: "/homestay/3.png",
      title: "Lifestyle",
      subtitle: "Urban Context",
      width: 200,
      height: 250,
    },
    {
      id: 4,
      src: "/homestay/4.png",
      title: "Street Style",
      subtitle: "Candid Moment",
      width: 170,
      height: 230,
    },
    {
      id: 5,
      src: "/homestay/5.png",
      title: "Business Portrait",
      subtitle: "Professional",
      width: 240,
      height: 320,
    },
    {
      id: 6,
      src: "/homestay/6.png",
      title: "Creative Direction",
      subtitle: "Artistic Vision",
      width: 190,
      height: 260,
    },
    {
      id: 7,
      src: "/homestay/7.png",
      title: "Documentary",
      subtitle: "Raw & Real",
      width: 160,
      height: 220,
    },
  ];

  const animationPaths: AnimationPath[] = [
    {
      animate: { x: [0, 40, 0, -40, 0], y: [0, 0, 0, 0, 0] },
      transition: { duration: 20, repeat: Infinity, ease: "easeInOut" },
    },
    {
      animate: { x: [0, 0, 0, 0], y: [0, -30, 0, 30, 0] },
      transition: { duration: 22, repeat: Infinity, ease: "easeInOut" },
    },
    {
      animate: { x: [0, 30, 0, -30, 0], y: [0, -30, 0, 30, 0] },
      transition: { duration: 24, repeat: Infinity, ease: "easeInOut" },
    },
    {
      animate: { x: [0, 20, 0, -20, 0], y: [0, 20, 0, -20, 0] },
      transition: { duration: 26, repeat: Infinity, ease: "linear" },
    },
    {
      animate: { x: [0, -35, 0, 35, 0], y: [0, 15, 0, -15, 0] },
      transition: { duration: 28, repeat: Infinity, ease: "easeInOut" },
    },
    {
      animate: { x: [0, 25, 0, -25, 0], y: [0, 25, 0, -25, 0] },
      transition: { duration: 30, repeat: Infinity, ease: "easeInOut" },
    },
    {
      animate: { x: [0, 0, 0, 0], y: [0, -20, 0, 20, 0] },
      transition: { duration: 18, repeat: Infinity, ease: "easeInOut" },
    },
  ];

  const initialPositions = [
    { top: "10%", left: "15%" },
    { top: "15%", right: "23%" },
    { bottom: "10%", left: "15%" },
    { bottom: "5%", right: "20%" },
    { top: "50%", left: "30%" },
    { bottom: "5%", right: "35%" },
    { top: "15%", left: "45%" },
  ];

  return (
    <div className="relative w-full h-screen bg-background  mb-24">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="font-serif text-primary/20 text-6xl md:text-9xl">
          {isMobile ? "Click to expand" : "Hover for more"}
        </span>
      </div>

      {images.map((image, index) => {
        // Adjust size for mobile
        const baseWidth = isMobile ? image.width * 0.7 : image.width;
        const baseHeight = isMobile ? image.height * 0.7 : image.height;
        const expandedWidth = isMobile ? baseWidth * 1.2 : image.width + 30;
        const expandedHeight = isMobile ? baseHeight * 1.2 : image.height + 80;

        const isActive = activeIndex === index;

        return (
          <motion.div
            key={image.id}
            className="absolute"
            style={
              isMobile && isActive
                ? {
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 50, // High z-index for mobile active state
                  }
                : {
                    ...initialPositions[index],
                    zIndex: isActive ? 50 : 10, // Higher z-index when active
                  }
            }
            animate={isMobile ? {} : animationPaths[index].animate}
            transition={animationPaths[index].transition}
            onHoverStart={!isMobile ? () => setActiveIndex(index) : undefined}
            onHoverEnd={!isMobile ? () => setActiveIndex(null) : undefined}
            onClick={
              isMobile
                ? () => setActiveIndex(isActive ? null : index)
                : undefined
            }
          >
            <motion.div
              className="relative cursor-pointer"
              animate={{
                scale: isActive ? 1.02 : 1,
              }}
              transition={{ duration: 0.3, ease: "linear" }} // fixed linear movement
            >
              <motion.div
                className="group bg-white relative shadow-[0_5px_15px_rgba(0,0,0,0.1)] overflow-hidden flex justify-center items-start"
                animate={{
                  width: isActive ? expandedWidth : baseWidth,
                  height: isActive ? expandedHeight : baseHeight,
                  boxShadow: isActive
                    ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    : "0 5px 15px rgba(0,0,0,0.1)",
                }}
                transition={{ duration: 0.3, ease: "linear" }} // fixed movement, no spring
              >
                <motion.div
                  className="relative w-full z-20"
                  style={{
                    height: `${baseHeight}px`,
                    maxWidth: `${baseWidth}px`,
                  }}
                  animate={{ y: isActive ? 20 : 0 }}
                >
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </motion.div>

                <motion.div
                  className="absolute bottom-0 left-0 w-full px-5 py-2 z-20"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    height: isActive ? 60 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-gray-800 text-sm font-semibold tracking-wide">
                    {image.title}
                  </h3>
                  <p className="text-gray-600 text-xs italic">
                    {image.subtitle}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PolaroidBoundingBox;
