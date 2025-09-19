"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useMemo, useRef } from "react";
// import Image from "next/image";
import { useIsMobile } from "@/lib/useMediaQuery";

interface CardType {
  url: string;
  title: string;
  desc: string;
  id: number;
}

const CoffeeCarousel = () => {
  return (
    <div className="bg-background relative">
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

  const cardWidth = isMobile ? 240 : 380;
  const viewportCenter = typeof window !== "undefined" ? window.innerWidth / 2 : 640;
  const cardCenter = isMobile ? 120 : 220;
  const initialOffset = viewportCenter - cardCenter;
  const totalScrollDistance = (cards.length - 1) * cardWidth;

  const x = useTransform(scrollYProgress, [0, 1], [initialOffset, initialOffset - totalScrollDistance]);

  return (
    <section ref={targetRef} className="relative md:h-[300vh] h-[60vh] bg-background pb-12">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-start px-8 overflow-hidden w-full">
        {/* Top text */}
        <div className="w-full text-center mt-24 relative z-10">
          <p className="max-w-full text-primary md:text-5xl text-lg leading-tight px-6 text-center font-serif">
            What We Craft
          </p>
        </div>

        {/* Horizontal scroll cards */}
        <motion.div
          className="relative w-full flex justify-center z-10 mt-10"
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <motion.div style={{ x }} className="flex md:gap-4 gap-12 items-center">
            {cards.map((card) => (
              <Card card={card} key={card.id} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  const { duration, delay } = useMemo(() => {
    return {
      offset: Math.random() * 8 + 5,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 2,
    };
  }, []);

  return (
    <motion.div
      className="relative md:h-[500px] md:w-[350px] h-[250px] w-[200px] overflow-hidden bg-background group flex-shrink-0"
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
    url: "/coffee/1.png",
    title: "Coffee Powder",
    desc: "Premium coffee powder from the hills of Coorg. 100% Quality.",
    id: 1,
  },
  {
    url: "/coffee/2.png",
    title: "Espresso Blend",
    desc: "Rich and bold blend crafted for espresso lovers.",
    id: 2,
  },
  {
    url: "/coffee/3.png",
    title: "Arabica Beans", desc: "Single-origin Arabica beans with smooth flavor.", id: 3
  },
  {
    url: "/coffee/1.png",
    title: "Filter Coffee", desc: "Traditional South Indian filter coffee taste.", id: 4
  },
];

export default CoffeeCarousel;