import React from "react";

const Gender = () => {
  return (
    <div className="flex justify-center flex-col bg-[#f8f6f2]">
      <div>
        <h2 className="text-center text-[40px] md:text-[56px] font-[400] font-['Fraunces',serif] text-black leading-tight">
          Curated For You
        </h2>

        <h2 className="text-center text-gray-600 text-lg md:text-xl font-serif text-[#56544e] mt-2">
          Shop by gender
        </h2>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 px-6 md:px-20 py-10 bg-[#f8f6f2]">
        {/* WOMEN */}
        <div className="group w-full md:w-1/3 overflow-hidden rounded-xl">
          <img
            src="/assets/women.jpg"
            alt="Women"
            className="w-full h-[300px] md:h-[420px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
          />
          <p className="text-center mt-4 font-serif text-lg text-[#4b1e1e]">
            Women
          </p>
        </div>

        {/* MEN */}
        <div className="group w-full md:w-1/3 overflow-hidden rounded-xl">
          <img
            src="/assets/men.webp"
            alt="Men"
            className="w-full h-[300px] md:h-[420px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
          />
          <p className="text-center mt-4 font-serif text-lg text-[#4b1e1e]">
            Men
          </p>
        </div>

        {/* CHILD */}
        <div className="group w-full md:w-1/3 overflow-hidden rounded-xl">
          <img
            src="/assets/child.webp"
            alt="Kids"
            className="w-full h-[300px] md:h-[420px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
          />
          <p className="text-center mt-4 font-serif text-lg text-[#4b1e1e]">
            Kids
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gender;
