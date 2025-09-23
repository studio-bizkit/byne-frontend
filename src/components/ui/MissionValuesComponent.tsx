"use client";

import Image from 'next/image';
import React from 'react';
import { motion, useTransform, useScroll, MotionValue } from "framer-motion";

// TypeScript interfaces for component props
interface VillaBynekereProps {
  villaScale: MotionValue<number>;
  villaImageScale: MotionValue<number>;
  villaImageY: MotionValue<number>;
}

interface RootedInLegacyProps {
  legacyTextSize: MotionValue<number>;
  legacyImageScale: MotionValue<number>;
  legacyBottomY: MotionValue<number>;
  legacyBottomOpacity: MotionValue<number>;
}

interface ShapedByValuesProps {
  valuesTopY: MotionValue<number>;
  valuesTopOpacity: MotionValue<number>;
  valuesBottomY: MotionValue<number>;
  valuesBottomX: MotionValue<number>;
}

interface CoffeeImageProps {
  coffeeImageScale: MotionValue<number>;
  coffeeImageY: MotionValue<number>;
  coffeeTopY: MotionValue<number>;
  coffeeTopOpacity: MotionValue<number>;
  coffeeBottomScale: MotionValue<number>;
}

interface QualityPromiseProps {
  qualityTopOpacity: MotionValue<number>;
  qualityMainScale: MotionValue<number>;
  qualityMainY: MotionValue<number>;
}

interface CoffeeByneProps {
  byneScale: MotionValue<number>;
  byneImageScale: MotionValue<number>;
  byneImageY: MotionValue<number>;
}

interface MemorableExperienceProps {
  memoryTopY: MotionValue<number>;
  memoryTopOpacity: MotionValue<number>;
  memoryBottomY: MotionValue<number>;
  memoryBottomX: MotionValue<number>;
}

interface ByneCoffeeLogoProps {
  logoScale: MotionValue<number>;
}

interface TraditionProps {
  traditionTextSize: MotionValue<number>;
  traditionMainSize: MotionValue<number>;
  traditionImageY: MotionValue<number>;
  traditionBottomY: MotionValue<number>;
  traditionBottomOpacity: MotionValue<number>;
}

// Villa Bynekere Component
const VillaBynekere: React.FC<VillaBynekereProps> = ({ villaScale, villaImageScale, villaImageY }) => (
  <div className="flex flex-col items-center text-center justify-between bg-background border-r border-b border-primary md:border-r md:border-b pt-6 md:pt-10 aspect-square overflow-hidden">
    <motion.div
      className="flex flex-col gap-1"
      style={{ scale: villaScale }}
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-primary font-medium">
        Villa <i>Bynekere</i>
      </h2>
      <p className="text-sm md:text-base text-primary mb-4 md:mb-6">
        Your home of serenity.
      </p>
    </motion.div>

    <div className="relative bottom-0 w-full h-1/2  overflow-hidden">
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
);

// Rooted in Legacy Component
const RootedInLegacy: React.FC<RootedInLegacyProps> = ({ legacyTextSize, legacyImageScale, legacyBottomY, legacyBottomOpacity }) => (
  <div className="bg-background p-4 md:p-8 border-b border-primary md:border-r md:border-b flex flex-col justify-center overflow-hidden relative min-h-[200px] md:min-h-0">
    <div>
      <motion.h3
        className="text-primary mb-1"
        style={{ fontSize: legacyTextSize }}
      >
        Rooted in
        <span className='font-serif text-sm md:text-md italic'> legacy.
        </span>
      </motion.h3>

      <div className="relative bottom-0 w-full h-24 md:h-32 overflow-hidden">
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
        className="text-xs md:text-sm text-primary text-right"
        style={{ y: legacyBottomY, opacity: legacyBottomOpacity }}
      >
        inspired by our <span className='font-serif text-sm md:text-md italic'>beginnings.</span>
      </motion.h3>
    </div>
  </div>
);

// Shaped by Values Component
const ShapedByValues: React.FC<ShapedByValuesProps> = ({ valuesTopY, valuesTopOpacity, valuesBottomY, valuesBottomX }) => (
  <div className="bg-primary p-4 md:p-8 border-b border-primary md:border-b flex flex-col items-center justify-center text-center gap-0 overflow-hidden aspect-square">
    <motion.h3
      className="text-sm md:text-lg text-background"
      style={{ y: valuesTopY, opacity: valuesTopOpacity }}
    >
      Shaped by values
    </motion.h3>
    <motion.p
      className="text-lg md:text-2xl font-serif text-background"
      style={{ y: valuesBottomY, x: valuesBottomX }}
    >
      comfort, care, connection
    </motion.p>
  </div>
);

