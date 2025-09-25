"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const WideSvgScroll = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Width of SVG minus viewport width
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1920;
  const svgWidth = 2934;
  const totalScrollX = svgWidth - viewportWidth;

  const x = useTransform(scrollYProgress, [0, 1], [0, -totalScrollX]);

  return (
    <section ref={targetRef} className="relative h-[60vh] md:h-[300vh] overflow-hidden">
      <motion.div style={{ x }} className="absolute top-0 left-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2934"
          height="325"
          viewBox="0 0 2934 325"
          fill="none"
          className="h-[325px]"
        >
          <path
            d="M1 203.764C127.5 101.931 447.4 -40.6358 715 203.764C982.6 448.164 1328.17 259.931 1467.5 135.265"
            stroke="#F5E6D3"
            strokeWidth="3"
          />
          <path
            d="M1466 136.946C1592.5 35.1125 1912.4 -107.454 2180 136.946C2447.6 381.346 2793.17 193.113 2932.5 68.4463"
            stroke="#F5E6D3"
            strokeWidth="3"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default WideSvgScroll;
