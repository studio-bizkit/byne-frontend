"use client";
import { motion, useTransform, useScroll, useMotionValueEvent } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useIsMobile } from "@/lib/useMediaQuery";

interface CardType {
  url: string;
  title: string;
  desc: string;
  id: number;
}

const Example = () => {
  return (
    <div className="bg-pri relative">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const isMobile = useIsMobile();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Card width including gap
  const cardWidth = isMobile ? 240 : 380; // total horizontal step
  const viewportCenter = typeof window !== "undefined" ? window.innerWidth / 2 : 640;
  const cardCenter = isMobile ? 120 : 220;
  const initialOffset = viewportCenter - cardCenter;
  const totalScrollDistance = (cards.length - 1) * cardWidth;

  // Horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], [initialOffset, initialOffset - totalScrollDistance]);

  // Active index
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.round(latest * (cards.length - 1));
    setActiveIndex(index);
  });

  return (
    <section ref={targetRef} className="relative md:h-[300vh] h-[60vh] bg-primary pb-36">
      {/* Background beans */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Coffee beans scattered */}
        <Image
          src="/bean-white.svg"
          alt="bean"
          width={isMobile ? 24 : 40}
          height={isMobile ? 24 : 40}
          className="absolute top-16 left-6 opacity-40"
        />
        <Image
          src="/bean-white.svg"
          alt="bean"
          width={isMobile ? 40 : 70}
          height={isMobile ? 40 : 70}
          className="absolute top-1/3 left-1/4 opacity-30"
        />
        <Image
          src="/bean-white.svg"
          alt="bean"
          width={isMobile ? 28 : 40}
          height={isMobile ? 28 : 40}
          className="absolute top-1/2 right-10 opacity-50"
        />
        <Image
          src="/bean-white.svg"
          alt="bean"
          width={isMobile ? 36 : 60}
          height={isMobile ? 36 : 60}
          className="absolute bottom-28 left-1/3 opacity-40"
        />
        <Image
          src="/bean-white.svg"
          alt="bean"
          width={isMobile ? 50 : 80}
          height={isMobile ? 50 : 80}
          className="absolute bottom-10 right-1/4 opacity-30"
        />

        {/* Overlay path at half height */}
        <div className="absolute top-1/2 left-0 w-full">
          <Image
            src="/bgoveralaypath.svg"
            alt="path"
            width={1920}
            height={200}
            className="w-full object-cover opacity-50"
          />
        </div>
      </div>

      <div className="sticky top-0 flex h-screen flex-col items-end justify-start px-8 overflow-hidden w-full">
        {/* Top text */}
        <div className="w-full text-left mt-32 relative z-10">
          <p className="max-w-md text-background md:text-2xl text-lg leading-tight px-6 text-left font-serif">
            Our products are made of 100% good quality materials, lorem ipsum byne is best lorem ipsum hello hello
            hello.
          </p>
        </div>

        {/* Horizontal scroll cards */}
        <div className="relative w-full flex justify-center z-10 mt-10">
          <motion.div style={{ x }} className="flex md:gap-24 gap-12 items-center">
            {cards.map((card) => (
              <Card card={card} key={card.id} />
            ))}
          </motion.div>
        </div>

        {/* Bottom Info */}
        <motion.div className="mt-10 text-center text-white relative h-20 w-full z-10">
          {cards.map((card, i) => (
            <BottomInfo key={card.id} card={card} index={i} activeIndex={activeIndex} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const BottomInfo = ({ card, index, activeIndex }: { card: CardType; index: number; activeIndex: number }) => {
  const isActive = index === activeIndex;

  return (
    <motion.div
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      <div className="max-w-sm w-xs text-start">
        <p className="italic text-xl font-semibold font-serif">{card.title}</p>
        <p className="text-sm">{card.desc}</p>
      </div>
    </motion.div>
  );
};


const Card = ({ card }: { card: CardType }) => {
  // Fixed random rotation
  const rotation = useMemo(() => {
    const tilt = Math.random() * 10 - 5; // -5° to +5°
    return `${tilt}deg`;
  }, []);

  // Random floating parameters
  const { offset, duration, delay } = useMemo(() => {
    return {
      offset: Math.random() * 8 + 5, // 5–13px vertical float
      duration: Math.random() * 2 + 2, // 2–4s cycle
      delay: Math.random() * 2, // stagger start
    };
  }, []);

  return (
    <motion.div
      className="relative md:h-[350px] md:w-[300px] h-[250px] w-[200px] rounded-xl overflow-hidden bg-background shadow-xl group flex-shrink-0"
      style={{ rotate: rotation }}
      animate={{ y: [0, -offset, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-105"
      />
    </motion.div>
  );
};


const cards: CardType[] = [
  {
    url: "/imgs/coffee/1.jpg",
    title: "Coffee Powder",
    desc: "Premium coffee powder from the hills of Coorg. 100% Quality.",
    id: 1,
  },
  {
    url: "/imgs/coffee/2.jpg",
    title: "Espresso Blend",
    desc: "Rich and bold blend crafted for espresso lovers.",
    id: 2,
  },
  { url: "/imgs/coffee/3.jpg", title: "Arabica Beans", desc: "Single-origin Arabica beans with smooth flavor.", id: 3 },
  { url: "/imgs/coffee/4.jpg", title: "Filter Coffee", desc: "Traditional South Indian filter coffee taste.", id: 4 },
];

export default Example;
