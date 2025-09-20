import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { ProgressiveBlur } from "@/components/ui/ProgressiveBlur";
import CoffeeCarousel from "@/components/ui/HorizontalScrollCarousel";
import AnimatedProductCards from "@/components/ui/AnimatedProductCards";
import AnimatedReviews from "@/components/ui/TestimonialCards";
import Footer from "@/components/Footer";

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
      <CoffeeCarousel />
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-serif mb-4 text-primary text-center">
          From washed, natural, and honey methods to our signature 23-hour sugarcane juice fermentation, every process highlights unique flavors. Rooted in sustainability, each cup tells the story of our land and people.</h2>
      </section>
      <AnimatedProductCards />
      <AnimatedReviews />
      <Footer />
    </main>
  );
}