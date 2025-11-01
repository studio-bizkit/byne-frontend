"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

interface HomestayImage {
  id: number;
  src: string;
  title?: string;
  subtitle?: string;
  width: number;
  height: number;
}

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      // Reset position before sending to back
      x.set(0);
      y.set(0);
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  images: HomestayImage[];
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  animationConfig?: { stiffness: number; damping: number };
}

export default function Stack({
  images,
  randomRotation = false,
  sensitivity = 50,
  cardDimensions = { width: 260, height: 380 },
  sendToBackOnClick = true,
  animationConfig = { stiffness: 260, damping: 20 },
}: StackProps) {
  const initialCards = useMemo(
    () =>
      images.map(img => ({
        id: img.id,
        img: img.src,
        title: img.title,
        subtitle: img.subtitle,
      })),
    [images]
  );

  const [cards, setCards] = useState(initialCards);

  const sendToBack = (id: number) => {
    setCards(prev => {
      const newCards = [...prev];
      const index = newCards.findIndex(card => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] mt-36">
      <div
        className="relative"
        style={{
          width: cardDimensions.width,
          height: cardDimensions.height,
          perspective: 600,
        }}
      >
        {cards.map(card => {
          const cardIndex = cards.findIndex(c => c.id === card.id);
          const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

          return (
            <CardRotate
              key={card.id}
              onSendToBack={() => sendToBack(card.id)}
              sensitivity={sensitivity}
            >
              <motion.div
                className="bg-white px-4 py-6 shadow-lg overflow-hidden border border-gray-200 cursor-pointer"
                onClick={() => sendToBackOnClick && sendToBack(card.id)}
                animate={{
                  rotateZ: (cards.length - cardIndex - 1) * 4 + randomRotate,
                  scale: 1 + cardIndex * 0.02 - cards.length * 0.02,
                }}
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: animationConfig.stiffness,
                  damping: animationConfig.damping,
                }}
                style={{
                  width: cardDimensions.width,
                  height: cardDimensions.height,
                }}
              >
                <div className="h-[280px] w-full overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-1 py-3 flex flex-col justify-center ">
                  {card.title && (
                    <h3 className="text-xl leading-5 font-semibold text-gray-800">
                      {card.title}
                    </h3>
                  )}
                  {card.subtitle && (
                    <p className="text-sm text-gray-500">{card.subtitle}</p>
                  )}
                </div>
              </motion.div>
            </CardRotate>
          );
        })}
        <div className="absolute left-3/4 transform  top-full flex flex-row items-center gap-1 mt- w-full  -rotate-12">
          <div className="w-6 h-6 relative rotate-40">
            <Image
              src="/homestay/arrow.svg"
              quality={100}
              unoptimized={true}
              alt="Bynekere Estate Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-sm w-full translate-y-1">Flick em&apos;</span>
        </div>
      </div>
    </div>
  );
}
