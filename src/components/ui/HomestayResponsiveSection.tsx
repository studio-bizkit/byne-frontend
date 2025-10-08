"use client";
import { useIsMobile } from "@/lib/useMediaQuery";
import PolaroidBoundingBox from "@/components/ui/AnimatedPathImages";
import MobileHorizontalHomestay from "@/components/ui/MobileHorizontalHomestay";

export default function HomestayResponsiveSection() {
  const isMobile = useIsMobile();
  const images = [
    {
      id: 1,
      src: "/homestay/2.png",
      title: "Estate Tour",
      subtitle: "Coffee Plantation Visit",
      width:320,
      height:  240,
    },
    {
      id: 2,
      src: "/homestay/3.png",
      title: "Free Wi-Fi",
      subtitle: "Stay Connected",
      width: 240,
      height: 320,
    },
    {
      id: 3,
      src: "/homestay/4.png",
      title: "Trekking",
      subtitle: "Explore the Hills",
      width: 200,
      height: 250,
    },
    {
      id: 4,
      src: "/homestay/5.png",
      title: "Late Check-Out",
      subtitle: "Flexible Stays",
      width: 170,
      height: 230,
    },
    {
      id: 5,
      src: "/homestay/6.png",
      title: "Bar",
      subtitle: "Outdoor Refreshments",
      width: 320,
      height: 240,
    },
    {
      id: 6,
      src: "/homestay/7.png",
      title: "Outdoor Activities",
      subtitle: "Play & Relax",
      width: 190,
      height: 260,
    },
    {
      id: 7,
      src: "/homestay/1.png",
      title: "Barbeque",
      subtitle: "Evening Grill Setup",
      width: 220,
      height: 160,
    },
  ];
  return isMobile ? <MobileHorizontalHomestay images={images} /> : <PolaroidBoundingBox images={images} />;
}



