import React from "react";

const Category = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">

      {/* Heading */}
      <div className="mb-8 text-center"> 
        <h2 className="text-4xl tracking-wide text-gray-900">
          Crafted with care. Chosen to last.
        </h2>

        <p className="text-base font-normal leading-[22.5px] text-gray-600 max-w-2xl mx-auto mt-2">
          Our pieces are handmade with gold-filled materials sourced from the USA,
          a curated selection of gold vermeil, and semi-precious gemstones — thoughtfully 
          chosen for how they wear, age, and live with you over time.
        </p>
      </div>

      {/* Layout Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

        {/* Left Grid (4 Images) */}
        <div className="grid grid-cols-2 gap-6">

          {/* Item 1 */}
          <div className="relative overflow-hidden rounded-xl group">
            <img
              src="/assets/home/category/bracelets.jpg"
              alt="Bracelets"
              className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <p className="absolute bottom-6 left-6 text-white text-xl font-light drop-shadow-lg" id="text">
              Bracelets
            </p>
          </div>

          {/* Item 2 */}
          <div className="relative overflow-hidden rounded-xl group">
            <img
              src="/assets/home/category/earrings.webp"
              alt="Earrings"
              className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <p className="absolute bottom-6 left-6 text-white text-xl font-light drop-shadow-lg" id="text">
              Earrings
            </p>
          </div>

          {/* Item 3 */}
          <div className="relative overflow-hidden rounded-xl group">
            <img
              src="/assets/home/category/pendants.webp"
              alt="Pendants"
              className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <p className="absolute bottom-6 left-6 text-white text-xl font-light drop-shadow-lg" id="text">
              Pendants
            </p>
          </div>

          {/* Item 4 */}
          <div className="relative overflow-hidden rounded-xl group">
            <img
              src="/assets/home/category/rings.webp"
              alt="Rings"
              className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <p className="absolute bottom-6 left-6 text-white text-xl font-light drop-shadow-lg" id="text">
              Rings
            </p>
          </div>

        </div>

        {/* Right Large Image */}
        <div className="relative overflow-hidden rounded-xl w-full group">
  <img
    src="/assets/home/category/categoryc1.webp"
    alt="Category Highlight"
    className="
      w-full 
      h-[192px]     /* 48 * 4 = 192px for mobile to match 4 left images total height */
      md:h-[470px]  /* 56 * 4 = 224 height * 2 columns = 448px for desktop */
      object-cover 
      transition-transform 
      duration-500 
      group-hover:scale-110
    "
  />

  {/* Text on Right Large Image */}
  <p className="absolute bottom-6 left-6 text-white text-xl font-light drop-shadow-xl" id="text">
    Eternal Radiance
  </p>
</div>
      </div>
    </section>
  );
};

export default Category;