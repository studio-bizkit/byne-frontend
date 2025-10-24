import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { ProgressiveBlur } from "@/components/ui/ProgressiveBlur";
import CoffeeCarousel from "@/components/ui/HorizontalScrollCarousel";
import AnimatedProductCards from "@/components/ui/AnimatedProductCards";
import AnimatedReviews from "@/components/ui/TestimonialCards";
import Footer from "@/components/Footer";
import { TextReveal } from "@/components/ui/ScrollRevealText";

export const metadata: Metadata = {
  title: "Huro Coffee | Premium Coffee Blends & Products",
  description: "Explore Huro's premium coffee collection. From carefully sourced beans to expertly crafted blends, discover exceptional coffee products that elevate your daily brew experience.",
  openGraph: {
    title: "Huro Coffee | Premium Coffee Blends & Products",
    description: "Explore Huro's premium coffee collection. From carefully sourced beans to expertly crafted blends, discover exceptional coffee products.",
    images: [
      {
        url: "https://i.ibb.co/zhQnBFh4/image.png",
        width: 1200,
        height: 630,
        alt: "Huro Coffee - Premium Coffee Blends & Products",
      },
    ],
  },
};

export default function Coffee() {
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
        <Header page={"coffee"} />
      </section>
      {/* <Timeline /> */}
      {/* <CoffeeCarousel /> */}
      <section className="max-w-5xl pt-32 pb-20 mx-auto px-12 sm:px-6 lg:px-8">
        <TextReveal className="h-[30vh] max-w-7xl">
          At HURO, we don’t just craft products — we design experiences. Each
          HURO creation blends precision, purpose, and passion, rooted in our
          commitment to quality, sustainability, and modern design. From the
          first idea to the final detail, our products are built to elevate
          everyday living. Effortless, timeless, and distinctly HURO.
        </TextReveal>
      </section>
      <AnimatedProductCards />
      <AnimatedReviews />
      <Footer />
    </main>
  );
}