// Coffee Image Component
const CoffeeImage: React.FC<CoffeeImageProps> = ({ coffeeImageScale, coffeeImageY, coffeeTopY, coffeeTopOpacity, coffeeBottomScale }) => (
  <div className="relative aspect-square border-r border-b border-primary md:border-r md:border-b overflow-hidden">
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
      className="absolute top-2 md:top-4 right-2 md:right-4 text-background font-serif"
      style={{ y: coffeeTopY, opacity: coffeeTopOpacity }}
    >
      <p className="text-sm md:text-lg">S795 Arabica&quot;</p>
    </motion.div>

    {/* Bottom Left Text */}
    <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 text-background font-serif">
      <motion.p
        className="text-sm md:text-lg"
        style={{ scale: coffeeBottomScale }}
      >
        &quot;<b>Bold</b> Robusta
      </motion.p>
    </div>
  </div>
);

// Quality Promise Component
const QualityPromise: React.FC<QualityPromiseProps> = ({ qualityTopOpacity, qualityMainScale, qualityMainY }) => (
  <div className="bg-primary p-4 md:p-8 border-r border-b border-primary md:border-r md:border-b flex items-center justify-center aspect-square overflow-hidden">
    <div className="text-center">
      <motion.p
        className="text-background text-xs md:text-sm mb-1"
        style={{ opacity: qualityTopOpacity }}
      >
        A personal promise of
      </motion.p>
      <motion.p
        className="text-xl md:text-3xl font-serif text-background"
        style={{ scale: qualityMainScale, y: qualityMainY }}
      >
        quality and authentic taste.
      </motion.p>
    </div>
  </div>
);

// Coffee Byne Component
const CoffeeByne: React.FC<CoffeeByneProps> = ({ byneScale, byneImageScale, byneImageY }) => (
  <div className="flex flex-col items-center text-center justify-between bg-background border-b border-primary md:border-l md:border-b aspect-square overflow-hidden min-h-[200px] md:min-h-0">
    <motion.div
      className="flex flex-col gap-1 pt-6 md:pt-10 z-10"
      style={{ scale: byneScale }}
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-primary font-medium">
        Coffee <i>Byne</i>
      </h2>
      <p className="text-sm md:text-base text-primary">From farm to cup.</p>
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
);

// Memorable Experience Component
const MemorableExperience: React.FC<MemorableExperienceProps> = ({ memoryTopY, memoryTopOpacity, memoryBottomY, memoryBottomX }) => (
  <div className="bg-primary p-4 md:p-8 border-b border-primary md:border-b flex flex-col items-center justify-center text-center gap-0 overflow-hidden aspect-square">
    <motion.h3
      className="text-sm md:text-lg text-background"
      style={{ y: memoryTopY, opacity: memoryTopOpacity }}
    >
      Crafting memorable
    </motion.h3>
    <motion.p
      className="text-lg md:text-2xl font-serif text-background"
      style={{ y: memoryBottomY, x: memoryBottomX }}
    >
      experience for a lifetime.
    </motion.p>
  </div>
);

// Byne Coffee Logo Component
const ByneCoffeeLogo: React.FC<ByneCoffeeLogoProps> = ({ logoScale }) => (
  <div className="bg-background p-4 md:p-8 border-b border-primary md:border-b-0 md:border-r flex flex-col items-center justify-center aspect-square overflow-hidden">
    <motion.div
      className="h-2/3 md:h-3/4 w-full relative"
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
);

// Tradition Component
const Tradition: React.FC<TraditionProps> = ({ traditionTextSize, traditionMainSize, traditionImageY, traditionBottomY, traditionBottomOpacity }) => (
  <div className="bg-background p-4 md:p-8 flex flex-col justify-between aspect-square overflow-hidden min-h-[250px] md:min-h-0">
    <div className='flex flex-col items-center text-center -mb-2 md:-mb-3 tracking-tight'>
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
      className="relative bottom-0 w-full h-3/5 md:h-4/5 overflow-hidden"
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
);

