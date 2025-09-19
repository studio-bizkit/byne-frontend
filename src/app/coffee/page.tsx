import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Timeline from "@/components/Timeline";
import HorizontalCardSection from "@/components/ui/HorizontalCardSection";
import ScrollingText from "@/components/ScrollingText";
import ScrollRevealCards from "@/components/ui/ScrollRevealCards";
import { ProgressiveBlur } from "@/components/ui/ProgressiveBlur";

export default function Home() {
  return (
    <main className="relative bg-background">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Blur layer under navbar */}
      <ProgressiveBlur
        className="fixed top-0 left-0 right-0 z-40"
        height="20%"
        position="top"
      // blurLevels={[2, 4, 8, 16, 32]}
      />


      {/* Content */}
      <section className="relative">
        <Header page={"coffee"} />
      </section>
      <Timeline />
      <HorizontalCardSection />
      <ScrollingText />
      <ScrollRevealCards />
    </main>
  );
}