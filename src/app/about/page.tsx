import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { ProgressiveBlur } from "@/components/ui/ProgressiveBlur";
import Footer from "@/components/Footer";
import MissionValuesComponent from "@/components/ui/MissionValuesComponent";
import ProductRange from "@/components/ui/ProductRangeCards";

export const metadata: Metadata = {
  title: "About Huro | Our Story, Mission & Values",
  description: "Learn about Huro's journey, mission, and values. Discover our commitment to quality coffee, sustainable practices, and exceptional hospitality in Chickmagalur.",
  openGraph: {
    title: "About Huro | Our Story, Mission & Values",
    description: "Learn about Huro's journey, mission, and values. Discover our commitment to quality coffee, sustainable practices, and exceptional hospitality.",
    images: [
      {
        url: "https://i.ibb.co/zhQnBFh4/image.png",
        width: 1200,
        height: 630,
        alt: "About Huro - Our Story, Mission & Values",
      },
    ],
  },
};

export default function About() {
  return (
    <main className="relative bg-background">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Blur layer under navbar */}
      <ProgressiveBlur
        className="fixed top-0 left-0 right-0 z-40"
        height="15%"
        position="top"
      // blurLevels={[2, 4, 8, 16, 32]}
      />


      {/* Content */}
      <section className="relative">
        <Header page={"about"} />
      </section>
      <MissionValuesComponent />

      <ProductRange />
      <Footer />
    </main>
  );
}