"use client";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
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
  const { scrollYProgress } = useScroll({ target: targetRef });

  const cardWidth = isMobile ? 180 : 380;
  const viewportCenter =
    typeof window !== "undefined" ? window.innerWidth / 2 : 320;
  const cardCenter = isMobile ? 90 : 220;
  const totalScrollDistance = (cards.length - 1) * cardWidth;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [viewportCenter - cardCenter, viewportCenter - cardCenter - totalScrollDistance]
  );

  // Path moves across its full width while cards scroll
  const pathWidth = isMobile ? 1200 : 2934;
  const pathX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(pathWidth - viewportCenter * 2)]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", latest => {
    const progress = latest * (cards.length - 1);
    const centerIndex = Math.round(progress);
    const distanceFromCenter = Math.abs(progress - centerIndex);
    if (distanceFromCenter < 0.3) setActiveIndex(centerIndex);
  });

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-primary pb-12">
      {/* Fixed beans */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
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
      </div>

      <div className="sticky top-0 flex h-screen flex-col items-end justify-start px-8 overflow-hidden w-full">
        {/* Top text */}
        <div className={`w-full mt-${isMobile ? "20" : "32"} relative z-10 ${isMobile ? "px-4" : "px-6"}`}>
          <p
            className={`text-background ${isMobile ? "text-base leading-snug" : "md:text-2xl text-lg leading-tight"} font-serif`}
          >
            Our products are made of 100% good quality materials, lorem ipsum
            byne is best lorem ipsum hello hello hello.
          </p>
        </div>

        {/* Path that scrolls with cards */}
        <div className="absolute top-1/3 left-0 w-full overflow-hidden z-5">
          <motion.div style={{ x: pathX }} className={`relative w-[${pathWidth}px] h-[325px]`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={pathWidth}
              height="325"
              viewBox={`0 0 ${pathWidth} 325`}
              fill="none"
              className={`w-[${pathWidth}px] h-[325px]`}
            >
              <path
                d="M1 203.764C127.5 101.931 447.4 -40.6358 715 203.764C982.6 448.164 1328.17 259.931 1467.5 135.265"
                stroke="#F5E6D3"
                strokeWidth="3"
              />
              <path
                d="M1466 136.946C1592.5 35.1125 1912.4 -107.454 2180 136.946C2447.6 381.346 2793.17 193.113 2932.5 68.4463"
                stroke="#F5E6D3"
                strokeWidth="3"
              />
            </svg>
          </motion.div>
        </div>

        {/* Cards */}
        <motion.div
          className="relative w-full flex justify-center z-10 mt-10"
          animate={{ y: [0, -10, 30] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <motion.div
            style={{ x }}
            className={`flex ${isMobile ? "gap-6" : "md:gap-24 gap-12"} items-center`}
          >
            {cards.map(card => (
              <Card card={card} key={card.id} isMobile={isMobile} />
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom info */}
        <motion.div className="mt-10 text-center text-white relative h-20 w-full z-10">
          {cards.map((card, i) => (
            <BottomInfo
              key={card.id}
              card={card}
              index={i}
              activeIndex={activeIndex}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const BottomInfo = ({
  card,
  index,
  activeIndex,
}: {
  card: CardType;
  index: number;
  activeIndex: number;
}) => {
  const isActive = index === activeIndex;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      <motion.div
        className="max-w-sm w-xs text-start"
        initial={{ scale: 0.95 }}
        animate={{ scale: isActive ? 1 : 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.p
          className="italic text-xl font-semibold font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {card.title}
        </motion.p>
        <motion.p
          className="text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {card.desc}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const Card = ({ card, isMobile }: { card: CardType; isMobile: boolean }) => {
  const rotation = useMemo(() => `${Math.random() * 10 - 5}deg`, []);
  const { offset, duration, delay } = useMemo(
    () => ({
      offset: Math.random() * 8 + 5,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 2,
    }),
    []
  );
  const w = isMobile ? 180 : 300;
  const h = isMobile ? 250 : 350;
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden bg-background shadow-xl flex-shrink-0"
      style={{ rotate: rotation, width: w, height: h }}
      animate={{ y: [0, -offset, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 hover:scale-105"
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
  {
    url: "/imgs/coffee/3.jpg",
    title: "Arabica Beans",
    desc: "Single-origin Arabica beans with smooth flavor.",
    id: 3,
  },
  {
    url: "/imgs/coffee/4.jpg",
    title: "Filter Coffee",
    desc: "Traditional South Indian filter coffee taste.",
    id: 4,
  },
];

export default Example;