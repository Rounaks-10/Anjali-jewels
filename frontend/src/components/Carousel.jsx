import React, { useState, useEffect } from "react";

const images = [
  "/assets/home/slide1.webp",
  "/assets/home/slide2.webp",
  "/assets/home/slide3.webp",
  "/assets/home/slide4.webp",
  "/assets/home/slide5.webp",
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden mt-20 sm:mt-0 md:mt-8 lg:mt-0">
      {/* Image */}
      <img
        src={images[index]}
        alt="carousel"
        className="w-full h-full object-cover object-center"
      />

      {/* Diamond Indicators */}
      <div className="absolute bottom-2 lg:bottom-10 md:bottom-10 w-full flex justify-center gap-4">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`
              w-4 h-4 
              rotate-45 
              border-2 border-[#8B4513]
              cursor-pointer 
              transition-all duration-300
              ${i === index ? "bg-[#8B4513] scale-110" : "bg-transparent"}
            `}
          ></div>
        ))}
      </div>
    </div>
  );
}
