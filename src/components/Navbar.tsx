"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";

export default function Navbar({
  shouldChangeColor = true,
  isHorizontalSectionVisible = false,
}: {
  shouldChangeColor?: boolean;
  isHorizontalSectionVisible?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, [scrollY]);

  // Always call useTransform hooks (fixing the conditional hook issue)
  const textColorTransform = useTransform(
    scrollY,
    [0, windowHeight],
    ["rgb(245, 230, 211)", "rgb(0, 51, 153)"]
  );
  const logoOpacityTransform = useTransform(
    scrollY,
    [0, windowHeight / 2],
    [1, 0]
  );
  const blueLogoOpacityTransform = useTransform(
    scrollY,
    [0, windowHeight / 2],
    [0, 1]
  );

  // Apply transforms conditionally
  const textColor = isHorizontalSectionVisible
    ? "rgb(245, 230, 211)" // text-background color when horizontal section is visible
    : shouldChangeColor
    ? textColorTransform
    : "rgb(0, 51, 153)";
  const logoOpacity = isHorizontalSectionVisible
    ? 1 // Show white logo when horizontal section is visible
    : shouldChangeColor
    ? logoOpacityTransform
    : 0;
  const blueLogoOpacity = isHorizontalSectionVisible
    ? 0 // Hide blue logo when horizontal section is visible
    : shouldChangeColor
    ? blueLogoOpacityTransform
    : 1;

  const navItems = [
    { name: "COFFEE", href: "/coffee" },
    { name: "HOMESTAY", href: "/homestay" },
    { name: "ABOUT US", href: "/about" },
    { name: "Contact Us", href: "/contact", isButton: true },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 pt-2">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center py-4 relative w-24 h-20">
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
                    <motion.span
                      className="absolute -left-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: textColor }}
                    ></motion.span>
                  )}
                  <motion.div
                    className={`px-3 py-1 ${
                      item.isButton
                        ? "font-serif text-lg font-light bg-primary text-background rounded-full px-6 py-1"
                        : "text-sm font-semibold"
                    }`}
                    style={{
                      color: !item.isButton ? textColor : undefined,
                    }}
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none relative z-60"
                whileTap={{ scale: 0.95 }}
                style={{ color: textColor }}
              >
                <span className="sr-only">Open main menu</span>
                <motion.div
                  animate={isOpen ? "open" : "closed"}
                  className="w-6 h-6 relative"
                >
                  <motion.span
                    className="absolute block h-0.5 w-6 bg-current transform"
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 8 },
                    }}
                    style={{ top: 6 }}
                  />
                  <motion.span
                    className="absolute block h-0.5 w-6 bg-current transform"
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    style={{ top: 12 }}
                  />
                  <motion.span
                    className="absolute block h-0.5 w-6 bg-current transform"
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -8 },
                    }}
                    style={{ top: 18 }}
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 sm:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.4,
              }}
              className="relative h-full flex flex-col justify-center items-center bg-background"
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-md focus:outline-none"
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">Close menu</span>
                <div className="w-6 h-6 relative">
                  <span
                    className="absolute block h-0.5 w-6 bg-primary transform rotate-45"
                    style={{ top: 11 }}
                  />
                  <span
                    className="absolute block h-0.5 w-6 bg-primary transform -rotate-45"
                    style={{ top: 11 }}
                  />
                </div>
              </motion.button>

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
              >
                <div className="flex items-center py-4 relative w-36 h-20">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <Image
                      src="/nav-blue-logo.svg"
                      alt="logo"
                      fill
                      className="object-contain w-full h-full"
                      priority
                    />
                  </Link>
                </div>
              </motion.div>

              {/* Navigation Items */}
              <div className="flex flex-col items-center space-y-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="relative"
                  >
                    {pathname === item.href && !item.isButton && (
                      <motion.span
                        layoutId="mobile-active-indicator"
                        className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary rounded-full"
                      />
                    )}
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block text-center transition-colors duration-200 ${
                        item.isButton
                          ? "font-serif text-xl font-light bg-primary text-background rounded-full px-8 py-3 hover:bg-opacity-90"
                          : "text-2xl font-semibold text-primary hover:text-opacity-80"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Decorative Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16"
              >
                <div className="w-24 h-0.5 bg-primary opacity-30"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
