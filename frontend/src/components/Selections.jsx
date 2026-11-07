import React from 'react';

const Selections = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl tracking-wide text-gray-900">
          Anjali – The Realm of Timeless Jewels
        </h2>
        <p className="text-gray-600 mt-2 text-base md:text-lg">
          Where every jewel meets elegance.
        </p>
      </div>

      {/* Grid Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ---------- WEDDING (320px desktop) ---------- */}
        <div className="relative overflow-hidden rounded-xl group h-[260px] md:h-[320px]">
          <img
            src="/assets/home/tw-nt-wedding-desktop.webp"
            alt="Wedding"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t 
            from-[#4A2C2A] via-[#4A2C2A]/70 to-transparent 
            flex items-end justify-center pb-4">
            <p className="text-white text-lg md:text-xl font-medium tracking-wide drop-shadow-md">
              Wedding
            </p>
          </div>
        </div>

        {/* ---------- DIAMOND (380px desktop) ---------- */}
        <div className="relative overflow-hidden rounded-xl group h-[300px] md:h-[380px]">
          <img
            src="/assets/home/fod-diamond-desktop.webp"
            alt="Diamond"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t 
            from-[#4A2C2A] via-[#4A2C2A]/70 to-transparent 
            flex items-end justify-center pb-4">
            <p className="text-white text-lg md:text-xl font-medium tracking-wide drop-shadow-md">
              Diamond
            </p>
          </div>
        </div>

        {/* ---------- GOLD (380px desktop, negative margin only on desktop) ---------- */}
        <div className="relative overflow-hidden rounded-xl group h-[300px] md:h-[380px] md:-mt-15">
          <img
            src="/assets/home/tw-nt-gold-desktop.webp"
            alt="Gold"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t 
            from-[#4A2C2A] via-[#4A2C2A]/70 to-transparent 
            flex items-end justify-center pb-4">
            <p className="text-white text-lg md:text-xl font-medium tracking-wide drop-shadow-md">
              Gold
            </p>
          </div>
        </div>

        {/* ---------- DAILYWEAR (320px desktop) ---------- */}
        <div className="relative overflow-hidden rounded-xl group h-[260px] md:h-[320px]">
          <img
            src="/assets/home/ai-dailywear-desktop.webp"
            alt="Dailywear"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t 
            from-[#4A2C2A] via-[#4A2C2A]/70 to-transparent 
            flex items-end justify-center pb-4">
            <p className="text-white text-lg md:text-xl font-medium tracking-wide drop-shadow-md">
              Dailywear
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Selections;