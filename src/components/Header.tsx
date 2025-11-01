"use client";

import Image from "next/image";
import { motion, Variants, useTransform, useScroll } from "framer-motion";
import { useIsMobile } from "@/lib/useMediaQuery";
import { useEffect, useRef } from "react";
import Hls from "hls.js";
import mux from "mux-embed";

const fadeUp: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

interface HeaderProps {
  page: string; // accept any string now
}

const pageContent: Record<
  string,
  { bgImage?: string; bgVideo?: string; title?: string }
> = {
  home: { bgImage: "/home-bg-new.png" },
  coffee: {
    bgVideo:
      "https://stream.mux.com/pEzpFypO9g01qDEhUdYe7eAxsyPBAsfGhXQm004cxXVY8",
    bgImage: "/coffee-bg.png",
    title: "Huro Coffee",
  },
  homestay: { bgImage: "/homestay-bg.png", title: "Villa Bynekere" },
  about: { bgImage: "/about-bg.png", title: "About Huro" },
};

export default function Header({ page }: HeaderProps) {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 1000], [1, 1.9]);
  const logoScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const opacity = useTransform(scrollY, [0, 300], [0.3, 1]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const content = pageContent[page] || pageContent["home"]; // fallback to home

  useEffect(() => {
    if (!content.bgVideo || !videoRef.current) return;

    let hls: Hls | null = null;
    const video = videoRef.current;
    const initTime = mux.utils.now();

    const initializeVideo = async () => {
      try {
        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          // Native HLS support (Safari)
          video.src = content.bgVideo!;
          video.play().catch(err => {
            console.error("Error playing video:", err);
          });
        } else if (Hls.isSupported()) {
          // HLS.js for other browsers
          hls = new Hls({
            enableWorker: true,
            lowLatencyMode: false,
          });

          hls.loadSource(content.bgVideo!);
          hls.attachMedia(video);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(err => {
              console.error("Error playing video:", err);
            });
          });

          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  console.error("Fatal network error, trying to recover...");
                  hls?.startLoad();
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  console.error("Fatal media error, trying to recover...");
                  hls?.recoverMediaError();
                  break;
                default:
                  console.error("Fatal error destroying HLS instance");
                  hls?.destroy();
                  break;
              }
            }
          });

          // Initialize Mux monitoring
          mux.monitor(video, {
            debug: false,
            hlsjs: hls,
            Hls,
            data: {
              env_key: process.env.NEXT_PUBLIC_MUX_ENV_KEY, // You'll need to add this to your .env
              player_name: `${page} Header Video`,
              player_init_time: initTime,
              video_title: content.title || `${page} Page Header`,
            },
          });
        } else {
          console.error("HLS is not supported in this browser");
        }
      } catch (error) {
        console.error("Error initializing video:", error);
      }
    };

    initializeVideo();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [content.bgVideo, content.title, page]);

  return (
    <div className="flex flex-col">
      <motion.div
        className="relative h-screen w-full bg-black"
        custom={isMobile ? 1 : 2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="relative h-screen overflow-hidden">
          {page === "home" && (
            <div className="absolute inset-0 bg-black/50 z-1 overflow-hidden" />
          )}
          {page === "coffee" && (
            <div className="absolute inset-0 bg-black/20 z-1 overflow-hidden" />
          )}
          {/* Background */}
          <motion.div className="absolute inset-0" style={{ scale }}>
            <div className="relative h-full w-full">
              {content.bgVideo ? (
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover object-[40%_center] sm:object-center"
                  playsInline
                  loop
                  muted
                  autoPlay
                  data-mux-complete="false"
                  onLoadedData={e => {
                    e.currentTarget.dataset.muxComplete = "true";
                    window.dispatchEvent(new Event("mux-video-ready"));
                  }}
                />
              ) : (
                <Image
                  src={content.bgImage!}
                  alt={content.title || "Background"}
                  fill
                  className="object-cover object-[40%_center] sm:object-center"
                  priority
                />
              )}
            </div>
          </motion.div>
          {page !== "home" && (
            <motion.div
              className="absolute inset-x-0 bottom-0 h-1/12 bg-gradient-to-t from-background via-background/30 to-transparent"
              style={{ opacity }}
            />
          )}

          {/* Overlay */}
          {content.title ? (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{ scale: logoScale }}
            >
              {(() => {
                const words = content.title.split(" ");
                const lastWord = words.pop();
                return (
                  <h1 className="text-6xl sm:text-8xl font-serif text-background text-center px-4">
                    {words.join(" ")}{" "}
                    <span className={`${page === "coffee" ? "" : "italic"}`}>
                      {lastWord}
                    </span>
                  </h1>
                );
              })()}
            </motion.div>
          ) : (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{ scale: logoScale }}
            >
              <div className="md:h-1/3 h-1/4 relative aspect-square">
                <Image
                  src="/hero-logo.svg"
                  quality={100}
                  unoptimized={true}
                  alt="Bynekere Estate Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
