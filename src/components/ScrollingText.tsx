"use client";
import React from "react";
import { motion} from "framer-motion";

export default function ScrollingText() {
  return (
    <div className="w-full py-10">
      <svg className="w-full" viewBox="0 0 1000 400">
        <path
          fill="none"
          id="curve"
          stroke="transparent"
          strokeWidth="1"
          d="M-2 80C250 140 297 232 466 92 551 11 750 220 1000 220"
        />
        <motion.text
          className="text-6xl font-light text-primary font-serif tracking-widest"
        >
          <textPath
            startOffset="50%"
            textAnchor="middle"
            href="#curve"
          >
            Experience Coffee With Us
          </textPath>
        </motion.text>
      </svg>
    </div>
  );
}