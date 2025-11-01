import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { ProgressiveBlur } from "@/components/ui/ProgressiveBlur";
import Footer from "@/components/Footer";
import { TextReveal } from "@/components/ui/ScrollRevealText";
import RoomSlider from "@/components/ui/RoomSlider";
import { ActivitesComponent } from "@/components/ui/ActivitesComponent";
import HomestayResponsiveSection from "@/components/ui/HomestayResponsiveSection";

export const metadata: Metadata = {
  title: "Villa Bynekere | Luxury Homestay in Chickmagalur",
  description: "Experience luxury at Villa Bynekere homestay in Chickmagalur. Nestled in the Western Ghats, our stylish hilltop villa offers private accommodations, outdoor activities, and breathtaking views.",
  openGraph: {
    title: "Villa Bynekere | Luxury Homestay in Chickmagalur",
    description: "Experience luxury at Villa Bynekere homestay in Chickmagalur. Nestled in the Western Ghats, our stylish hilltop villa offers private accommodations and breathtaking views.",
    images: [
      {
        url: "https://i.ibb.co/zhQnBFh4/image.png",
        width: 1200,
        height: 630,
        alt: "Villa Bynekere - Luxury Homestay in Chickmagalur",
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
        <Header page={"homestay"} />
      </section>
      <section className="max-w-5xl mx-auto py-12">
          <section className="flex flex-col items-center justify-center space-y- text-center pt-24 md:py-24">
            <TextReveal className="md:h-[20vh] h-[15vh] md:max-w-7xl max-w-xs">
              Situated in the western ghats and a short drive from the town of
              chickmagalur, &apos;Villa Bynekere&apos; Homestay offers you an
              escape to a private and stylish villa right on top of a hill.
            
              A place tastefully done to allow you to feel at home. We offer you
              ample space to lounge to catch up for a chat or gather around for
              some board games and outdoor activities.
            </TextReveal>
          </section>
      </section>
      <HomestayResponsiveSection />
      <RoomSlider />
      {/* <SemicircleScrollAnimation /> */}
      {/* <ActivitesComponent /> */}
      <Footer />
    </main>
  );
}
