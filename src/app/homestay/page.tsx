import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { ProgressiveBlur } from "@/components/ui/ProgressiveBlur";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ui/ScrollRevealText";
import PolaroidBoundingBox from "@/components/ui/AnimatedPathImages";
import RoomSlider from "@/components/ui/RoomSlider";
import SemicircleScrollAnimation from "@/components/ui/AnimatedBean";
import { ActivitesComponent } from "@/components/ui/ActivitesComponent";

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
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
        <ScrollReveal baseOpacity={0} enableBlur={false} baseRotation={5}>
          The perfect escape into Chikmagalur’s lush coffee country. Wake up to
          fresh brews, rolling hills, and the calm of untouched nature. Villa
          Bynekere is where relaxation meets tradition.
        </ScrollReveal>
      </section>
      <PolaroidBoundingBox />
      <RoomSlider />
      {/* <SemicircleScrollAnimation /> */}
      <ActivitesComponent />
      <Footer />
    </main>
  );
}
