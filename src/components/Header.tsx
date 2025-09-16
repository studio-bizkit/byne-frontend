"use client";

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useIsMobile } from '@/lib/useMediaQuery';

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom * 0.3, duration: 0.6, ease: "easeOut" }
    }),
};

export default function Header() {
    const isMobile = useIsMobile();

    return (
        <div className="flex flex-col mt-24">
            {/* Top Section */}
            <motion.div
                className="relative min-h-[60vh] w-full"
                custom={isMobile ? 1 : 2}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
            >
                <div className="mx-4 sm:mx-6 lg:mx-8">
                    <div className="relative min-h-[60vh] rounded-2xl overflow-hidden">
                        {/* Background image */}
                        <Image
                            src="/hero-bg.png"
                            alt="Bynekere Estate"
                            fill
                            className="object-cover rounded-2xl"
                            priority
                        />

                        {/* Overlay logo */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-1/2 relative aspect-square">
                                <Image
                                    src="/hero-logo.svg"
                                    alt="Bynekere Estate Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Section */}
            <div className="w-full flex items-center relative z-10">
                <div className="mx-4 sm:mx-6 lg:mx-20 px-4 sm:px-6 lg:px-8 py-12 w-full">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        <motion.div
                            className="text-left"
                            custom={5}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                        >
                            <p className="text-lg sm:text-xl leading-relaxed text-primary">
                                Bynekere Estate is an historic coffee plantation located in the
                                Baba Budangiri Hills near Chikmagalur, Karnataka.
                            </p>
                        </motion.div>

                        <motion.div
                            className="text-left"
                            custom={7}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                        >
                            <p className="text-lg sm:text-xl leading-relaxed text-primary">
                                Byne delivers high-quality, sustainably grown coffee from our
                                farms to businesses and coffee lovers alike. Through our
                                homestay, guests can experience the plantation life and the
                                story behind every bean.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
