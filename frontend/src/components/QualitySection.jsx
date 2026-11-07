import React from 'react'

const QualitySection = () => {
 return (
    <div className="w-full bg-[#f5f5f5] py-35 px-6 md:px-20 relative">
      
      {/* TOP SUBTLE BORDER */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gray-300 opacity-50" />

      <div className="max-w-7xl mx-auto relative">
        
        {/* VERTICAL DIVIDER (ONLY DESKTOP) */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-[1px] bg-gray-300 opacity-50" />

        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT SECTION */}
          <div className="text-center md:text-left md:pr-10">
            <h1 className="text-4xl md:text-6xl font-serif">
              <span className="text-black">Anjali </span>
              <span className="text-[#7a2e2e]">Assurance</span>
            </h1>

            <p className="mt-4 text-gray-600 text-lg md:text-xl font-serif">
              Crafted by experts, cherished by you
            </p>
          </div>

          {/* RIGHT SECTION */}
          <div className="grid grid-cols-3 gap-6 text-center md:pl-10">
            
            {/* ITEM 1 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center mb-3">
                <img className=" w-18 " src='/assets/home/category/tanishq-quality-crafting.svg' alt='heart'/>
              </div>
              <p className="text-sm md:text-base font-semibold text-[#4b1e1e]">
                Quality <br /> Craftsmanship
              </p>
            </div>

            {/* ITEM 2 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14  flex items-center justify-center mb-3">
                <img className=" w-18 " src='/assets/home/category/tanishq-ethically-sourced.svg' alt='heart'/>
              </div>
              <p className="text-sm md:text-base font-semibold text-[#4b1e1e]">
                Ethically <br /> Sourced
              </p>
            </div>

            {/* ITEM 3 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center mb-3 text-yellow-500 text-3xl">
                <img className=" w-18 " src='/assets/home/category/tanishq-transparency.svg' alt='heart'/>
              </div>
              <p className="text-sm md:text-base font-semibold text-[#4b1e1e]">
                100% <br /> Transparency
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default QualitySection
