"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

interface StackCard {
  id: number;
  img: string;
  title?: string;
  subtitle?: string;
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
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
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
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  animationConfig?: { stiffness: number; damping: number };
}

export default function Stack({
  randomRotation = false,
  sensitivity = 50,
  cardDimensions = { width: 260, height: 380 },
  sendToBackOnClick = true,
  animationConfig = { stiffness: 260, damping: 20 },
}: StackProps) {
  const initialCards: StackCard[] = [
    { id: 1, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format", title: "Estate Tour", subtitle: "Coffee Plantation Visit" },
    { id: 2, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format", title: "Free Wi-Fi", subtitle: "Stay Connected" },
    { id: 3, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format", title: "Trekking", subtitle: "Explore the Hills" },
    { id: 4, img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format", title: "Late Check-Out", subtitle: "Flexible Stays" },
    { id: 5, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format", title: "Bar", subtitle: "Outdoor Refreshments" },
    { id: 6, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format", title: "Outdoor Activities", subtitle: "Play & Relax" },
    { id: 7, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format", title: "Barbeque", subtitle: "Evening Grill Setup" },
  ];

  const [cards, setCards] = useState(initialCards);

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="relative" style={{ width: cardDimensions.width, height: cardDimensions.height, perspective: 600 }}>
        {cards.map((card) => {
          const cardIndex = cards.findIndex((c) => c.id === card.id);
          const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

          return (
            <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 cursor-pointer"
                onClick={() => sendToBackOnClick && sendToBack(card.id)}
                animate={{
                  rotateZ: (cards.length - cardIndex - 1) * 4 + randomRotate,
                  scale: 1 + cardIndex * 0.02 - cards.length * 0.02,
                }}
                initial={false}
                transition={{ type: "spring", stiffness: animationConfig.stiffness, damping: animationConfig.damping }}
                style={{ width: cardDimensions.width, height: cardDimensions.height }}
              >
                <div className="h-[280px] w-full overflow-hidden">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                </div>
                <div className="h-[100px] p-4 flex flex-col justify-center">
                  {card.title && <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>}
                  {card.subtitle && <p className="text-sm text-gray-500">{card.subtitle}</p>}
                </div>
              </motion.div>
            </CardRotate>
          );
        })}
      </div>
    </div>
  );
}