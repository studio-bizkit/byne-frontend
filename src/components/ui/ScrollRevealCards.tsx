"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface CardType {
    id: number;
    title: string;
}

const ScrollRevealCards = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const transform0 = {
        x: useTransform(
            scrollYProgress,
            [0 / cards.length, 1 / cards.length],
            ["150%", `${0 * 60}px`]
        ),
        y: useTransform(
            scrollYProgress,
            [0 / cards.length, 1 / cards.length],
            ["600vh", `${(0 * 80) - 200}px`]
        ),
    };

    const transform1 = {
        x: useTransform(
            scrollYProgress,
            [1 / cards.length, 2 / cards.length],
            ["150%", `${1 * 60}px`]
        ),
        y: useTransform(
            scrollYProgress,
            [1 / cards.length, 2 / cards.length],
            ["600vh", `${(1 * 80) - 200}px`]
        ),
    };

    const transform2 = {
        x: useTransform(
            scrollYProgress,
            [2 / cards.length, 3 / cards.length],
            ["150%", `${2 * 60}px`]
        ),
        y: useTransform(
            scrollYProgress,
            [2 / cards.length, 3 / cards.length],
            ["600vh", `${(2 * 80) - 200}px`]
        ),
    };

    const transform3 = {
        x: useTransform(
            scrollYProgress,
            [3 / cards.length, 4 / cards.length],
            ["150%", `${3 * 60}px`]
        ),
        y: useTransform(
            scrollYProgress,
            [3 / cards.length, 4 / cards.length],
            ["600vh", `${(3 * 80) - 200}px`]
        ),
    };

    const transform4 = {
        x: useTransform(
            scrollYProgress,
            [4 / cards.length, 1],
            ["150%", `${4 * 60}px`]
        ),
        y: useTransform(
            scrollYProgress,
            [4 / cards.length, 1],
            ["600vh", `${(4 * 80) - 200}px`]
        ),
    };

    const transforms = [transform0, transform1, transform2, transform3, transform4];

    return (
        <section ref={targetRef} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Top Text */}
                <div className="top-20 px-6 max-w-md text-primary text-xl md:text-3xl font-serif z-10">
                    Where our coffee travels.
                </div>
                <div className=" px-6 max-w-xl text-primary text-sm md:text-md text-center z-10">
                    Premium coffee powder from the hills og coorg. 100% Quality.
                </div>

                {/* Cards Row */}
                <div className="relative flex flex-row items-center justify-center w-full h-full ml-24">
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.id}
                            style={{
                                y: transforms[i].y,
                                zIndex: cards.length - i, // topmost for smallest i
                            }} className={`relative w-[120px] h-[150px] md:w-[200px] md:h-[220px] -ml-24 rounded-b-sm overflow-hidden flex-shrink-0 ${"z-" + ((cards.length) - i)}
                            `}
                        >
                            {/* Background gradient */}
                            <Image
                                src="/gradient-card-bg.png"
                                alt="Card background"
                                fill
                                className="object-cover"
                            />

                            {/* Overlay text */}
                            <div className="absolute md:bottom-4 md:left-4 bottom-2 left-2 text-background font-serif">
                                <div className="text-md md:text-base font-light">
                                    {String(card.id).padStart(2, "0")}
                                </div>
                                <div className="text-lg md:text-3xl">
                                    {card.title}
                                </div>
                            </div>
                        </motion.div>


                    ))}
                </div>
            </div>
        </section>
    );
};

const cards: CardType[] = [
    {
        id: 1,
        title: "Blue Tokai",
    },
    {
        id: 2,
        title: "Gardeli Roasters",
    },
    {
        id: 3,
        title: "Covoya Cofee",
    },
    {
        id: 4,
        title: "Olam Intl",
    },
    {
        id: 5,
        title: "Hawker",
    },
];

export default ScrollRevealCards;