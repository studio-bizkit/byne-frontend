"use client";

import { DirectionAwareHover } from "./DirectionAwareHover";

const ProductRange = () => {
    return (
        <div className="flex flex-col gap-3 justify-center items-center mt-24 mb-18">
            <div className="text-center z-10">
                <div className="max-w-md text-primary text-3xl md:text-5xl font-serif">
                    Our Products
                </div>
            </div>

            <div className="max-w-2xl md:max-w-4xl w-full mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 h-full">
                <DirectionAwareHover
                    imageUrl={"/about/coffee.png"}
                    className="flex-1 w-full h-64 md:h-96 relative"
                >
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-background px-4 md:px-0">
                        <p className="text-2xl md:text-4xl font-serif">Coffee <i>Byne</i></p>
                        <p className="text-xs md:text-sm mt-2">Tap to know more</p>
                    </div>
                </DirectionAwareHover>

                <DirectionAwareHover
                    imageUrl={"/about/villa.png"}
                    className="flex-1 w-full h-64 md:h-96 relative"
                >
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-background px-4 md:px-0">
                        <p className="text-2xl md:text-4xl font-serif">Villa <i>Byne</i></p>
                        <p className="text-xs md:text-sm mt-2">Tap to know more</p>
                    </div>
                </DirectionAwareHover>
            </div>
        </div>

    );
};

export default ProductRange;
