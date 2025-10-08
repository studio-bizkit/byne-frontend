"use client";
import { useIsMobile } from "@/lib/useMediaQuery";
import PolaroidBoundingBox from "@/components/ui/AnimatedPathImages";
import MobileHorizontalHomestay from "@/components/ui/MobileHorizontalHomestay";

export default function HomestayResponsiveSection() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileHorizontalHomestay /> : <PolaroidBoundingBox />;
}



