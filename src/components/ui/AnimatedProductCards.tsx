"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useIsMobile } from "@/lib/useMediaQuery";

interface CardType {
  id: number;
  title: string;
  country: string;
  feel: string;
  ingredients: string;
  image: string;
  ratings: {
    sweetness: number;
    acidity: number;
    bitterness: number;
    body: number;
  };
}

const AnimatedProductCards = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const isMobile = useIsMobile();

  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  // Track viewport width to scale transforms responsively based on a 1524px baseline
  const [viewportWidth, setViewportWidth] = useState<number>(1524);
  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Compute a clamped scale factor so motion distances adapt to any width
  const scale = useMemo(() => {
    const raw = viewportWidth / 1524;
    return Math.min(Math.max(raw, 0.6), 1.6);
  }, [viewportWidth]);

  // Base distances scaled to viewport
  const xLarge = 500 * scale;
  const xMedium = 250 * scale;
  const yDown = 100 * scale;

  const handleCardClick = (cardId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) newSet.delete(cardId);
      else newSet.add(cardId);
      return newSet;
    });
  };

  // Precompute transforms individually
  const transform0 = {
    x: useTransform(scrollYProgress, [0.0, 0.4], [0, -xLarge]),
    y: useTransform(scrollYProgress, [0.0, 0.4], [0, Math.sin(0 * 0.5) * 20]),
    rotate: useTransform(scrollYProgress, [0.0, 0.4], [0, -8]),
  };

  const transform1 = {
    x: useTransform(scrollYProgress, [0.16, 0.56], [0, 0]),
    y: useTransform(scrollYProgress, [0.0, 0.4], [0, Math.sin(0 * 0.5) * 20]),
    rotate: useTransform(scrollYProgress, [0.16, 0.56], [0, 0]),
  };

  const transform2 = {
    x: useTransform(scrollYProgress, [0.32, 0.72], [0, xLarge]),
    y: useTransform(scrollYProgress, [0.0, 0.4], [0, Math.sin(0 * 0.5) * 20]),
    rotate: useTransform(scrollYProgress, [0.32, 0.72], [0, 8]),
  };

  const transform3 = {
    x: useTransform(scrollYProgress, [0.0, 0.4], [0, -xMedium]),
    y: useTransform(scrollYProgress, [0.0, 0.4], [0, yDown]),
    rotate: useTransform(scrollYProgress, [0.0, 0.4], [-8, 0]),
  };

  const transform4 = {
    x: useTransform(scrollYProgress, [0.32, 0.72], [0, xMedium]),
    y: useTransform(scrollYProgress, [0.0, 0.4], [0, yDown]),
    rotate: useTransform(scrollYProgress, [0.32, 0.72], [8, 0]),
  };

  const mtransform0 = {
    x: useTransform(scrollYProgress, [0.0, 0.4], [0, 0]),
    y: useTransform(scrollYProgress, [0.0, 0.4], [200, 0]),
    rotate: useTransform(scrollYProgress, [0.0, 0.4], [0, -4]),
  };

  const mtransform1 = {
    x: useTransform(scrollYProgress, [0.16, 0.56], [0, 0]),
    y: useTransform(scrollYProgress, [0.16, 0.56], [400, 130]),
    rotate: useTransform(scrollYProgress, [0.0, 0.4], [0, 4]),
  };

  const mtransform2 = {
    x: useTransform(scrollYProgress, [0.32, 0.72], [0, 0]),
    y: useTransform(scrollYProgress, [0.16, 0.56], [600, 130 * 2]),
    rotate: useTransform(scrollYProgress, [0.32, 0.72], [0, -2]),
  };

  const mtransform3 = {
    x: useTransform(scrollYProgress, [0.0, 0.4], [0, 0]),
    y: useTransform(scrollYProgress, [0.16, 0.56], [800, 130 * 3]),
    rotate: useTransform(scrollYProgress, [0.0, 0.4], [0, -8]),
  };

  const mtransform4 = {
    x: useTransform(scrollYProgress, [0.32, 0.72], [0, 0]),
    y: useTransform(scrollYProgress, [0.16, 0.56], [1000, 130 * 4]),
    rotate: useTransform(scrollYProgress, [0.32, 0.72], [0, 3]),
  };

  const transforms = isMobile
    ? [mtransform0, mtransform1, mtransform2, mtransform3, mtransform4]
    : [transform0, transform1, transform2, transform3, transform4];

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] mt-36 overflow-visible"
    >
      <div className="sticky top-12 h-screen flex flex-col items-center justify-center overflow-visible">
        <motion.div className="text-center px-6 z-10 pt-10 pb-10">
          <div className="max-w-md text-primary text-3xl md:text-5xl font-serif">
            Our Products
          </div>
        </motion.div>

        <div className="relative flex items-start justify-center w-full h-full">
          {cards.map((card, index) => {
            const isFlipped = flippedCards.has(card.id);
            const { x, y, rotate } = transforms[index];

            return (
              <motion.div
                key={card.id}
                className={`absolute cursor-pointer ${
                  index === 3 || index === 4 ? "z-10" : ""
                }`}
                style={{ 
                  x, 
                  y, 
                  rotate, 
                  zIndex: cards.length - index,
                  transformStyle: "preserve-3d",
                  perspective: 1000
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  },
                  zIndex: 10,
                }}
                onHoverStart={() => handleCardClick(card.id)}
                onHoverEnd={() => handleCardClick(card.id)}
              >
                <motion.div
                  className="w-[250px] h-[120px] md:w-[300px] md:h-[450px] relative shadow-[-12px_-3px_14.6px_0px_rgba(0,_0,_0,_0.2)] md:rounded-lg rounded-md border border-primary/20"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 1
                  }}
                  style={{ 
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 w-full h-full md:rounded-lg rounded-md overflow-hidden bg-primary text-background flex flex-row md:flex-col justify-between"
                    style={{ 
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden"
                    }}
                  >
                    <div className="absolute top-0 bottom-0 h-fit bg-background text-primary text-[8px] md:text-xs font-medium px-2 py-1 rounded-br-sm z-10 flex gap-2">
                      <Image
                        src={"/bean.svg"}
                        alt={"bean"}
                        height={isMobile ? 8 : 10}
                        width={isMobile ? 8 : 10}
                      />
                      Omni Roast
                    </div>

                    <div className="relative w-2/3 md:w-full h-full md:h-2/3 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="h-full flex flex-col justify-between md:h-1/3 bottom-0 w-full bg-background text-primary p-3 md:px-3 md:py-4 gap-1 md:gap-0">
                      <div>
                        <div className="text-[14px] md:text-2xl font-serif">
                          {card.title}
                        </div>
                        <div className="text-[10px] md:text-sm">
                          Country of origin:{" "}
                          <span className="font-semibold">{card.country}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex md:flex-row flex-col justify-between md:mt-2">
                          <span className="text-[10px] md:text-xs">FEEL:</span>
                          <span className="text-[8px] md:text-xs">
                            {card.feel}
                          </span>
                        </div>
                        <div className="flex md:flex-row flex-col justify-between mt-1 gap-0">
                          <span className="text-[10px] md:text-xs">
                            INGREDIENTS:
                          </span>
                          <span className="text-[8px] md:text-xs">
                            {card.ingredients}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 w-full h-full md:rounded-lg rounded-md overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="bg-primary text-background h-2/3 p-4 md:p-6 flex flex-col justify-center">
                      <div className="font-serif text-lg md:text-xl mb-4">
                        Huro Index
                      </div>

                      {[
                        { label: "Sweetness", value: card.ratings.sweetness },
                        { label: "Acidity", value: card.ratings.acidity },
                        { label: "Bitterness", value: card.ratings.bitterness },
                        { label: "Body", value: card.ratings.body },
                      ].map(({ label, value }) => (
                        <div key={label} className="mb-3">
                          <div className="text-xs md:text-sm mb-1">{label}</div>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(i => (
                              <div
                                key={i}
                                className={`h-2 w-8 md:w-10 rounded-sm ${
                                  i <= value
                                    ? "bg-background/80"
                                    : "bg-background/20"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="absolute flex flex-col justify-between h-1/3 bottom-0 w-full bg-background text-primary p-3 md:px-3 md:py-4">
                      <div>
                        <div className="text-xl md:text-2xl font-serif">
                          {card.title}
                        </div>
                        <div className="text-xs md:text-sm">
                          Country of origin:{" "}
                          <span className="font-semibold">{card.country}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs md:text-xs">FEEL:</span>
                          <span className="text-xs md:text-xs">
                            {card.feel}
                          </span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs md:text-xs">
                            INGREDIENTS:
                          </span>
                          <span className="text-xs md:text-xs">
                            {card.ingredients}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const cards: CardType[] = [
  {
    id: 1,
    title: "Brass Filter",
    country: "India",
    feel: "Strong & Aromatic",
    ingredients: "South Indian Filter Coffee 80:20",
    image: "/products/1.png",
    ratings: { sweetness: 3, acidity: 2, bitterness: 4, body: 5 },
  },
  {
    id: 2,
    title: "Everyday South",
    country: "India",
    feel: "Smooth & Traditional",
    ingredients: "South Indian Filter Coffee 60:40",
    image: "/products/1.png",
    ratings: { sweetness: 4, acidity: 2, bitterness: 3, body: 4 },
  },
  {
    id: 3,
    title: "Malanad Reserve",
    country: "India",
    feel: "Bold & Balanced",
    ingredients: "100% Arabica Medium Dark Roast",
    image: "/products/1.png",
    ratings: { sweetness: 4, acidity: 3, bitterness: 3, body: 5 },
  },
  {
    id: 4,
    title: "Bloomfield",
    country: "India",
    feel: "Bright & Fruity",
    ingredients: "100% Arabica Light Roast",
    image: "/products/1.png",
    ratings: { sweetness: 5, acidity: 4, bitterness: 2, body: 4 },
  },
  {
    id: 5,
    title: "Huro Signature",
    country: "India",
    feel: "Rich & Smooth",
    ingredients: "House Blend",
    image: "/products/1.png",
    ratings: { sweetness: 4, acidity: 3, bitterness: 3, body: 5 },
  },
];

export default AnimatedProductCards;