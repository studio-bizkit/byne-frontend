"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Footer = ({ withForm = true }) => {
    const { scrollYProgress } = useScroll();
    const yTransform = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const navItems = [
        { name: "COFFEE", href: "/coffee" },
        { name: "HOMESTAY", href: "/homestay" },
        { name: "ABOUT US", href: "/about" },
        { name: "CONTACT US", href: "/contact", isButton: true },
    ];
    return (
        <footer className="relative w-full overflow-visible bg-background flex flex-col items-center justify-center" >
            {withForm && (
                <motion.div style={{ }} className="relative mb-20">
                    {/* Top-right Image */}
                    <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/ ">
                        <Image
                            src="/form-pin.png"
                            width={160}
                            height={160}
                            alt="decorative pin"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Form Container */}
                    <div className="bg-primary text-background py-9 w-xs md:w-6xl rounded-xl">
                        <div className="container mx-auto px-6 lg:px-8 w-full">
                            <div className="w-full mx-auto">
                                <div className="flex flex-col lg:flex-col gap-8 items-start justify-between">
                                    {/* Form Title and Decorative Element */}
                                    <div className="flex-1">
                                        <h2 className="text-5xl lg:text-6xl font-serif">Enquire Now</h2>
                                    </div>

                                    {/* Form */}
                                    <div className="flex-1 w-full">
                                        <form className="space-y-6">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                {/* Full Name */}
                                                <div>
                                                    <label htmlFor="fullName" className="block text-sm font-medium mb-2 tracking-wider">
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
                                                    <label htmlFor="location" className="block text-sm font-medium mb-2 tracking-wider">
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
                                                    <label htmlFor="email" className="block text-sm font-medium mb-2 tracking-wider">
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
                                                    <label htmlFor="phone" className="block text-sm font-medium mb-2 tracking-wider">
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
                                                <label htmlFor="message" className="block text-sm font-medium mb-2 tracking-wider">
                                                    ANY MESSAGE
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    rows={3}
                                                    placeholder="enter a message"
                                                    className="w-full bg-transparent border-b border-background/50 pb-2 text-background placeholder-background/70 focus:border-background focus:outline-none transition-colors resize-none"
                                                />
                                            </div>

                                            {/* Submit Button */}
                                            <div className="pt-4">
                                                <button
                                                    type="submit"
                                                    className="bg-background text-primary px-8 py-3 rounded-full font-medium hover:bg-background/90 transition-colors"
                                                >
                                                    Submit
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
                className="w-full relative bg-gradient-to-b from-background to-primary overflow-x-hidden overflow-y-visible scrollbar-none"
                style={{ paddingTop: `${100 / 1.497}%` }} // ≈ 66.8%
            >
                <motion.div style={{ scale: yTransform }} className="absolute top-0 left-0 w-full h-full overflow-y-visible">
                    <Image
                        src="/footer.png"
                        alt="Coffee plantation illustration"
                        fill
                        style={{ objectFit: "contain", objectPosition: "top" }}
                        priority
                    />
                </motion.div>
            </div>




            {/* Main Footer Content - Blue Section */}
            <div className="w-full bg-primary text-background relative z-10">
                <div className="container mx-auto px-24 pt-8 pb-16">
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
                        <div className="text-left flex flex-row gap-12">
                            <div className="">
                                <h3 className="text-2xl font-medium mb-3 font-serif">Social Media</h3>
                                <div className="flex justify-end gap-4 mb-4">
                                    <a
                                        href="#"
                                        className="w-6 h-6 flex items-center justify-center hover:text-background/50 transition-colors"
                                        aria-label="Instagram"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="w-6 h-6 flex items-center justify-center hover:text-background/50 transition-colors"
                                        aria-label="WhatsApp"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="w-6 h-6 flex items-center justify-center hover:text-background/50 transition-colors"
                                        aria-label="TripAdvisor"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 48 48"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g transform="scale(1.4)">
                                                <path d="M13.1318 18.5821C13.1318 19.0704 12.987 19.5477 12.7157 19.9537C12.4444 20.3597 12.0588 20.6761 11.6077 20.863C11.1566 21.0498 10.6602 21.0987 10.1813 21.0035C9.70237 20.9082 9.26247 20.6731 8.91719 20.3278C8.57192 19.9825 8.33678 19.5426 8.24152 19.0637C8.14626 18.5848 8.19515 18.0884 8.38201 17.6373C8.56887 17.1862 8.88531 16.8006 9.29131 16.5293C9.69731 16.258 10.1746 16.1132 10.6629 16.1132C11.3177 16.1132 11.9457 16.3733 12.4087 16.8363C12.8717 17.2993 13.1318 17.9273 13.1318 18.5821V18.5821ZM24.5783 16.1132C24.09 16.1132 23.6127 16.258 23.2067 16.5293C22.8007 16.8006 22.4843 17.1862 22.2974 17.6373C22.1105 18.0884 22.0617 18.5848 22.1569 19.0637C22.2522 19.5426 22.4873 19.9825 22.8326 20.3278C23.1779 20.6731 23.6178 20.9082 24.0967 21.0035C24.5756 21.0987 25.072 21.0498 25.5231 20.863C25.9742 20.6761 26.3598 20.3597 26.6311 19.9537C26.9024 19.5477 27.0472 19.0704 27.0472 18.5821C27.047 17.9276 26.787 17.3001 26.3243 16.8373C25.8616 16.3744 25.2341 16.1143 24.5797 16.1139L24.5783 16.1132ZM31.5391 18.5821C31.5391 22.4242 28.4215 25.5391 24.5783 25.5391C22.8252 25.5419 21.1362 24.8803 19.8515 23.6874L17.6237 26.1114L15.3949 23.6847C14.1103 24.8788 12.4206 25.5415 10.6667 25.5391C6.82627 25.5391 3.70969 22.4242 3.70969 18.5821C3.70839 17.6141 3.90961 16.6567 4.30043 15.7712C4.69125 14.8856 5.26301 14.0917 5.97898 13.4403L3.70215 10.9633H8.76055C11.376 9.18331 14.4665 8.23145 17.6302 8.23145C20.7939 8.23145 23.8844 9.18331 26.4999 10.9633H31.5453L29.2688 13.4403C29.985 14.0916 30.557 14.8855 30.9481 15.771C31.3391 16.6565 31.5406 17.614 31.5395 18.5821H31.5391ZM15.3729 18.5821C15.3729 17.6508 15.0968 16.7405 14.5794 15.9662C14.0621 15.192 13.3267 14.5885 12.4664 14.2321C11.606 13.8758 10.6593 13.7826 9.74598 13.9643C8.83265 14.146 7.99371 14.5944 7.33525 15.2529C6.6768 15.9114 6.2284 16.7504 6.04677 17.6637C5.86514 18.5771 5.95843 19.5238 6.31484 20.3841C6.67125 21.2444 7.27478 21.9797 8.0491 22.497C8.82342 23.0144 9.73376 23.2904 10.665 23.2904C11.2833 23.2904 11.8956 23.1687 12.4668 22.9321C13.0381 22.6955 13.5571 22.3487 13.9944 21.9114C14.4316 21.4742 14.7784 20.9552 15.015 20.3839C15.2516 19.8127 15.3733 19.2004 15.3733 18.5821H15.3729ZM22.8481 11.5527C21.1924 10.8629 19.4165 10.5077 17.6229 10.5077C15.8292 10.5077 14.0533 10.8629 12.3976 11.5527C15.3702 12.6904 17.6237 15.3479 17.6237 18.4463C17.6237 15.3482 19.8769 12.6904 22.8484 11.553L22.8481 11.5527ZM29.2877 18.5821C29.2877 17.6508 29.0115 16.7405 28.4941 15.9662C27.9768 15.192 27.2414 14.5885 26.3811 14.2321C25.5207 13.8758 24.574 13.7826 23.6607 13.9643C22.7474 14.146 21.9084 14.5944 21.25 15.2529C20.5915 15.9114 20.1431 16.7504 19.9615 17.6637C19.7798 18.5771 19.8731 19.5238 20.2296 20.3841C20.586 21.2444 21.1895 21.9797 21.9638 22.497C22.7381 23.0144 23.6485 23.2904 24.5797 23.2904C25.8284 23.2904 27.026 22.7943 27.909 21.9113C28.7919 21.0284 29.288 19.8308 29.288 18.5821H29.2877Z" fill="currentColor" />
                                            </g>
                                        </svg>
                                    </a>

                                </div>
                            </div>

                            <div className="">
                                <h3 className="text-2xl font-medium font-serif mb-3">Contact</h3>
                                <p className="text-lg">+91 72002 74687</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="mt-12 pt-8">
                        <div className="flex flex-col lg:flex-row justify-between items-center">

                            <p className="text-sm text-background text-center lg:text-right">
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
                                by <a
                                    href="https://studiobizkit.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline decoration-[1px] decoration-current"
                                >
                                    Studio Bizkit
                                </a>

                            </p>
                            <p className="text-sm text-background text-center lg:text-right ">
                                © 2025 Byne Coffee
                            </p>

                            <nav className="flex flex-wrap gap-8 mb-6 lg:mb-0">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`text-sm font-medium tracking-wider transition-colors hover:text-background/70`}
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