"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, [scrollY]);

  const textColor = useTransform(
    scrollY,
    [0, windowHeight],
    ["rgb(245, 230, 211)", "rgb(0, 51, 153)"]
  );
  const logoOpacity = useTransform(scrollY, [0, windowHeight / 2], [1, 0]);
  const blueLogoOpacity = useTransform(scrollY, [0, windowHeight / 2], [0, 1]);

  const navItems = [
    { name: "COFFEE", href: "/coffee" },
    { name: "HOMESTAY", href: "/homestay" },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT US", href: "/contact", isButton: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-2">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center py-4 relative w-14 h-14">
            <Link href={"/"}>
              <motion.div
                style={{ opacity: logoOpacity }}
                className="absolute inset-0"
              >
                <Image
                  src="/nav-logo.svg"
                  alt="logo"
                  fill
                  className="object-contain w-full h-full"
                  priority
                />
              </motion.div>
              <motion.div
                style={{ opacity: blueLogoOpacity }}
                className="absolute inset-0"
              >
                <Image
                  src="/nav-blue-logo.svg"
                  alt="blue logo"
                  fill
                  className="object-contain w-full h-full"
                  priority
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex items-center space-x-8 relative">
            {navItems.map(item => (
              <div key={item.name} className="relative flex items-center">
                {pathname === item.href && !item.isButton && (
                  <span className="absolute -left-1 w-2 h-2 bg-primary rounded-full"></span>
                )}
                <motion.div
                  className={`px-3 py-2 text-sm font-semibold ${
                    item.isButton
                      ? "bg-primary text-background rounded-full px-4 py-2"
                      : ""
                  }`}
                  style={{ color: !item.isButton ? textColor : undefined }}
                >
                  <Link href={item.href}>{item.name}</Link>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
