"use client";
import { useIsMobile } from "@/lib/useMediaQuery";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface ReviewType {
  id: number;
  name: string;
  designation: string;
  stars: number;
  description: string;
  company: string;
}

const AnimatedReviews = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: isMobile
      ? ["start center", "end center"]
      : ["start center", "end start"],
  });

  const [activeCard, setActiveCard] = useState<number | null>(null);

  const card1Transform = {
    rotate: useTransform(scrollYProgress, [0, 0.6], [25, -15]),
    x: useTransform(scrollYProgress, [0, 0.6], [-700, -200]),
    y: useTransform(scrollYProgress, [0, 0.6], [50, -20]),
  };

  const card2Transform = {
    rotate: useTransform(scrollYProgress, [0.1, 0.65], [15, 0]),
    x: useTransform(scrollYProgress, [0.1, 0.65], [0, 0]),
    y: useTransform(scrollYProgress, [0.1, 0.65], [500, 0]),
  };

  const card3Transform = {
    rotate: useTransform(scrollYProgress, [0.2, 0.7], [-20, 15]),
    x: useTransform(scrollYProgress, [0, 0.7], [700, 200]),
    y: useTransform(scrollYProgress, [0.2, 0.7], [60, 100]),
  };

  const mcard1Transform = {
    rotate: useTransform(scrollYProgress, [0, 0.6], [25, -15]),
    x: useTransform(scrollYProgress, [0, 0.6], [-700, -50]),
    y: useTransform(scrollYProgress, [0, 0.6], [50, -50]),
  };

  const mcard2Transform = {
    rotate: useTransform(scrollYProgress, [0.1, 0.65], [15, 0]),
    x: useTransform(scrollYProgress, [0.1, 0.65], [0, 0]),
    y: useTransform(scrollYProgress, [0.1, 0.65], [500, 0]),
  };

  const mcard3Transform = {
    rotate: useTransform(scrollYProgress, [0.2, 0.7], [-20, 15]),
    x: useTransform(scrollYProgress, [0.2, 0.7], [700, 50]),
    y: useTransform(scrollYProgress, [0.2, 0.7], [60, 50]),
  };
  const transforms = isMobile
    ? [mcard1Transform, mcard2Transform, mcard3Transform]
    : [card1Transform, card2Transform, card3Transform];

  const handleCardClick = (cardId: number) => {
    if (isMobile) {
      setActiveCard(activeCard === cardId ? null : cardId);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${
          i < rating
            ? "fill-background text-background"
            : "stroke-background fill-none"
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] bg-background -mb-32 mt-6 md:mb-0"
    >
      <div className="sticky top-28 md:top-24 h-screen flex flex-col items-center justify-center overflow-hidden px-6 ">
        {/* Header */}
        <motion.div
          className="text-center z-10 mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-3xl lg:text-5xl font-serif text-primary max-w-[250px] md:max-w-4xl leading-tight">
            What the nation speaks about us?
          </h2>
          <p className="text-primary text-lg leading-snug font-serif text-center block md:hidden">
            click to read em.
          </p>
        </motion.div>

        {/* Review Cards */}
        <div className="relative w-full max-w-4xl h-full -mt-48 md:-mt-32 flex items-center justify-center ">
          <div className="relative w-full h-96 flex justify-between">
            {reviews.map((review, index) => {
              const { rotate, x, y } = transforms[index];

              return (
                <motion.div
                  key={review.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    rotate,
                    x,
                    y,
                    zIndex: activeCard === review.id ? 10 : index + 1,
                  }}
                  whileHover={{
                    scale: 1.05,
                    zIndex: 10,
                    transition: { duration: 0.2 },
                  }}
                  animate={{
                    scale: activeCard === review.id ? 1.05 : 1,
                    transition: { duration: 0.2 },
                  }}
                  onClick={() => handleCardClick(review.id)}
                >
                  <div
                    className="w-48 md:w-72 2xl:w-80 bg-cover rounded-2xl px-4 py-5 flex flex-col justify-between shadow-2xl text-background"
                    style={{
                      aspectRatio: "419 / 512",
                      backgroundImage: "url('/gradient-card-bg.png')",
                    }}
                  >
                    <div className="text-primary">
                      <h3 className="text-2xl md:text-[44px] truncate font-serif font-medium">
                        {review.name}
                      </h3>
                      <p className="text-sm md:text-base font-bold uppercase">
                        {review.designation}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 font-light">
                      <div className="flex">{renderStars(review.stars)}</div>
                      <p className="text-[10px] md:text-xs 2xl:text-sm">{review.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const reviews: ReviewType[] = [
  {
    id: 1,
    name: "Arjun Menon",
    designation: "Roaster",
    company: "—",
    stars: 5,
    description:
      "Truly one of India’s hidden gems in coffee. We roasted a microlot from Bynekere Estate and were blown away by its clarity and sweetness. The caramel and green apple notes are beautifully balanced with a soft acidity that finishes clean. What stands out most is the traceability — shade-grown, high-altitude, and managed with care for both land and people. A coffee that speaks volumes about where it’s from.",
  },
  {
    id: 2,
    name: "Meera K.",
    designation: "Barista",
    company: "—",
    stars: 4.5,
    description:
      "Bright, expressive, and rewarding to brew. I’ve brewed Bynekere’s washed lot on V60 and AeroPress — both highlight different layers of flavour. Expect crisp white grape, light caramel, and a pleasant areca-nut finish. It’s the kind of coffee that lets you play with brew ratios and still delivers a satisfying cup. Bonus points for the estate’s focus on biodiversity and fair work culture.",
  },
  {
    id: 3,
    name: "Rohan Sharma",
    designation: "Coffee Enthusiast",
    company: "Pune",
    stars: 5,
    description:
      "A cup that captures Chikmagalur’s soul. I ordered this out of curiosity about Indian single origins — and now I’m hooked. The aroma fills the kitchen with a warm caramel scent, and the taste is bright yet smooth. You can tell it’s grown under shade and roasted thoughtfully. It’s become my go-to morning brew.",
  },
];

export default AnimatedReviews;
