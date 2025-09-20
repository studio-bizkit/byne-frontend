"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

interface CardType {
    id: number;
    title: string;
    country: string;
    feel: string;
    ingredients: string;
    image: string;
    ratings: {
        sweetness: number;
        acidity: number;
        bitterness: number;
        mouthfeel: number;
    };
}

const AnimatedProductCards = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

    const handleCardClick = (cardId: number) => {
        setFlippedCards((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(cardId)) newSet.delete(cardId);
            else newSet.add(cardId);
            return newSet;
        });
    };
    // Precompute transforms individually
    const transform0 = {
        x: useTransform(scrollYProgress, [0.00, 0.40], [0, -400]),
        y: useTransform(scrollYProgress, [0.00, 0.40], [200, Math.sin(0 * 0.5) * 20]),
        rotate: useTransform(scrollYProgress, [0.00, 0.40], [0, -16]),
    };

     const transform1 = {
        x: useTransform(scrollYProgress, [0.16, 0.56], [0, 0]),
        y: useTransform(scrollYProgress, [0.00, 0.40], [200, Math.sin(0 * 0.5) * 20]),
        rotate: useTransform(scrollYProgress, [0.16, 0.56], [0, 0]),
    };

     const transform2 = {
        x: useTransform(scrollYProgress, [0.32, 0.72], [0, 400]),
        y: useTransform(scrollYProgress, [0.00, 0.40], [200, Math.sin(0 * 0.5) * 20]),
        rotate: useTransform(scrollYProgress, [0.32, 0.72], [0, 16]),
    };

    // Collect in array
    const transforms = [transform0, transform1, transform2];


    return (
        <section ref={sectionRef} className="relative h-[400vh] mt-36">
            <div className="sticky top-20 h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Header */}
                <motion.div className="text-center px-6 z-10 pt-10 pb-10">
                    <div className="max-w-md text-primary text-3xl md:text-5xl font-serif ">
                        Our Products
                    </div>
                </motion.div>

                {/* Cards */}
                <div className="relative flex items-start justify-center w-full h-full">
                    {cards.map((card, index) => {
                        const isFlipped = flippedCards.has(card.id);
                        const { x, y, rotate } = transforms[index];

                        return (
                            <motion.div
                                key={card.id}
                                className="absolute cursor-pointer preserve-3d"
                                style={{
                                    x,
                                    y,
                                    rotate,
                                    zIndex: cards.length - index,
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 },
                                }}
                                onClick={() => handleCardClick(card.id)}
                            >
                                <motion.div
                                    className="w-[200px] h-[350px] md:w-[300px] md:h-[450px] relative preserve-3d shadow-xl rounded-lg border border-primary/20"
                                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    {/* Front */}
                                    <div
                                        className="absolute inset-0 w-full h-full backface-hidden rounded-lg overflow-hidden bg-primary text-background"
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        {/* Tag top-left or top-right */}
                                        <div className="absolute top-0 bottom-0 h-fit bg-background text-primary text-[10px] md:text-xs font-medium px-2 py-1 rounded-br-sm z-10 flex gap-2">
                                            <Image
                                                src={"/bean.svg"}
                                                alt={"bean"}
                                                height={10}
                                                width={10}
                                            /> Omni Roast
                                        </div>

                                        {/* Image */}
                                        <div className="relative w-full h-2/3 overflow-hidden">
                                            <Image
                                                src={card.image}
                                                alt={card.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Bottom info */}
                                        <div className="absolute flex flex-col justify-between h-1/3 bottom-0 w-full bg-background text-primary p-3 md:px-3 md:py-4">
                                            <div>
                                                <div className="text-xl md:text-2xl font-serif">{card.title}</div>
                                                <div className="text-xs md:text-sm">
                                                    Country of origin: <span className="font-semibold">{card.country}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mt-2">
                                                    <span className="text-xs md:text-xs">FEEL:</span>
                                                    <span className="text-xs md:text-xs">{card.feel}</span>
                                                </div>
                                                <div className="flex justify-between mt-1">
                                                    <span className="text-xs md:text-xs">INGREDIENTS:</span>
                                                    <span className="text-xs md:text-xs">{card.ingredients}</span>
                                                </div></div>
                                        </div>
                                    </div>

                                    {/* Back */}
                                    <div
                                        className="absolute inset-0 w-full h-full backface-hidden rounded-lg overflow-hidden"
                                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                    >
                                        {/* Top section - Byne Index */}
                                        <div className="bg-primary text-background h-2/3 p-4 md:p-6 flex flex-col justify-center">
                                            <div className="font-serif text-lg md:text-xl mb-4">Byne Index</div>

                                            {[
                                                { label: "Sweetness", value: card.ratings.sweetness },
                                                { label: "Acidity", value: card.ratings.acidity },
                                                { label: "Bitterness", value: card.ratings.bitterness },
                                                { label: "Mouthfeel", value: card.ratings.mouthfeel },
                                            ].map(({ label, value }) => (
                                                <div key={label} className="mb-3">
                                                    <div className="text-xs md:text-sm mb-1">{label}</div>
                                                    <div className="flex gap-1">
                                                        {[1, 2, 3, 4, 5].map((i) => (
                                                            <div
                                                                key={i}
                                                                className={`h-2 w-8 md:w-10 rounded-sm ${i <= value ? "bg-background/80" : "bg-background/20"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Bottom info */}
                                        <div className="absolute flex flex-col justify-between h-1/3 bottom-0 w-full bg-background text-primary p-3 md:px-3 md:py-4">
                                            <div>
                                                <div className="text-xl md:text-2xl font-serif">{card.title}</div>
                                                <div className="text-xs md:text-sm">
                                                    Country of origin: <span className="font-semibold">{card.country}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mt-2">
                                                    <span className="text-xs md:text-xs">FEEL:</span>
                                                    <span className="text-xs md:text-xs">{card.feel}</span>
                                                </div>
                                                <div className="flex justify-between mt-1">
                                                    <span className="text-xs md:text-xs">INGREDIENTS:</span>
                                                    <span className="text-xs md:text-xs">{card.ingredients}</span>
                                                </div></div>
                                        </div>

                                    </div>

                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const cards: CardType[] = [
    {
        id: 1,
        title: "Blue Tokai",
        country: "India",
        feel: "Smooth & Rich",
        ingredients: "100% Arabica Beans",
        image: "/products/1.png",
        ratings: { sweetness: 4, acidity: 3, bitterness: 2, mouthfeel: 5 },
    },
    {
        id: 3,
        title: "Covoya Coffee",
        country: "Colombia",
        feel: "Balanced & Nutty",
        ingredients: "Medium Roast Blend",
        image: "/products/1.png",
        ratings: { sweetness: 3, acidity: 3, bitterness: 3, mouthfeel: 4 },
    },
    {
        id: 5,
        title: "Hawker",
        country: "Brazil",
        feel: "Creamy & Sweet",
        ingredients: "Pulped Natural Process",
        image: "/products/1.png",
        ratings: { sweetness: 5, acidity: 2, bitterness: 2, mouthfeel: 5 },
    },
];


export default AnimatedProductCards;