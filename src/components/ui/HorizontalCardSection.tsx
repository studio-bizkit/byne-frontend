"use client"
import React, { useRef, useState, useLayoutEffect, useCallback } from "react"
import ResizeObserver from "resize-observer-polyfill"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

const cards = [
  {
    title: "Coffee Powder",
    description: "Premium coffee powder from the hills of Coorg. 100% Quality.",
  },
  {
    title: "Coffee Beans",
    description: "Fresh roasted coffee beans for best aroma and taste.",
  },
  {
    title: "Coffee Capsules",
    description: "Convenient and high-quality capsules for espresso machines.",
  },
  {
    title: "Cold Brew",
    description: "Smooth, refreshing cold brew crafted with precision.",
  },
]

export default function HorizontalCardSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const [scrollRange, setScrollRange] = useState(0)
  const [viewportW, setViewportW] = useState(0)

  // measure total scroll width
  useLayoutEffect(() => {
    if (trackRef.current) {
      setScrollRange(trackRef.current.scrollWidth)
    }
  }, [])

  const onResize = useCallback((entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width)
    }
  }, [])

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(onResize)
    if (ghostRef.current) resizeObserver.observe(ghostRef.current)
    return () => resizeObserver.disconnect()
  }, [onResize])

  // pin + animate horizontally on vertical scroll
  const { scrollYProgress } = useScroll()
  const xRange = useTransform(scrollYProgress, [0, 1], [0, -scrollRange + viewportW])
  const springX = useSpring(xRange, { damping: 20, stiffness: 80, mass: 0.3 })

  return (
    <>
      <div className="scroll-container relative h-screen overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x: springX }}
          className="thumbnails-container flex gap-6 h-full items-center px-40"
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="w-72 h-96 flex-shrink-0 rounded-xl shadow-xl p-6 flex flex-col justify-end bg-white text-[#0047AC]"
            >
              <h3 className="italic text-lg mb-1">{card.title}</h3>
              <p className="text-xs">{card.description}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ghost div gives scrollable height */}
      <div
        ref={ghostRef}
        style={{ height: scrollRange }}
        className="ghost"
      />
    </>
  )
}
