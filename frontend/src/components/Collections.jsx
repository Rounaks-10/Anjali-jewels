import React from "react";

const Collections = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl tracking-wide text-gray-900">
          Anjali Collections
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Explore our exquisite collection of jewellery.
        </p>
      </div>

      {/* First Full-Width Image */}
      <div className="w-full mb-8">
        <img
          src="/assets/home/collection1.webp"
          alt="Anjali Jewels Collection"
          className="
            w-full 
            h-[480px]        /* bigger mobile height like Tanishq */
            md:h-[380px] 
            md:object-cover  /* desktop unchanged */
            rounded-xl shadow
          "
        />
      </div>

      {/* Second & Third Images Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src="/assets/home/collection2.webp"
          alt="Jewelry Image 2"
          className="
            w-full 
            h-[380px]        /* taller on mobile */
            md:h-[300px]
            rounded-xl shadow
          "
        />

        <img
          src="/assets/home/collection3.webp"
          alt="Jewelry Image 3"
          className="
            w-full 
            h-[380px]        /* taller on mobile */
            md:object-cover
            md:h-[300px]
            rounded-xl shadow
          "
        />
      </div>
    </section>
  );
};

export default Collections;