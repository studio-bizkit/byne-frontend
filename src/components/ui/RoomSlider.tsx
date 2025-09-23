"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Bedroom 01",
    desc: "Experience the warmth of wooden interiors and the charm of plantation life. Wake up to the fragrance of fresh coffee blossoms drifting through your window, with hills stretching endlessly beyond.",
    type: "Master Bedroom",
    bed: "Queen Size",
    occupancy: "02 Persons",
    mainImg: "/homestay/1.png",
    sideImg: "/homestay/2.png",
  },
  {
    id: 2,
    title: "Bedroom 02",
    desc: "Experience the warmth of wooden interiors and the charm of plantation life. Wake up to the fragrance of fresh coffee blossoms drifting through your window, with hills stretching endlessly beyond.",
    type: "Guest Bedroom",
    bed: "Double Bed",
    occupancy: "02 Persons",
    mainImg: "/homestay/3.png",
    sideImg: "/homestay/4.png",
  },
  {
    id: 3,
    title: "Bedroom 03",
    desc: "Experience the warmth of wooden interiors and the charm of plantation life. Wake up to the fragrance of fresh coffee blossoms drifting through your window, with hills stretching endlessly beyond.",
    type: "Deluxe Bedroom",
    bed: "King Size",
    occupancy: "03 Persons",
    mainImg: "/homestay/5.png",
    sideImg: "/homestay/6.png",
  },
];

const textVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const textVariantsSmall: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const swipeVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%" }),
  center: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  }),
};

export default function RoomSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev
  const current = slides[index];

  const nextSlide = () => {
    setDirection(1);
    setIndex(prev => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="flex max-w-6xl w-full overflow-hidden ">
        {/* Left Image */}
        <div className="relative w-1/2 h-[600px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current.id + "-main"}
              custom={direction}
              variants={swipeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute top-0 left-0 w-full h-full"
            >
              <Image
                src={current.mainImg}
                alt={current.title}
                fill
                className="object-cover w-full h-full"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-between w-1/2 bg-background pl-8 gap-48">
          {/* Top: Title, Description, Side Image */}
          <div className="flex flex-row gap-6">
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id + "-text"}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-1"
                >
                  <p className="text-primary text-md">
                    Rooms
                  </p>
                  <h2 className="text-primary font-serif text-6xl font-medium">
                    {current.title}
                  </h2>
                  <p className="text-primary text-sm">
                    {current.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Side Image with swipe */}
            <div className="w-1/3 relative aspect-[4/3] overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={current.id + "-side"}
                  custom={direction}
                  variants={swipeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute top-0 left-0 w-full h-full"
                >
                  <Image
                    src={current.sideImg}
                    alt={current.title}
                    fill
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom: Type, Bed, Occupancy + Controls */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <div >
                <span className="text-primary text-sm uppercase">Type</span>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={current.id + "-type"}
                    variants={textVariantsSmall}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-primary font-medium"
                  >
                    {current.type}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div >
                <span className="text-primary text-sm uppercase">Bed</span>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={current.id + "-bed"}
                    variants={textVariantsSmall}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-primary font-medium"
                  >
                    {current.bed}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div >
                <span className="text-primary text-sm uppercase">
                  Occupancy
                </span>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={current.id + "-occupancy"}
                    variants={textVariantsSmall}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-primary font-medium"
                  >
                    {current.occupancy}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#D9D9D9] text-primary hover:bg-primary/20"
              >
                ‹
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-[#D9D9D9] hover:bg-primary/90"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
