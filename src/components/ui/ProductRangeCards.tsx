"use client";

import { DirectionAwareHover } from "./DirectionAwareHover";

const ProductRange = () => {
    return (
        <div className="flex flex-col gap-3 justify-center items-center mt-24 mb-18">
            <div className="text-center z-10 ">
                <div className="max-w-md text-primary text-3xl md:text-5xl font-serif ">
                    Our Products
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 h-full">
                <DirectionAwareHover
                    imageUrl={"/about/coffee.png"}
                    className="flex-1 h-full"
                >
                    <div className="flex flex-col justify-center items-center h-full text-center text-white">
                        <p className="text-4xl font-serif">Coffee <i>Byne</i></p>
                        <p className="font-normal text-sm">Tap to know more</p>
                    </div>
                </DirectionAwareHover>
                <DirectionAwareHover
                    imageUrl={"/about/villa.png"}
                    className="flex-1 h-full"
                >
                    <div className="flex flex-col justify-center items-center h-full text-center text-white">
                        <p className="text-4xl font-serif">Villa <i>Byne</i></p>
                        <p className="font-normal text-sm">Tap to know more</p>
                    </div>
                </DirectionAwareHover>
            </div>
        </div>
    );
};

export default ProductRange;
