import type { Metadata } from "next";
import { Manrope, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "lenis/react";
import LoadingScreen from "@/components/LoadingScreen";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Huro - Premium Coffee & Homestay Experience",
  description: "Discover Byne's exceptional coffee blends and luxury homestay experiences in the heart of Chickmagalur. Experience the perfect blend of tradition and modernity.",
  openGraph: {
    title: "Huro - Premium Coffee & Homestay Experience",
    description: "Discover Byne's exceptional coffee blends and luxury homestay experiences in the heart of Chickmagalur. Experience the perfect blend of tradition and modernity.",
    images: [
      {
        url: "https://i.ibb.co/zhQnBFh4/image.png",
        width: 1200,
        height: 630,
        alt: "Huro - Premium Coffee & Homestay Experience",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huro - Premium Coffee & Homestay Experience",
    description: "Discover Byne's exceptional coffee blends and luxury homestay experiences in the heart of Chickmagalur.",
    images: ["https://i.ibb.co/zhQnBFh4/image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${manrope.variable} antialiased`}
      >
        <Analytics />
        <ReactLenis root />
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
