import React from "react";

const ExperienceSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-14 bg-[#F7F4F2]">

      {/* HEADING */}
      <div className="text-center mb-12">
        <h2 className="text-4xl tracking-wide text-gray-900 font-semibold">
          Anjali Aura
        </h2>

        <p className="text-gray-600 mt-3 text-lg">
          Experience luxury in every detail. Schedule a visit or consultation.
        </p>
      </div>

      {/* GRID SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* CARD 1 */}
        <div className="text-center group">
          <div className="overflow-hidden rounded-xl">
            <img
              src="/assets/home/book-an-appointment.webp"
              alt="Book Appointment"
              className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-500"
            />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Book an Appointment
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            Visit us in-store for a personalized jewelry experience.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="text-center group">
          <div className="overflow-hidden rounded-xl">
            <img
              src="/assets/home/talk-to-expert.webp"
              alt="Talk to Expert"
              className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-500"
            />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Talk to an Expert
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            Get guidance from our certified jewelry specialists.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="text-center group">
          <div className="overflow-hidden rounded-xl">
            <img
              src="/assets/home/jewellery-care-guide.webp"
              alt="Jewellery Guide"
              className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-500"
            />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Jewellery Guide
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            Explore styles, trends, and the perfect piece for you.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;