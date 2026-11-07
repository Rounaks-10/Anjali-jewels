import React from "react";

const ArrivalSection = () => {
  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6 items-center">

        {/* LEFT BIG IMAGE SECTION */}
        <div className="relative w-full lg:w-1/2">

          <img
            src="/assets/home/new-arrivals-background.webp"
            alt="New Arrivals"
            className="w-full h-[450px] object-cover rounded-xl"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40 rounded-xl text-white flex flex-col justify-center px-6">

            {/* TITLE */}
            <h2 className="text-3xl font-semibold">New Arrivals</h2>

            {/* DIAMOND BADGE */}
            <div className="mt-3 flex items-center gap-2 bg-[rgba(255,255,255,0.3)] px-4 py-2 rounded-full w-fit">

              <img
                src="/assets/home/diamond-logo.webp"
                alt="diamond icon"
                className="w-5 h-5"
              />

              <span className="text-sm font-medium">
                500+ New Items
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-4 text-sm text-gray-100 max-w-md leading-relaxed">
              New Arrivals Dropping Daily, Monday through Friday. Explore the Latest Launches Now!
            </p>

          </div>
        </div>

        {/* RIGHT CARDS SECTION */}
        <div className="w-full lg:w-1/2 flex flex-col gap-5">

          {/* CARD 1 */}
          <div className="relative rounded-xl shadow-md overflow-hidden">

            <img
              src="/assets/home/silver-idol.jpg"
              alt="Silver Idols"
              className="w-full h-52 object-cover"
            />

            {/* TEXT OVER IMAGE (NO BACKGROUND) */}
            <p className="absolute text-2xl bottom-6 left-6 text-white font-medium drop-shadow-lg">
              Silver Idols
            </p>

          </div>

          {/* CARD 2 */}
          <div className="relative rounded-xl shadow-md overflow-hidden">

            <img
              src="/assets/home/station-mangalsutra.webp"
              alt="Station Mangalsutra"
              className="w-full h-52 object-cover"
            />

            {/* TEXT OVER IMAGE (NO BACKGROUND) */}
            <p className="absolute bottom-6 left-6 text-white text-2xl font-medium drop-shadow-lg">
              Station Mangalsutra
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ArrivalSection;