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
  comingSoon?: boolean;
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

  const cardWidth = isMobile ? 200 : 380;
  const viewportCenter =
    typeof window !== "undefined" ? window.innerWidth / 2 : 320;
  const cardCenter = isMobile ? 150 : 220;
  const totalScrollDistance = isMobile
    ? (cards.length - 0.5) * cardWidth
    : (cards.length - 1) * cardWidth;
  const offset = cardWidth;

  const scrollScale = isMobile ? 0.9 : 1; // lower = slower
  const adjustedScrollDistance = totalScrollDistance / scrollScale;
  
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [
      viewportCenter - (isMobile ? 0 : cardWidth / 2) + offset,
      viewportCenter - adjustedScrollDistance - (isMobile ? 0 : cardWidth / 2) + offset,
    ]
  );
  
  const pathWidth = isMobile ? 1200 / scrollScale : 2934;
  const pathX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(pathWidth - viewportCenter * 2)]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", latest => {
    const scroll = latest; // normalized 0–1 from useScroll
    const totalDistance = totalScrollDistance; // pixels the cards move
    const scrolledDistance = scroll * totalDistance;

    // compute index by dividing distance scrolled by card width
    const progressPerCard = cardWidth;
    const rawIndex = scrolledDistance / progressPerCard;

    // nearest whole card in view
    const centerIndex = Math.round(rawIndex);
    const clampedIndex = Math.max(0, Math.min(cards.length - 1, centerIndex));

    setActiveIndex(clampedIndex);
  });

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-primary pb-12">
      {/* Fixed beans */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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

      <div className="sticky top-0 flex h-screen flex-col items-start justify-start px-8 overflow-hidden w-full">
        {/* Top text */}
        <div
          className={`max-w-xl relative z-10 ${
            isMobile ? "mt-32 px-4" : "md:mt-10 lg:mt-28 px-4 2xl:max-w-sm"
          }`}
        >
          <p
            className={`text-background ${
              isMobile
                ? "text-4xl leading-tighter "
                : "md:text-3xl lg:text-4xl text-2xl leading-tighter"
            } font-serif`}
          >
            Experience coffee, perfected over decades
          </p>
        </div>

        {/* Path that scrolls with cards */}
        {/* <div className="absolute top-1/3 left-0 w-full overflow-visible z-5">
          <motion.div
            style={{ x: pathX }}
            animate={{ y: [0, -10, 30] }}
            className={`relative w-[${pathWidth}px] h-[325px]`}
          >
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
        </div> */}

        {/* Cards */}
        <motion.div
          className="relative w-full flex justify-center z-10 mt-12 md:mt-8 ml-18 md:-ml-52 2xl:-ml-64 2xl:mt-8"
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
            className={`flex ${
              isMobile ? "gap-10" : "md:gap-16 gap-12"
            } items-center`}
          >
            {cards.map(card => (
              <Card card={card} key={card.id} isMobile={isMobile} />
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom info */}
        <motion.div className="lg:mt-6 mt-12 2xl:mt-16 max-w-xltext-center text-white relative h-20 w-full z-10">
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
      className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6"
    >
      <motion.div
        className="w-full max-w-xs sm:max-w-sm text-start"
        initial={{ scale: 0.95 }}
        animate={{ scale: isActive ? 1 : 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.p
          className="italic text-3xl md:text-xl 2xl:text-3xl font-semibold font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {card.title}
        </motion.p>
        <motion.p
          className="text-lg md:text-sm 2xl:text-lg mt-"
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
  const w = isMobile ? 200 : 300;
  const h = isMobile ? 270 : 360;
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
          filter: card.comingSoon ? "blur(10px)" : "none",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 hover:scale-105"
      />
      {card.comingSoon && (
        <div className="absolute inset-0 bg-white/60 flex items-center text-center justify-center z-10 ">
          <p className="text-2xl font-semibold text-gray-800">Coming<br></br>Soon!</p>
        </div>
      )}
    </motion.div>
  );
};

const cards: CardType[] = [
  {
    url: "/home/brass.jpg",
    title: "Brass filter",
    desc: "South Indian filter coffee 80:20",
    id: 1,
  },
  {
    url: "/home/everyday.jpg",
    title: "Everyday south",
    desc: "South Indian filter coffee 60:40",
    id: 2,
  },
  {
    url: "/home/maland.jpg",
    title: "Malanad reserve",
    desc: "100% Arabica medium dark roast",
    id: 3,
  },
  {
    url: "/home/bloomfield.jpg",
    title: "Bloomfield",
    desc: "100% Arabica light roast",
    id: 4,
  },
  {
    url: "/home/coffee3.jpg",
    title: "Huro signature",
    desc: "House blend",
    id: 5,
    comingSoon: true,
  },
];

export default Example;
