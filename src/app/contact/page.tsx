"use client";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ProgressiveBlur } from "@/components/ui/ProgressiveBlur";
import Footer from "@/components/Footer";
import { FormEvent, useState } from "react";

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
  const [result, setResult] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "651104ef-c4c5-4608-8de1-030859a0e3b3");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      form.reset();
    } else {
      setResult(data.message || "Something went wrong");
    }
  };
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
            <form className="space-y-6" onSubmit={onSubmit}>
              <input type="hidden" name="access_key" value="651104ef-c4c5-4608-8de1-030859a0e3b3" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-2 tracking-wider">FULL NAME</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="enter full name"
                    className="w-full bg-transparent border-b border-primary/40 pb-2 text-primary placeholder-primary/70 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-2 tracking-wider">LOCATION</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="enter city"
                    className="w-full bg-transparent border-b border-primary/40 pb-2 text-primary placeholder-primary/70 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 tracking-wider">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="enter address"
                    className="w-full bg-transparent border-b border-primary/40 pb-2 text-primary placeholder-primary/70 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 tracking-wider">PHONE NUMBER</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="enter number"
                    className="w-full bg-transparent border-b border-primary/40 pb-2 text-primary placeholder-primary/70 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="md:w-1/2 md:pr-3">
                <label htmlFor="message" className="block text-sm font-medium mb-1 tracking-wider">ANY MESSAGE</label>
                <textarea
                  id="message"
                  name="message"
                  rows={1}
                  placeholder="enter a message"
                  className="w-full bg-transparent border-b border-primary/40 pb-2 text-primary placeholder-primary/70 focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-1">
                <button type="submit" className="bg-primary text-background px-8 py-1 rounded-full font-medium hover:bg-primary/90 transition-colors font-serif">
                  {result ? <span className="text-sm font-normal">{result}</span> : <span className="text-lg font-medium">Submit</span>}
                </button>
              </div>
            </form>
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
