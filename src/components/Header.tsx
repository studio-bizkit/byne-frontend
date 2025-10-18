"use client";

import Image from "next/image";
import { motion, Variants, useTransform, useScroll } from "framer-motion";
import { useIsMobile } from "@/lib/useMediaQuery";

const fadeUp: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

interface HeaderProps {
  page: string; // accept any string now
}

const pageContent: Record<string, { bgImage: string; title?: string }> = {
  home: { bgImage: "/home-bg-new.png" },
  coffee: { bgImage: "/coffee-bg.png", title: "Coffee Huro" },
  homestay: { bgImage: "/homestay-bg.png", title: "Villa Bynekere" },
  about: { bgImage: "/about-bg.png", title: "About Huro" },
};

export default function Header({ page }: HeaderProps) {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const logoScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const opacity = useTransform(scrollY, [0, 300], [0.3, 1]);

  const content = pageContent[page] || pageContent["home"]; // fallback to home

  return (
    <div className="flex flex-col">
      <motion.div
        className="relative h-screen w-full bg-black"
        custom={isMobile ? 1 : 2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="relative h-screen overflow-hidden">
          {page === "home" && (
            <div className="absolute inset-0 bg-black/50 z-1 overflow-hidden" />
          )}
          {/* Background */}
          <motion.div className="absolute inset-0" style={{ scale }}>
            <div className="relative h-full w-full">
              <Image
                src={content.bgImage}
                alt={content.title || "Background"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
          {page !== "home" && (
            <motion.div
              className="absolute inset-x-0 bottom-0 h-1/12 bg-gradient-to-t from-background via-background/30 to-transparent"
              style={{ opacity }}
            />
          )}

          {/* Overlay */}
          {content.title ? (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{ scale: logoScale }}
            >
              {(() => {
                const words = content.title.split(" ");
                const lastWord = words.pop();
                return (
                  <h1 className="text-6xl sm:text-8xl font-serif text-background text-center px-4">
                    {words.join(" ")} <span className="italic">{lastWord}</span>
                  </h1>
                );
              })()}
            </motion.div>
          ) : (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{ scale: logoScale }}
            >
              <div className="h-1/4 relative aspect-square">
                <Image
                  src="/hero-logo.svg"
                  alt="Bynekere Estate Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
