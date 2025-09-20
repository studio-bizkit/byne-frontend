"use client";

import Image from 'next/image';
import React from 'react';
import { motion, useTransform, useScroll } from "framer-motion";

const MissionValuesComponent = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["30% end", "end start"]
  });
  
  // Transform values for different elements based on section scroll
  const villaScale = useTransform(scrollYProgress, [0.1, 0.4], [1, 1.1]);
  const villaImageScale = useTransform(scrollYProgress, [0.1, 0.4], [1, 1.25]);
  const villaImageY = useTransform(scrollYProgress, [0.1, 0.4], [0, 16]);
  
  const legacyTextSize = useTransform(scrollYProgress, [0.15, 0.45], [14, 32]);
  const legacyImageScale = useTransform(scrollYProgress, [0.15, 0.45], [1, 1.25]);
  const legacyBottomY = useTransform(scrollYProgress, [0.15, 0.45], [0, 100]);
  const legacyBottomOpacity = useTransform(scrollYProgress, [0.15, 0.45], [1, 0]);
  
  const valuesTopY = useTransform(scrollYProgress, [0.2, 0.5], [0, -100]);
  const valuesTopOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);
  const valuesBottomY = useTransform(scrollYProgress, [0.2, 0.5], [0, 96]);
  const valuesBottomX = useTransform(scrollYProgress, [0.2, 0.5], [0, 24]);
  
  const coffeeImageScale = useTransform(scrollYProgress, [0.25, 0.55], [1, 1.25]);
  const coffeeImageY = useTransform(scrollYProgress, [0.25, 0.55], [0, 16]);
  const coffeeTopY = useTransform(scrollYProgress, [0.25, 0.55], [0, -16]);
  const coffeeTopOpacity = useTransform(scrollYProgress, [0.25, 0.55], [1, 0]);
  const coffeeBottomScale = useTransform(scrollYProgress, [0.25, 0.55], [1, 1.33]);
  
  const qualityTopOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);
  const qualityMainScale = useTransform(scrollYProgress, [0.3, 0.6], [1, 1.2]);
  const qualityMainY = useTransform(scrollYProgress, [0.3, 0.6], [0, -16]);
  
  const byneScale = useTransform(scrollYProgress, [0.35, 0.65], [1, 1.1]);
  const byneImageScale = useTransform(scrollYProgress, [0.35, 0.65], [1, 1.25]);
  const byneImageY = useTransform(scrollYProgress, [0.35, 0.65], [0, 16]);
  
  const memoryTopY = useTransform(scrollYProgress, [0.4, 0.7], [0, -100]);
  const memoryTopOpacity = useTransform(scrollYProgress, [0.4, 0.7], [1, 0]);
  const memoryBottomY = useTransform(scrollYProgress, [0.4, 0.7], [0, 96]);
  const memoryBottomX = useTransform(scrollYProgress, [0.4, 0.7], [0, 24]);
  
  const logoScale = useTransform(scrollYProgress, [0.45, 0.75], [1, 1.2]);
  
  const traditionTextSize = useTransform(scrollYProgress, [0.5, 0.8], [18, 12]);
  const traditionMainSize = useTransform(scrollYProgress, [0.5, 0.8], [20, 48]);
  const traditionImageY = useTransform(scrollYProgress, [0.5, 0.8], [0, 16]);
  const traditionBottomY = useTransform(scrollYProgress, [0.5, 0.8], [0, 16]);
  const traditionBottomOpacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);

  return (
    <div ref={ref} className="bg-background p-8 max-w-4xl mx-auto mt-12">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-serif text-primary text-center mb-12">
        Our mission & values
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-primary rounded-lg overflow-hidden">

        {/* Villa Bynekere - Top Left */}
        <div className="flex flex-col items-center text-center justify-between bg-background border-r border-b border-primary pt-10 aspect-square overflow-hidden">
          <motion.div 
            className="flex flex-col gap-1"
            style={{ scale: villaScale }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-primary font-medium">
              Villa <i>Bynekere</i>
            </h2>
            <p className="text-primary mb-6">
              Your home of serenity.
            </p>
          </motion.div>

          <div className="relative bottom-0 w-full h-32 overflow-hidden">
            <motion.div
              style={{ scale: villaImageScale, y: villaImageY }}
              className="w-full h-full"
            >
              <Image
                src={"/about/1x1-grid.svg"}
                alt={"Background"}
                fill
                className="object-cover object-bottom w-full h-full"
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* Rooted in legacy - Top Center */}
        <div className="bg-background p-8 border-r border-b border-primary flex flex-col justify-center overflow-hidden relative">
          <div>
            <motion.h3 
              className="text-primary mb-1"
              style={{ fontSize: legacyTextSize }}
            >
              Rooted in
              <span className='font-serif text-md italic'> legacy.
              </span>
            </motion.h3>

            <div className="relative bottom-0 w-full h-32 overflow-hidden">
              <motion.div
                style={{ scale: legacyImageScale }}
                className="w-full h-full"
              >
                <Image
                  src={"/about/1x2-grid.png"}
                  alt="Background"
                  fill
                  className="object-cover object-top-right w-full h-full"
                  priority
                />
              </motion.div>
            </div>

            <motion.h3 
              className="text-sm text-primary text-right"
              style={{ y: legacyBottomY, opacity: legacyBottomOpacity }}
            >
              inspired by our <span className='font-serif text-md italic'>beginnings.</span>
            </motion.h3>
          </div>
        </div>

        {/* Shaped by values - Top Right */}
        <div className="bg-primary p-8 border-b border-primary flex flex-col items-center justify-center text-center gap-0 overflow-hidden">
          <motion.h3 
            className="text-lg text-background"
            style={{ y: valuesTopY, opacity: valuesTopOpacity }}
          >
            Shaped by values
          </motion.h3>
          <motion.p 
            className="text-2xl font-serif text-background"
            style={{ y: valuesBottomY, x: valuesBottomX }}
          >
            comfort, care, connection
          </motion.p>
        </div>

        {/* Coffee image - Middle Left */}
        <div className="relative aspect-square border-r border-b border-primary overflow-hidden">
          <motion.div
            style={{ scale: coffeeImageScale, y: coffeeImageY }}
            className="w-full h-full"
          >
            <Image
              src="/about/2x1-grid.png"
              alt="Coffee Background"
              fill
              className="object-cover w-full h-full"
              priority
            />
          </motion.div>

          {/* Top Right Text */}
          <motion.div 
            className="absolute top-4 right-4 text-background font-serif"
            style={{ y: coffeeTopY, opacity: coffeeTopOpacity }}
          >
            <p className="text-lg">S795 Arabica&quot;</p>
          </motion.div>

          {/* Bottom Left Text */}
          <div className="absolute bottom-4 left-4 text-background font-serif">
            <motion.p 
              className="text-lg"
              style={{ scale: coffeeBottomScale }}
            >
              &quot;<b>Bold</b> Robusta
            </motion.p>
          </div>
        </div>

        {/* Quality promise - Middle Center */}
        <div className="bg-primary p-8 border-r border-b border-primary flex items-center justify-center aspect-square overflow-hidden">
          <div className="text-center">
            <motion.p 
              className="text-background text-sm mb-1"
              style={{ opacity: qualityTopOpacity }}
            >
              A personal promise of
            </motion.p>
            <motion.p 
              className="text-3xl font-serif text-background"
              style={{ scale: qualityMainScale, y: qualityMainY }}
            >
              quality and authentic taste.
            </motion.p>
          </div>
        </div>

        {/* Coffee Byne - Middle Right */}
        <div className="flex flex-col items-center text-center justify-between bg-background border-l border-b border-primary aspect-square overflow-hidden">
          <motion.div 
            className="flex flex-col gap-1 pt-10 z-10"
            style={{ scale: byneScale }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-primary font-medium">
              Coffee <i>Byne</i>
            </h2>
            <p className="text-primary">From farm to cup.</p>
          </motion.div>

          <div className="relative w-full flex-1">
            <motion.div
              style={{ scale: byneImageScale, y: byneImageY }}
              className="w-full h-full"
            >
              <Image
                src="/about/2x3-grid.png"
                alt="Background"
                fill
                className="object-cover object-bottom w-full h-full z-0"
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* Memorable experience - Bottom Left */}
        <div className="bg-primary p-8 border-b border-primary flex flex-col items-center justify-center text-center gap-0 overflow-hidden">
          <motion.h3 
            className="text-lg text-background"
            style={{ y: memoryTopY, opacity: memoryTopOpacity }}
          >
            Crafting memorable
          </motion.h3>
          <motion.p 
            className="text-2xl font-serif text-background"
            style={{ y: memoryBottomY, x: memoryBottomX }}
          >
            experience for a lifetime.
          </motion.p>
        </div>

        {/* Byne Coffee Logo - Bottom Center */}
        <div className="bg-background p-8 border-r border-primary flex flex-col items-center justify-center aspect-square overflow-hidden">
          <motion.div 
            className="h-3/4 w-full relative"
            style={{ scale: logoScale }}
          >
            <Image
              src="/about/3x2-grid.svg"
              alt="Byne Coffee Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Tradition - Bottom Right */}
        <div className="bg-background p-8 flex flex-col justify-between aspect-square overflow-hidden">
          <div className='flex flex-col items-center text-center -mb-3 tracking-tight'>
            <motion.h3 
              className="text-primary mb-1 leading-2"
              style={{ fontSize: traditionTextSize }}
            >
              Carrying forward the
            </motion.h3>
            <motion.p 
              className="text-primary font-serif italic"
              style={{ fontSize: traditionMainSize }}
            >
              tradition
            </motion.p>
          </div>
          
          <motion.div 
            className="relative bottom-0 w-full h-4/5 overflow-hidden"
            style={{ y: traditionImageY }}
          >
            <Image
              src={"/about/3x3-grid.png"}
              alt={"Background"}
              fill
              className="object-cover object-bottom w-full h-full"
              priority
            />
          </motion.div>

          <motion.div 
            className="flex justify-between text-xs text-primary leading-2 mt-1"
            style={{ y: traditionBottomY, opacity: traditionBottomOpacity }}
          >
            <span>Baba Budangiri Hills</span>
            <span>Since 1931</span>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default MissionValuesComponent;