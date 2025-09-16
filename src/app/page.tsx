import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Timeline from "@/components/Timeline";
import HorizontalCardSection from "@/components/ui/HorizontalCardSection";
import ScrollingText from "@/components/ScrollingText";

export default function Home() {
  return (
    <main className="relative bg-background">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <section className="relative">
        <Header />
      </section>
      <Timeline />
      <ScrollingText />
      <HorizontalCardSection />
    </main>
  );
}
