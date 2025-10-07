import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { ProgressiveBlur } from "@/components/ui/ProgressiveBlur";
import Footer from "@/components/Footer";
import { TextReveal } from "@/components/ui/ScrollRevealText";
import RoomSlider from "@/components/ui/RoomSlider";
import { ActivitesComponent } from "@/components/ui/ActivitesComponent";
import HomestayResponsiveSection from "@/components/ui/HomestayResponsiveSection";

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
          <section className="flex flex-col items-center justify-center space-y- text-center">
            <TextReveal className="h-[30vh] max-w-7xl">
              Situated in the western ghats and a short drive from the town of
              chickmagalur, &apos;Villa Bynekere&apos; Homestay offers you an
              escape to a private and stylish villa right on top of a hill.
            </TextReveal>

            <TextReveal className="h-[30vh] max-w-7xl">
              A place tastefully done to allow you to feel at home. We offer you
              ample space to lounge to catch up for a chat or gather around for
              some board games and outdoor activities.
            </TextReveal>
          </section>
      </section>
      <HomestayResponsiveSection />
      <RoomSlider />
      {/* <SemicircleScrollAnimation /> */}
      <ActivitesComponent />
      <Footer />
    </main>
  );
}
