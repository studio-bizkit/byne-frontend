import Image from "next/image";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "./ScrollBasedVelocity";

export function ActivitesComponent() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
      <ScrollVelocityContainer className="w-full">
        <ScrollVelocityRow baseVelocity={6} direction={-1} className="py-4 text-4xl md:text-7xl font-serif text-primary">
          <Image
            src="/homestay/bean-yellow.svg"
            alt="Unsplash sample"
            width={75} // maintains ~1.2 aspect ratio with height
            height={50} // fixed height
            className="mx-4 inline-block h-[30px] md:h-[50px] w-auto object-contain"
          />
          Activities offered
        </ScrollVelocityRow>
      </ScrollVelocityContainer>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  );
}