// Main Component
const MissionValuesComponent: React.FC = () => {
  const ref = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isMobile ? ["0% end", "150% start"] : ["30% end", "end start"]
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
    <div ref={ref} className="bg-background p-8 md:max-w-7xl mx-auto mt-12">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-serif text-primary text-center mb-12">
        Our mission & values
      </h1>

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-3 gap-0 border border-primary rounded-lg overflow-hidden">

        {/* Row 1 */}
        <VillaBynekere
          villaScale={villaScale}
          villaImageScale={villaImageScale}
          villaImageY={villaImageY}
        />

        <RootedInLegacy
          legacyTextSize={legacyTextSize}
          legacyImageScale={legacyImageScale}
          legacyBottomY={legacyBottomY}
          legacyBottomOpacity={legacyBottomOpacity}
        />

        <ShapedByValues
          valuesTopY={valuesTopY}
          valuesTopOpacity={valuesTopOpacity}
          valuesBottomY={valuesBottomY}
          valuesBottomX={valuesBottomX}
        />

        {/* Row 2 */}
        <CoffeeImage
          coffeeImageScale={coffeeImageScale}
          coffeeImageY={coffeeImageY}
          coffeeTopY={coffeeTopY}
          coffeeTopOpacity={coffeeTopOpacity}
          coffeeBottomScale={coffeeBottomScale}
        />

        <QualityPromise
          qualityTopOpacity={qualityTopOpacity}
          qualityMainScale={qualityMainScale}
          qualityMainY={qualityMainY}
        />

        <CoffeeByne
          byneScale={byneScale}
          byneImageScale={byneImageScale}
          byneImageY={byneImageY}
        />

        {/* Row 3 */}
        <MemorableExperience
          memoryTopY={memoryTopY}
          memoryTopOpacity={memoryTopOpacity}
          memoryBottomY={memoryBottomY}
          memoryBottomX={memoryBottomX}
        />

        <ByneCoffeeLogo logoScale={logoScale} />

        <Tradition
          traditionTextSize={traditionTextSize}
          traditionMainSize={traditionMainSize}
          traditionImageY={traditionImageY}
          traditionBottomY={traditionBottomY}
          traditionBottomOpacity={traditionBottomOpacity}
        />

      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col gap-0 border border-primary rounded-lg overflow-hidden">

        {/* Mobile Row 1: VillaBynekere and ShapedByValues */}
        <div className="grid grid-cols-2 gap-0">
          <VillaBynekere
            villaScale={villaScale}
            villaImageScale={villaImageScale}
            villaImageY={villaImageY}
          />
          <ShapedByValues
            valuesTopY={valuesTopY}
            valuesTopOpacity={valuesTopOpacity}
            valuesBottomY={valuesBottomY}
            valuesBottomX={valuesBottomX}
          />
        </div>

        {/* Mobile Row 2: RootedInLegacy full width */}
        <RootedInLegacy
          legacyTextSize={legacyTextSize}
          legacyImageScale={legacyImageScale}
          legacyBottomY={legacyBottomY}
          legacyBottomOpacity={legacyBottomOpacity}
        />

        {/* Mobile Row 3: CoffeeImage and QualityPromise */}
        <div className="grid grid-cols-2 gap-0">
          <CoffeeImage
            coffeeImageScale={coffeeImageScale}
            coffeeImageY={coffeeImageY}
            coffeeTopY={coffeeTopY}
            coffeeTopOpacity={coffeeTopOpacity}
            coffeeBottomScale={coffeeBottomScale}
          />
          <QualityPromise
            qualityTopOpacity={qualityTopOpacity}
            qualityMainScale={qualityMainScale}
            qualityMainY={qualityMainY}
          />
        </div>

        {/* Mobile Row 4: CoffeeByne full width */}
        <CoffeeByne
          byneScale={byneScale}
          byneImageScale={byneImageScale}
          byneImageY={byneImageY}
        />

        {/* Mobile Row 5: MemorableExperience and ByneCoffeeLogo */}
        <div className="grid grid-cols-2 gap-0">
          <MemorableExperience
            memoryTopY={memoryTopY}
            memoryTopOpacity={memoryTopOpacity}
            memoryBottomY={memoryBottomY}
            memoryBottomX={memoryBottomX}
          />
          <ByneCoffeeLogo logoScale={logoScale} />
        </div>

        {/* Mobile Row 6: Tradition full width */}
        <Tradition
          traditionTextSize={traditionTextSize}
          traditionMainSize={traditionMainSize}
          traditionImageY={traditionImageY}
          traditionBottomY={traditionBottomY}
          traditionBottomOpacity={traditionBottomOpacity}
        />

      </div>
    </div>
  );
};

export default MissionValuesComponent;