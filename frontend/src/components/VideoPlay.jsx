import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";


const stories = [
  { video: "/videos/video1.mp4" },
  { video: "/videos/video2.mp4" },
  { video: "/videos/video3.mp4" },
  { video: "/videos/video4.mp4" },
  { video: "/videos/video5.mp4" },
];


const VideoCard = ({ containerRef, src, top, left, rotate }) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-video");
    let maxZIndex = -Infinity;

    els.forEach((el) => {
      const z = parseInt(window.getComputedStyle(el).zIndex);
      if (!isNaN(z) && z > maxZIndex) maxZIndex = z;
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.div
      onMouseDown={updateZIndex}
      style={{ top, left, rotate, zIndex }}
      className={twMerge(
        "drag-video absolute w-40 sm:w-56 md:w-72 rounded-xl overflow-hidden shadow-xl cursor-grab active:cursor-grabbing"
      )}
      drag
      dragConstraints={containerRef}
      dragElastic={0.6}
    >
      <video
        src={src}
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};


const VideoPlay = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Handle resize (important for responsiveness)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (

    <div
      ref={containerRef}
      className="relative w-full min-h-[100dvh] overflow-hidden  touch-pan-y"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08),transparent_60%)]" />

     

      {/* DRAGGABLE VIDEO CARDS */}
      <div className="absolute inset-0 z-10">
        {stories.map((story, i) => (
          <VideoCard
            key={i}
            containerRef={containerRef}
            src={story.video}
            top={
              isMobile
                ? `${15 + i * 18}%`           // mobile layout
                : `${20 + (i % 3) * 20}%`    // desktop layout
            }
            left={
              isMobile
                ? `${10 + (i % 2) * 45}%`    // 2-column mobile
                : `${10 + i * 15}%`
            }
            rotate={`${i % 2 === 0 ? 8 : -8}deg`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoPlay;