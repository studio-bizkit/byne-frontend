"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface CardType {
  id: number;
  title: string;
  logo: string;
}

const ScrollRevealCards = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const sectionHeight = 300;
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const transform0 = {
    x: useTransform(
      scrollYProgress,
      [0 / cards.length, 1 / cards.length],
      ["150%", `${0 * 60}px`]
    ),
    y: useTransform(
      scrollYProgress,
      [0 / cards.length, 1 / cards.length],
      ["600vh", `${0 * 60 - 200}px`]
    ),
  };

  const transform1 = {
    x: useTransform(
      scrollYProgress,
      [1 / cards.length, 3 / cards.length],
      ["150%", `${1 * 60}px`]
    ),
    y: useTransform(
      scrollYProgress,
      [1 / cards.length, 2 / cards.length],
      ["600vh", `${1 * 60 - 200}px`]
    ),
  };

  const transform2 = {
    x: useTransform(
      scrollYProgress,
      [2 / cards.length, 3 / cards.length],
      ["150%", `${2 * 60}px`]
    ),
    y: useTransform(
      scrollYProgress,
      [2 / cards.length, 3 / cards.length],
      ["600vh", `${2 * 60 - 200}px`]
    ),
  };

  const transform3 = {
    x: useTransform(
      scrollYProgress,
      [3 / cards.length, 4 / cards.length],
      ["150%", `${3 * 60}px`]
    ),
    y: useTransform(
      scrollYProgress,
      [3 / cards.length, 4 / cards.length],
      ["600vh", `${3 * 60 - 200}px`]
    ),
  };

  const transform4 = {
    x: useTransform(
      scrollYProgress,
      [4 / cards.length, 1],
      ["150%", `${4 * 60}px`]
    ),
    y: useTransform(
      scrollYProgress,
      [4 / cards.length, 1],
      ["600vh", `${4 * 60 - 200}px`]
    ),
  };

  const transforms = [
    transform0,
    transform1,
    transform2,
    transform3,
    transform4,
  ];

  return (
    <section ref={targetRef} className={`relative h-[${sectionHeight}vh]`}>

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden md:overflow-hidden">
        {/* Top Text */}
        <div className="px-6 max-w-md text-primary text-3xl md:text-3xl font-serif z-10 mt-28 md:mt-24 ">
          Where our coffee travels.
        </div>
        <div className="px-6 max-w-xs md:max-w-xl text-primary text-sm md:text-md text-center z-10">
          From the hills of Chikmagalur to the world, crafted to perfection.
        </div>

        {/* Cards Row */}
        <div className="relative flex flex-row items-center justify-center w-full h-full ml-18 md:mt-24 mt-12">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              style={{
                y: transforms[i].y,
                zIndex: i,
              }}
              className={`relative w-[130px] h-[150px] 2xl:w-[230px] 2xl:h-[267px] md:w-[156px] md:h-[180px] 2xl:-ml-24 -ml-18 rounded-sm overflow-hidden flex-shrink-0  ${"z-" + i
                } 
            `}
            >
              {/* Background gradient */}
              <Image
                src="/gradient-card-bg.png"
                alt="Card background"
                fill
                className="object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-background to-transparent pointer-events-none opacity-50" />

              {/* Brand Logo - Centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={card.logo}
                  alt={card.title}
                  width={80}
                  height={80}
                  className="w-16 h-16 md:w-20 md:h-20 2xl:w-32 2xl:h-32 object-contain opacity-85"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const cards: CardType[] = [
  {
    id: 1,
    title: "Blue Tokai",
    logo: "/home/product-brand-1.svg",
  },
  {
    id: 2,
    title: "Gardeli Roasters",
    logo: "/home/product-brand-2.svg",
  },
  {
    id: 3,
    title: "Covoya Cofee",
    logo: "/home/product-brand-3.svg",
  },
  {
    id: 4,
    title: "Olam Intl",
    logo: "/home/product-brand-4.svg",
  },
  {
    id: 5,
    title: "Hawker",
    logo: "/home/product-brand-5.svg",
  },
];

export default ScrollRevealCards;
