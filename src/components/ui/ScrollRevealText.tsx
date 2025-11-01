"use client";

import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[100vh]", className)}>
      <div className="sticky top-0 flex h-[30vh] items-center justify-center mx-auto max-w-7xl text-center">
        <span className="flex flex-wrap justify-center text-3xl text-primary md:text-4xl lg:text-5xl 2xl:text-5xl font-serif tracking-tight text-justify leading-8 md:tracking-tight md:text-center md:leading-12 2xl:leading-12">
          {words.map((word, i) => {
            const total = words.length;
            const compression = 1; // smaller = faster animation (try 0.3–0.7)
            const start = ((total - 1 - i) / total) * compression;
            const end = start + (1 / total) * compression;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [1, 0]);
  return (
    <span className="relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span style={{ opacity }} className="text-primary dark:text-white">
        {children}
      </motion.span>
    </span>
  );
};
