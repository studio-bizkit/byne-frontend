"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "COFFEE", href: "/coffee" },
    { name: "HOMESTAY", href: "/homestay" },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT US", href: "/contact", isButton: true },
  ];

  // choose text color based on section
  const textColor ="text-background";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-2">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center py-4">
            <Link href="/" className="text-xl text-primary w-14 h-full relative">
              <Image
                src="/nav-logo.svg"
                alt="logo"
                fill
                className="object-cover w-full h-full"
                priority
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex items-center space-x-8 relative">
            {navItems.map((item) => (
              <div key={item.name} className="relative flex items-center">
                {pathname === item.href && !item.isButton && (
                  <span className="absolute -left-1 w-2 h-2 bg-primary rounded-full"></span>
                )}
                <Link
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium ${
                    item.isButton
                      ? "bg-primary text-background rounded-full px-4 py-2"
                      : `${textColor} mix-blend-difference`
                  }`}
                >
                  {item.name}
                </Link>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
