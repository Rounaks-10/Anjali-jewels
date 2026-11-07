import React from "react";

const Trending = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl tracking-wide text-gray-900">
          What’s Captivating Everyone
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Trending pieces stealing the spotlight.
        </p>
      </div>

      {/* 3 Images Side by Side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Item 1 */}
        <div className="text-center">
          <img
            src="/assets/home/auspicious-trending.jpg"
            alt="Trending Item 1"
            className="w-full h-100 object-cover rounded-xl shadow hover:scale-105 transition-transform duration-500"
          />
          <p className="mt-4 text-lg font-medium text-gray-800">Cherished Occasion</p>
        </div>

        {/* Item 2 */}
        <div className="text-center">
          <img
            src="/assets/home/gifting.webp"
            alt="Trending Item 2"
            className="w-full h-100 object-cover rounded-xl shadow hover:scale-105 transition-transform duration-500"
          />
          <p className="mt-4 text-lg font-medium text-gray-800">Luxe Gifts Collection</p>
        </div>

        {/* Item 3 */}
        <div className="text-center">
          <img
            src="/assets/home/akshaya-tritiya.webp"
            alt="Trending Item 3"
            className="w-full h-100 object-cover rounded-xl shadow hover:scale-105 transition-transform duration-500"
          />
          <p className="mt-4 text-lg font-medium text-gray-800">Akshaya Tritiya</p>
        </div>
      </div>
    </section>
  );
};

export default Trending;
