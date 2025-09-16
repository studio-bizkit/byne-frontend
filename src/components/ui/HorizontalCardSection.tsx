"use client";
import { motion, useTransform, useScroll, MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import Image from "next/image";

interface CardType {
  url: string;
  title: string;
  desc: string;
  id: number;
}

const Example = () => {
  return (
    <div className="bg-[#001f9f] relative">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Card width including gap
  const cardWidth = 335; // 300px width + 10px gap
  const viewportCenter = typeof window !== "undefined" ? window.innerWidth / 2 : 640;
  const cardCenter = 150;
  const initialOffset = viewportCenter - cardCenter;
  const totalScrollDistance = (cards.length - 1) * cardWidth;

  // Horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], [initialOffset, initialOffset - totalScrollDistance]);

  // Active index
  const activeIndex = useTransform(
    scrollYProgress,
    cards.map((_, i) => i / (cards.length - 1)),
    cards.map((_, i) => i)
  );

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-primary">
      {/* Background beans */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Coffee beans scattered */}
        <Image src="/bean-white.svg" alt="bean" width={60} height={60} className="absolute top-20 left-10 opacity-40" />
        <Image
          src="/bean-white.svg"
          alt="bean"
          width={90}
          height={90}
          className="absolute top-1/3 left-1/4 opacity-30"
        />
        <Image
          src="/bean-white.svg"
          alt="bean"
          width={50}
          height={50}
          className="absolute top-1/2 right-20 opacity-50"
        />
        <Image
          src="/bean-white.svg"
          alt="bean"
          width={70}
          height={70}
          className="absolute bottom-32 left-1/3 opacity-40"
        />
        <Image
          src="/bean-white.svg"
          alt="bean"
          width={100}
          height={100}
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
          <p className="max-w-md text-background text-lg leading-relaxed px-6 text-left">
            Our products are made of 100% good quality materials, lorem ipsum byne is best lorem ipsum hello hello
            hello.
          </p>
        </div>

        {/* Horizontal scroll cards */}
        <div className="relative w-full flex justify-center z-10 mt-10">
          <motion.div style={{ x }} className="flex gap-24 items-center">
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

const BottomInfo = ({
  card,
  index,
  activeIndex,
}: {
  card: CardType;
  index: number;
  activeIndex: MotionValue<number>;
}) => {
  const opacity = useTransform(activeIndex, [index - 0.3, index, index + 0.3], [0, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center">
      <p className="italic text-xl font-semibold mb-2">{card.title}</p>
      <p className="text-sm text-gray-200">{card.desc}</p>
    </motion.div>
  );
};

const Card = ({ card }: { card: CardType }) => {
  // Pick a random small rotation between -5deg and +5deg, fixed per card
  const rotation = useMemo(() => {
    const tilt = Math.random() * 10 - 5; // -5 to +5
    return `${tilt}deg`;
  }, []);

  return (
    <div
      className="relative h-[450px] w-[300px] rounded-xl overflow-hidden bg-background shadow-xl group flex-shrink-0"
      style={{ transform: `rotate(${rotation})` }}
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-105"
      />
    </div>
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
