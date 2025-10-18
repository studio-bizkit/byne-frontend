import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Huro - Home | Premium Coffee & Homestay Experience",
  description: "Welcome to Huro - your gateway to exceptional coffee experiences and luxury homestay accommodations in Chickmagalur. Discover our story, premium products, and unforgettable hospitality.",
  openGraph: {
    title: "Huro - Home | Premium Coffee & Homestay Experience",
    description: "Welcome to Huro - your gateway to exceptional coffee experiences and luxury homestay accommodations in Chickmagalur.",
    images: [
      {
        url: "https://i.ibb.co/zhQnBFh4/image.png",
        width: 1200,
        height: 630,
        alt: "Huro - Premium Coffee & Homestay Experience",
      },
    ],
  },
};

export default function Home() {
  return <HomeClient />;
}
