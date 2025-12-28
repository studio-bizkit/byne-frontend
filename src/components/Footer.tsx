"use client";
import { useIsMobile } from "@/lib/useMediaQuery";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

const Footer = ({ withForm = true }) => {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  const yTransform = useTransform(scrollYProgress, [0, 1], [isMobile ? 3 : 2.1, 1]);
  const navItems = [
    { name: "COFFEE", href: "/coffee" },
    // { name: "HOMESTAY", href: "/homestay" },
    // { name: "ABOUT US", href: "/about" },
    { name: "CONTACT US", href: "/contact", isButton: true },
  ];
  const [result, setResult] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");

    const form = event.currentTarget; // guaranteed to be HTMLFormElement
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
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <footer className="relative w-full overflow-visible bg-background flex flex-col items-center justify-center">
      {withForm && (
        <motion.div
          style={{}}
          className="relative mb-20 mt-10 md:mt-0 max-w-7xl"
        >
          {/* Top-right Image */}
          <div className="absolute top-0 right-0 -translate-y-1/6 translate-x-1 transition-transform duration-500 hover:-rotate-10 hover:-translate-y-[22px]">
            <Image
              src="/form-pin.png"
              width={160}
              height={160}
              alt="decorative pin"
              className="w-full h-full object-contain max-w-[140px] md:max-w-full"
            />
          </div>

          {/* Form Container */}
          <div className="bg-primary text-background py-9 w-xs md:w-7xl rounded-xl">
            <div className="container mx-auto px-6 lg:px-8 w-full">
              <div className="w-full mx-auto">
                <div className="flex flex-col lg:flex-col gap-8 items-start justify-between">
                  {/* Form Title and Decorative Element */}
                  <div className="flex-1">
                    <h2 className="text-5xl lg:text-6xl font-serif">
                      Enquire <span className="block lg:inline">Now</span>
                    </h2>
                  </div>

                  {/* Form */}
                  <div className="flex-1 w-full">
                    <form className="space-y-6" onSubmit={onSubmit}>
                      <input
                        type="hidden"
                        name="access_key"
                        value="651104ef-c4c5-4608-8de1-030859a0e3b3"
                      />

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                          <label
                            htmlFor="fullName"
                            className="block text-sm font-medium mb-2 tracking-wider"
                          >
                            FULL NAME
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="enter full name"
                            className="w-full bg-transparent border-b border-background/50 pb-2 text-background placeholder-background/70 focus:border-background focus:outline-none transition-colors"
                          />
                        </div>

                        {/* Location */}
                        <div>
                          <label
                            htmlFor="location"
                            className="block text-sm font-medium mb-2 tracking-wider"
                          >
                            LOCATION
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="enter city"
                            className="w-full bg-transparent border-b border-background/50 pb-2 text-background placeholder-background/70 focus:border-background focus:outline-none transition-colors"
                          />
                        </div>

                        {/* Email Address */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2 tracking-wider"
                          >
                            EMAIL ADDRESS
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="enter address"
                            className="w-full bg-transparent border-b border-background/50 pb-2 text-background placeholder-background/70 focus:border-background focus:outline-none transition-colors"
                          />
                        </div>

                        {/* Phone Number */}
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium mb-2 tracking-wider"
                          >
                            PHONE NUMBER
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="enter number"
                            className="w-full bg-transparent border-b border-background/50 pb-2 text-background placeholder-background/70 focus:border-background focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="lg:col-span-2">
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-1 tracking-wider"
                        >
                          ANY MESSAGE
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={1}
                          placeholder="enter a message"
                          className="w-full bg-transparent border-b border-background/50 pb-2 text-background placeholder-background/70 focus:border-background focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-1">
                        <button
                          type="submit"
                          className="bg-background text-primary px-10 py-1 rounded-full font-medium hover:bg-background/90 transition-colors font-serif"
                        >
                          {result ? (
                            <span className="text-sm font-normal">
                              {result}
                            </span>
                          ) : (
                            <span className="text-lg font-medium">Submit</span>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div
        className="w-full relative bg-gradient-to-b from-background to-primary overflow-x-hidden md:overflow-y-visible overflow-y-hidden scrollbar-none"
        style={{ paddingTop: `${100 / 1.595}%` }} // ≈ 62.7%
      >
        <motion.div
          style={{ scale: yTransform }}
          className="absolute top-0 left-0 w-full h-full overflow-y-visible"
        >
          <Image
            src="/footer-2.png"
            alt="Coffee plantation illustration"
            fill
            style={{ objectFit: "contain", objectPosition: "top" }}
            priority
          />
        </motion.div>
      </div>

      {/* Main Footer Content - Blue Section */}
      <div className="w-full bg-primary text-background relative z-10">
        <div className="container mx-auto px-6 sm:px-12 lg:px-24 pt-6 pb-10 lg:pt-8 lg:pb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            {/* Left Side - Brand */}
            <div className="mb-8 lg:mb-0">
              <Image
                src="/nav-logo.svg"
                alt="logo"
                width={200}
                height={100}
                priority
              />
            </div>
            {/* Right Side - Contact & Social */}
            <div className="text-left flex flex-row gap-6 lg:gap-12">
              <div className="">
                <h3 className="text-xl lg:text-2xl font-medium mb-3 font-serif">
                  Social Media
                </h3>
                <div className="flex justify-end gap-4 mb-4">
                  <a
                    href="https://www.instagram.com/hurocoffee?igsh=NGUzc3c5ZG5lZ2w4&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-6 h-6 flex items-center justify-center hover:text-background/50 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/919380747516"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-6 h-6 flex items-center justify-center hover:text-background/50 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                  </a>
                  <a
                    href="https://www.threads.net/@hurocoffee?igshid=NTc4MTIwNjQ2YQ=="
                    className="w-6 h-6 flex items-center justify-center hover:text-background/50 transition-colors"
                    aria-label="Threads"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 192 192"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="">
                <h3 className="text-xl lg:text-2xl font-medium font-serif mb-3">
                  Contact
                </h3>
                <p
                  className="text-base lg:text-lg"
                >
                  +91 93807 47516
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-10 lg:mt-12 pt-6 lg:pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-0">
              <p className="text-sm text-background text-left lg:text-right">
                Brewed with{" "}
                <span className="inline-block mx-1 -mt-2 align-middle">
                  <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block"
                  >
                    <path
                      d="M3.80054 0.892766C4.39058 0.792231 4.99566 0.825395 5.57118 0.989813C6.1467 1.15423 6.67798 1.44571 7.12587 1.84277L7.15054 1.86477L7.1732 1.84477C7.60067 1.46963 8.10322 1.18996 8.64732 1.02442C9.19142 0.858879 9.76457 0.811269 10.3285 0.884766L10.4925 0.908766C11.2034 1.03151 11.8678 1.3442 12.4155 1.81375C12.9632 2.28329 13.3737 2.8922 13.6035 3.57599C13.8333 4.25978 13.874 4.993 13.7211 5.69801C13.5683 6.40302 13.2276 7.05357 12.7352 7.58077L12.6152 7.7041L12.5832 7.73143L7.61654 12.6508C7.50192 12.7642 7.35007 12.8323 7.18912 12.8423C7.02818 12.8524 6.86904 12.8037 6.7412 12.7054L6.67854 12.6508L1.6832 7.70276C1.15402 7.18787 0.777671 6.53655 0.595844 5.82094C0.414017 5.10533 0.433805 4.35336 0.653017 3.64831C0.872229 2.94325 1.28231 2.31263 1.83785 1.82628C2.39338 1.33993 3.07269 1.01683 3.80054 0.892766Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>{" "}
                by{" "}
                <a
                  href="https://studiobizkit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[1px] decoration-current"
                >
                  Studio Bizkit
                </a>
              </p>

              <p className="text-sm text-background text-left lg:text-right">
                © 2025 Byne Coffee
              </p>

              <nav className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 lg:mb-0">
                {navItems.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium tracking-wider transition-colors hover:text-background/70"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
