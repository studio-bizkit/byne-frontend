"use client";

import { DirectionAwareHover } from "./DirectionAwareHover";
import { useIsMobile } from "@/lib/useMediaQuery";
import { useRouter } from "next/navigation";

const ProductRange = () => {
  const isMobile = useIsMobile();
  const router = useRouter();

  const products = [
    {
      title: (
        <>
          Coffee <i>Byne</i>
        </>
      ),
      image: "/about/coffee.png",
      link: "/coffee",
    },
    {
      title: (
        <>
          Villa <i>Byne</i>
        </>
      ),
      image: "/about/villa.png",
      link: "/villa",
    },
  ];

  return (
    <div className="max-w-5xl md:max-w-7xl mx-auto mt-6 md:mt-16 md:mb-20 flex flex-col items-center">
      <div className="text-center z-10">
        <div className="max-w-full text-primary text-3xl md:text-5xl font-serif">
          Our Products
        </div>
      </div>

      <div className="w-full h-full mx-auto px-8 py-8 flex flex-col md:flex-row gap-8">
        {products.map(p => (
          <DirectionAwareHover
            key={p.link}
            imageUrl={p.image}
            className="flex-1 w-full aspect-[4/3] relative cursor-pointer"
            // only use hover animation when not mobile
            disableHover={isMobile}
            onClick={() => router.push(p.link)}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-background px-4 md:px-0">
              <p className="text-2xl md:text-4xl font-serif">{p.title}</p>
              <p className="text-xs md:text-sm mt-2">Tap to know more</p>
            </div>
          </DirectionAwareHover>
        ))}
      </div>
    </div>
  );
};

export default ProductRange;
