"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
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
  const isMobile = useIsMobile();

  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const handleCardClick = (cardId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) newSet.delete(cardId);
      else newSet.add(cardId);
      return newSet;
    });
  };

  if (isMobile) {
    return <MobileProductCards cards={cards} flippedCards={flippedCards} onCardClick={handleCardClick} />;
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] mt-36 overflow-visible"
    >
      <div className=" h-screen flex flex-col items-center justify-center overflow-visible">
        <motion.div className="text-center px-6 z-10 pt-10 pb-10">
          <div className="max-w-md text-primary text-3xl md:text-5xl font-serif">
            Our Products
          </div>
        </motion.div>

        {/* 3x2 Grid Layout */}
        <div className="grid grid-cols-3 grid-rows-2 gap-8 w-full max-w-6xl px-8">
          {cards.map((card) => {
            const isFlipped = flippedCards.has(card.id);

            return (
              <motion.div
                key={card.id}
                className="relative cursor-pointer"
                style={{ 
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
                }}
                onClick={() => handleCardClick(card.id)}
              >
                <motion.div
                  className="w-full h-[400px] relative shadow-[-12px_-3px_14.6px_0px_rgba(0,_0,_0,_0.2)] rounded-lg border border-primary/20"
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
                    className="absolute inset-0 w-full h-full rounded-lg overflow-hidden bg-primary text-background flex flex-col justify-between"
                    style={{ 
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden"
                    }}
                  >
                    <div className="absolute top-0 right-0 h-fit bg-background text-primary text-xs font-medium px-2 py-1 rounded-bl-sm z-10 flex gap-2">
                      <Image
                        src={"/bean.svg"}
                        alt={"bean"}
                        height={10}
                        width={10}
                      />
                      Omni Roast
                    </div>

                    <div className="relative w-full h-2/3 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="h-1/3 bottom-0 w-full bg-background text-primary p-4 flex flex-col justify-between">
                      <div>
                        <div className="text-2xl font-serif">
                          {card.title}
                        </div>
                        <div className="text-sm">
                          Country of origin:{" "}
                          <span className="font-semibold">{card.country}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs">FEEL:</span>
                          <span className="text-xs">
                            {card.feel}
                          </span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs">
                            INGREDIENTS:
                          </span>
                          <span className="text-xs">
                            {card.ingredients}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-lg overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="bg-primary text-background h-2/3 p-6 flex flex-col justify-center">
                      <div className="font-serif text-xl mb-4">
                        Huro Index
                      </div>

                      {[
                        { label: "Sweetness", value: card.ratings.sweetness },
                        { label: "Acidity", value: card.ratings.acidity },
                        { label: "Bitterness", value: card.ratings.bitterness },
                        { label: "Body", value: card.ratings.body },
                      ].map(({ label, value }) => (
                        <div key={label} className="mb-3">
                          <div className="text-sm mb-1">{label}</div>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(i => (
                              <div
                                key={i}
                                className={`h-2 w-10 rounded-sm ${
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

                    <div className="absolute flex flex-col justify-between h-1/3 bottom-0 w-full bg-background text-primary p-4">
                      <div>
                        <div className="text-2xl font-serif">
                          {card.title}
                        </div>
                        <div className="text-sm">
                          Country of origin:{" "}
                          <span className="font-semibold">{card.country}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs">FEEL:</span>
                          <span className="text-xs">
                            {card.feel}
                          </span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs">
                            INGREDIENTS:
                          </span>
                          <span className="text-xs">
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

// Mobile Component similar to HorizontalCardSection
const MobileProductCards = ({ 
  cards, 
  flippedCards, 
  onCardClick 
}: { 
  cards: CardType[]; 
  flippedCards: Set<number>; 
  onCardClick: (id: number) => void; 
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const cardWidth = 300;
  const gap = 40; // gap between cards
  const viewportCenter = typeof window !== "undefined" ? window.innerWidth / 2 : 320;
  const cardCenter = cardWidth / 2;
  
  // Calculate total width needed for all cards
  const totalCardsWidth = (cards.length * cardWidth) + ((cards.length - 1) * gap);
  
  // Start position: first card centered
  const startX = viewportCenter - cardCenter;
  
  // End position: last card centered
  const endX = viewportCenter - cardCenter - (totalCardsWidth - cardWidth);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [startX, endX]
  );

  return (
    <section ref={targetRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen flex-col items-start justify-start px-8 overflow-hidden w-full">
        {/* Top text - centered */}
        <div className="relative z-10 mt-24 flex justify-center w-full flex-col">
          <p className="text-primary text-5xl leading-snug font-serif text-center">
            Our Products
          </p>
          <p className="text-primary text-lg leading-snug font-serif text-center">
            click to flip em.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          className="relative w-full flex justify-start z-10 mt-12 -ml-12"
          animate={{ y: [0, -10, 30] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <motion.div
            style={{ x, gap: `${gap}px` }}
            className="flex items-center"
          >
            {cards.map(card => (
              <MobileCard 
                card={card} 
                key={card.id} 
                isFlipped={flippedCards.has(card.id)}
                onCardClick={onCardClick}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Mobile Card Component with flip functionality
const MobileCard = ({ 
  card, 
  isFlipped, 
  onCardClick 
}: { 
  card: CardType; 
  isFlipped: boolean; 
  onCardClick: (id: number) => void; 
}) => {
  const w = 300;
  const h = 450;
  
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden bg-background shadow-xl flex-shrink-0 cursor-pointer"
      style={{ 
        width: w, 
        height: h,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      onClick={() => onCardClick(card.id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 1
      }}
    >
      <div
        className="w-full h-full relative"
        style={{ 
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl overflow-hidden bg-primary text-background flex flex-col justify-between"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <div className="absolute top-0 right-0 h-fit bg-background text-primary text-xs font-medium px-2 py-1 rounded-bl-sm z-10 flex gap-2">
            <Image
              src={"/bean.svg"}
              alt={"bean"}
              height={10}
              width={10}
            />
            Omni Roast
          </div>

          <div className="relative w-full h-2/3 overflow-hidden">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="h-1/3 bottom-0 w-full bg-background text-primary p-4 flex flex-col justify-between">
            <div>
              <div className="text-lg font-serif">
                {card.title}
              </div>
              <div className="text-sm">
                Country of origin:{" "}
                <span className="font-semibold">{card.country}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mt-2">
                <span className="text-sm">FEEL:</span>
                <span className="text-xs">
                  {card.feel}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-sm">
                  INGREDIENTS:
                </span>
                <span className="text-xs">
                  {card.ingredients}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl overflow-hidden bg-red-500"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="bg-primary text-background h-2/3 p-6 flex flex-col justify-center">
            <div className="font-serif text-xl mb-4">
              Huro Index
            </div>

            {[
              { label: "Sweetness", value: card.ratings.sweetness },
              { label: "Acidity", value: card.ratings.acidity },
              { label: "Bitterness", value: card.ratings.bitterness },
              { label: "Body", value: card.ratings.body },
            ].map(({ label, value }) => (
              <div key={label} className="mb-3">
                <div className="text-sm mb-1">{label}</div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div
                      key={i}
                      className={`h-2 w-10 rounded-sm ${
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

          <div className="absolute flex flex-col justify-between h-1/3 bottom-0 w-full bg-background text-primary p-4">
            <div>
              <div className="text-2xl font-serif">
                {card.title}
              </div>
              <div className="text-sm">
                Country of origin:{" "}
                <span className="font-semibold">{card.country}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mt-2">
                <span className="text-xs">FEEL:</span>
                <span className="text-xs">
                  {card.feel}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs">
                  INGREDIENTS:
                </span>
                <span className="text-xs">
                  {card.ingredients}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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
  {
    id: 6,
    title: "Wholesale",
    country: "India",
    feel: "Premium & Versatile",
    ingredients: "Custom Blend for Bulk Orders",
    image: "/products/1.png",
    ratings: { sweetness: 4, acidity: 3, bitterness: 3, body: 4 },
  },
];

export default AnimatedProductCards;