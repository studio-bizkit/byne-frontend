import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ProgressiveBlur } from "@/components/ui/ProgressiveBlur";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Huro | Get in Touch with Us",
  description: "Contact Byne for inquiries about our premium coffee products and luxury homestay accommodations. Reach out to us for bookings, partnerships, or general information.",
  openGraph: {
    title: "Contact Huro | Get in Touch with Us",
    description: "Contact Huro for inquiries about our premium coffee products and luxury homestay accommodations. Reach out to us for bookings and general information.",
    images: [
      {
        url: "https://i.ibb.co/zhQnBFh4/image.png",
        width: 1200,
        height: 630,
        alt: "Contact Huro - Get in Touch with Us",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="relative bg-background">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar shouldChangeColor={false} />
      </div>

      {/* Blur layer under navbar */}
      <ProgressiveBlur
        className="fixed top-0 left-0 right-0 z-40"
        height="15%"
        position="top"
      />

      {/* Enquiry Section */}
      <section className="container mx-auto px-6 lg:px-8 pt-32 pb-48 max-w-5xl text-primary">
        <div className="grid grid-cols-1 gap-12">
          <div>
            <h2 className="text-5xl lg:text-6xl font-serif font-medium">Enquire Now</h2>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>

        <div className="border-t-2 border-primary mt-10 mb-10" />

        {/* Contact Us block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <h3 className="text-4xl lg:text-5xl font-serif font-medium">Contact Us</h3>
          </div>
          <div>
            <h4 className="text-2xl font-serif mb-1 font-medium">Address</h4>
            <p className="text-base">128 ABC ST</p>
            <p className="text-base">Chickmagalur, KA 577101</p>
          </div>
          <div>
            <h4 className="text-2xl font-serif mb-1 font-medium">Phone</h4>
            <p className="text-base">+91 72002 74687</p>
            <p className="text-base">+91 72002 74687</p>
          </div>
        </div>
      </section>

      <Footer withForm={false} />

    </main>
  );
}
