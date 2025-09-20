"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const card1Transform = {
        rotate: useTransform(scrollYProgress, [0, 0.5], [25, -15]),
        x: useTransform(scrollYProgress, [0, 0.5], [-800, -80]),
        y: useTransform(scrollYProgress, [0, 0.5], [50, -20]),
    };

    const card2Transform = {
        rotate: useTransform(scrollYProgress, [0.1, 0.6], [15, 0]),
        x: useTransform(scrollYProgress, [0.1, 0.6], [800, 0]),
        y: useTransform(scrollYProgress, [0.1, 0.6], [30, 0]),
    };

    const card3Transform = {
        rotate: useTransform(scrollYProgress, [0.2, 0.7], [-20, 15]),
        x: useTransform(scrollYProgress, [0.2, 0.7], [-800, 80]),
        y: useTransform(scrollYProgress, [0.2, 0.7], [60, 20]),
    };

    const transforms = [card1Transform, card2Transform, card3Transform];

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <svg
                key={i}
                className={`w-5 h-5 ${i < rating ? "fill-background text-background" : "stroke-background fill-none"}`}
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <section ref={sectionRef} className="relative h-[400vh] bg-background">
            <div className="sticky top-20 h-screen flex flex-col items-center justify-center overflow-hidden px-6 ">
                {/* Header */}
                <motion.div 
                    className="text-center z-10"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary max-w-4xl leading-tight">
                        What the coffee nation talks about us
                    </h2>
                </motion.div>

                {/* Review Cards */}
                <div className="relative w-full max-w-4xl h-full -mt-28 flex items-center justify-center ">
                    <div className="relative w-full h-96 flex justify-between">
                        {reviews.map((review, index) => {
                            const { rotate, x, y } = transforms[index];
                            
                            return (
                                <motion.div
                                    key={review.id}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    style={{ rotate, x, y, zIndex: reviews.length - index }}
                                    whileHover={{ scale: 1.05, zIndex: 10, transition: { duration: 0.2 } }}
                                >
                                    <div
                                        className="w-80 h-96 md:w-xs md:h-[420px] bg-cover rounded-2xl px-4 py-5 flex flex-col justify-between shadow-2xl text-background"
                                        style={{ backgroundImage: "url('/gradient-card-bg.png')" }}
                                    >
                                        <div className="text-primary">
                                            <h3 className="text-3xl md:text-4xl truncate font-serif font-medium">{review.name}</h3>
                                            <p className="text-sm md:text-base font-medium">{review.designation}</p>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <div className="flex">{renderStars(review.stars)}</div>
                                            <p className="text-sm md:text-sm">{review.description}</p>
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
        name: "Mr. Sriram Ishwar",
        designation: "CEO",
        company: "ARR VEE TRADE",
        stars: 4,
        description: "The quality of coffee beans we receive is consistently exceptional. Their attention to detail and commitment to excellence has made them our preferred partner for premium coffee sourcing."
    },
    {
        id: 2,
        name: "Mr. Anil Kumar",
        designation: "Head of Operations",
        company: "BLUE TOKAI ROASTERS",
        stars: 4,
        description: "Working with this team has transformed our coffee procurement process. The variety and quality they offer allows us to create unique blends that our customers absolutely love."
    },
    {
        id: 3,
        name: "Mrs. Amelia",
        designation: "Quality Manager",
        company: "ABC ROASTERS & CO.",
        stars: 4,
        description: "Their expertise in coffee sourcing and quality control is unmatched. Every batch meets our strict standards, and their customer service is always professional and responsive."
    }
];

export default AnimatedReviews;