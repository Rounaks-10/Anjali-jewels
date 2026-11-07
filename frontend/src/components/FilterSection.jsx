import React, { useEffect, useState } from "react";

const FilterSection = ({ onSortChange, onFilterChange, resultCount = 0 }) => {
  //Destructuring props
  const categories = [
    "\u20B925,000 - \u20B950,000",
    "Gifts for Him",
    "Gifts for Women",
    "Gold Jewellery",
    "Earrings",
    "Pendant",
    "Mangalsutra",
    "Modern Wear",
    "Wedding Special",
    "Traditional & Ethnic Wear",
  ];

  const sortOptions = [
    {
      label: "Best Sellers",
      value: "bestSeller",
    },
    {
      label: "New Arrivals",
      value: "newArrivals",
    },
    {
      label: "Price: Low to High",
      value: "priceLowToHigh",
    },
    {
      label: "Price: High to Low",
      value: "priceHighToLow",
    },
  ];

  const filterOptions = [
    "Price",
    "Jewellery Type",
    "Product",
    "Gender",
    "Purity",
    "Occasion",
    "Metal",
    "Collection",
    "Type",
    "Metal Colour",
  ];

  const jewelleryTypeOptions = [
    "Diamond Jewellery",
    "Gold Jewellery",
    "Jewellery with Gemstones",
    "Plain Jewellery with Stones",
    "Platinum Jewellery",
  ];
  const collectionOptions = [
    "A Chain Story",
    "A Fine Finish",
    "Bestsellers",
    "Eternity Bangles",
    "The Italian Connection",
  ];
  const typeOptions = [
    "Chain Bracelets",
    "Choker",
    "Chudamani",
    "Dangling Pendant",
    "Geometric Pendant",
  ];
  const metalColourOptions = [
    "Rose",
    "Yellow",
    "White",
    "Yellow Gold",
    "Yellow White and Rose",
  ];
  const visibleProductOptions = [
    "Anklet",
    "Bangle",
    "Bracelet",
    "Chain",
    "Earrings",
    "Finger Ring",
    "Haram",
    "Jewellery Set",
    "Kada",
    "Maang Tikka",
  ];
  //For Future Changes
  // const hiddenProductOptions = [
  //   "Mangalsutra",
  //   "Mangalsutra Set",
  //   "Necklace",
  //   "Necklace Set",
  //   "Nose Pin",
  //   "Others",
  //   "Pendant",
  //   "Pendant and Earrings Set",
  //   "Pendant with Chain",
  // ];

  const visibleOccasionOptions = [
    "Bridal Wear",
    "Brooch",
    "Casual Wear",
    "Dailywear",
    "Engagement",
    "Classic/Everyday/Party",
    "Minimal, Workwear, Fashionable",
  ];

  
  const genderOptions = [
    { label: "Kids", icon: "/assets/alljew/kids.svg" },
    { label: "Men", icon: "/assets/alljew/men.svg" },
    { label: "Unisex", icon: "/assets/alljew/unisex.svg" },
    { label: "Women", icon: "/assets/alljew/women.svg" },
  ];
  const metalOptions = [
    { label: "Gold", icon: "/assets/alljew/gold.webp" },
    { label: "Platinum", icon: "/assets/alljew/platinum.webp" },
  ];
  const purityOptions = ["9", "14", "18", "22", "95"];

  const [showMore, setShowMore] = useState(false);
  const [showMoreProducts, setShowMoreProducts] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("New Arrivals");
  const [openFilter, setOpenFilter] = useState("Price");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const visibleCategories = categories.slice(0, 4);
  const hiddenCategories = categories.slice(4);
  const visibleSelectedFilters = selectedFilters.slice(0, 4);
  const hiddenSelectedFilters = selectedFilters.slice(4);
  const hasSelectedFilters = selectedFilters.length > 0;
  const getFilterLabel = (item) => item.replace(/\bfor\b/g, "For");
  const giftFilters = ["Gifts for Him", "Gifts for Women"];
  const handleShowResults = () => {
    onFilterChange({
      filters: selectedFilters,
      minPrice,
      maxPrice,
    });
    setFilterOpen(false);
  };
  const toggleFilter = (item) => {
    setSelectedFilters((current) => {
      //Returns new array without equal item and filter
      if (current.includes(item)) {
        return current.filter((filter) => filter !== item);
      }
      //It removes all items that belong to `giftFilters` from the list and then adds the selected `item` back.
      if (giftFilters.includes(item)) {
        return [
          ...current.filter((filter) => !giftFilters.includes(filter)),
          item,
        ];
      }

      return [...current, item];
    });
  };
  const removeFilter = (item) => {
    setSelectedFilters((current) =>
      current.filter((filter) => filter !== item),
    );
  };
  const getFilterOptionClass = (item, extraClass = "") =>
    `rounded-full border px-3 py-2 text-base ${
      selectedFilters.includes(item)
        ? "border-gray-300 bg-gray-100 text-black"
        : "border-[#f1dddd]"
    } ${extraClass}`;
  const getSortLabel = (item) =>
    item
      .replace("Price:", "Price :")
      .replace("Low to High", "Low To High")
      .replace("High to Low", "High To Low");

  {
    /*useEffect(() => {
    onFilterChange?.({
      filters: selectedFilters,
      minPrice,
      maxPrice,
    });
  }, [onFilterChange, selectedFilters, minPrice, maxPrice]);*/
  }

  return (
    <>
      <div>
        <div className="mb-6 rounded-t-[32px] bg-white px-4 py-7 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] sm:px-10 lg:px-24">
          <h2 className="font-serif text-3xl font-semibold text-[#2b0000]">
            All Jewellery{" "}
            <span className="font-sans text-xl font-normal text-gray-700">
              ({resultCount} {resultCount === 1 ? "result" : "results"})
            </span>
          </h2>
        </div>

        <div className="mt-4 flex items-center gap-2 lg:gap-3 flex-wrap relative">
          {/* FILTER BUTTON */}
          <div
            className={`relative order-1 lg:order-none ${sortOpen ? "hidden" : ""}`}
          >
            {filterOpen && (
              <button
                type="button"
                aria-label="Close filter backdrop"
                onClick={() => setFilterOpen(false)}
                className="fixed inset-0 z-[80] bg-white/40 backdrop-blur-sm"
              />
            )}

            <button
              type="button"
              onClick={() => {
                setSortOpen(false);
                setFilterOpen((prev) => !prev);
              }}
              className="
                relative z-[90]
                flex items-center justify-center lg:justify-between
                h-10 w-10 p-0 lg:h-auto lg:w-40 lg:px-3 lg:py-2
                border border-gray-300
                rounded-full lg:rounded-md
                text-sm font-medium
                text-gray-700
                shadow-sm bg-white
              "
            >
              <img
                src="/assets/alljew/filter-mob.svg"
                alt="filter"
                className="w-4 h-4 lg:hidden"
              />
              <img
                src="/assets/alljew/filter-funnel.svg"
                alt="filter"
                className="hidden lg:block lg:w-5 lg:h-5 lg:mr-2"
              />

              <span className="hidden flex-1 text-left lg:block">Filter</span>
              {hasSelectedFilters && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d40000] px-1 text-[10px] font-bold text-white lg:static lg:ml-1 lg:h-6 lg:min-w-6 lg:px-1.5 lg:text-xs">
                  {selectedFilters.length}
                </span>
              )}

              <img
                src="/assets/alljew/brown-arrow-down.svg"
                alt="dropdown"
                className={`hidden w-5 h-5 ml-2 transition-transform lg:block ${
                  filterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {filterOpen && (
              <div className="fixed left-0 top-0 z-[100] flex h-screen w-[min(88vw,420px)] flex-col bg-white px-5 py-7 shadow-[16px_0_36px_rgba(0,0,0,0.16)]">
                <div className="relative mb-7 flex items-center justify-center">
                  <h3 className="font-serif text-2xl font-normal text-black">
                    Filter By
                  </h3>

                  <button
                    type="button"
                    onClick={() => setFilterOpen(false)}
                    aria-label="Close filter menu"
                    className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-2xl font-light leading-none text-black hover:text-[#8a4a2f]"
                  >
                    {"\u00D7"}
                  </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-gray-300 px-7 py-3 text-base font-semibold text-black">
                  {filterOptions.map((item) => {
                    const isOpen = openFilter === item;

                    return (
                      <div key={item}>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenFilter((current) =>
                              current === item ? "" : item,
                            )
                          }
                          className="flex w-full items-center justify-between py-5 text-left hover:text-[#8a4a2f]"
                        >
                          <span>{item}</span>
                          <img
                            src="/assets/alljew/brown-arrow-down.svg"
                            alt="dropdown"
                            className={`h-6 w-6 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {item === "Price" && isOpen && (
                          <div className="pb-5 text-sm font-normal text-black">
                            <div className="mb-4 flex flex-wrap gap-3">
                              <button
                                type="button"
                                onClick={() => toggleFilter("< \u20B925,000")}
                                className={getFilterOptionClass(
                                  "< \u20B925,000",
                                )}
                              >
                                {"< \u20B925,000"}
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  toggleFilter("\u20B925,000 - \u20B950,000")
                                }
                                className={getFilterOptionClass(
                                  "\u20B925,000 - \u20B950,000",
                                )}
                              >
                                {"\u20B925,000 - \u20B950,000"}
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  toggleFilter("\u20B950,000 - \u20B91,00,000")
                                }
                                className={getFilterOptionClass(
                                  "\u20B950,000 - \u20B91,00,000",
                                )}
                              >
                                {"\u20B950,000 - \u20B91,00,000"}
                              </button>
                              <button
                                type="button"
                                onClick={() => toggleFilter("\u20B91,00,000+")}
                                className={getFilterOptionClass(
                                  "\u20B91,00,000+",
                                )}
                              >
                                {"\u20B91,00,000+"}
                              </button>
                            </div>

                            <p className="mb-4 text-sm text-gray-600">
                              For multiple filter selection, use the range input
                              below
                            </p>

                            <div className="flex items-center gap-3">
                              <label className="flex h-12 flex-1 items-center rounded-lg border border-gray-300 px-3">
                                <span className="mr-1 text-base font-semibold">
                                  ₹
                                </span>
                                <input
                                  type="number"
                                  placeholder="Min Val"
                                  value={minPrice}
                                  onChange={(e) => setMinPrice(e.target.value)}
                                  className="w-full outline-none placeholder:text-gray-500"
                                />
                              </label>

                              <label className="flex h-12 flex-1 items-center rounded-lg border border-gray-300 px-3">
                                <span className="mr-1 text-base font-semibold">
                                  ₹
                                </span>
                                <input
                                  type="number"
                                  placeholder="Max Val"
                                  value={maxPrice}
                                  onChange={(e) => setMaxPrice(e.target.value)}
                                  className="w-full outline-none placeholder:text-gray-500"
                                />
                              </label>
                            </div>
                          </div>
                        )}

                        {item === "Jewellery Type" && isOpen && (
                          <div className="pb-5 text-sm font-normal text-black">
                            <div className="flex flex-wrap gap-3">
                              {jewelleryTypeOptions.map((option) => (
                                <button
                                  type="button"
                                  key={option}
                                  onClick={() => toggleFilter(option)}
                                  className={getFilterOptionClass(option)}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {item === "Product" && isOpen && (
                          <div className="pb-5 text-sm font-normal text-black">
                            <div className="flex flex-wrap gap-3">
                              {visibleProductOptions.map((option) => (
                                <button
                                  type="button"
                                  key={option}
                                  onClick={() => toggleFilter(option)}
                                  className={getFilterOptionClass(option)}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {item === "Gender" && isOpen && (
                          <div className="pb-5 text-sm font-normal text-black">
                            <div className="flex flex-wrap gap-3">
                              {genderOptions.map((option) => (
                                <button
                                  type="button"
                                  key={option.label}
                                  onClick={() => toggleFilter(option.label)}
                                  className={getFilterOptionClass(
                                    option.label,
                                    "flex items-center gap-2",
                                  )}
                                >
                                  <img
                                    src={option.icon}
                                    alt=""
                                    className="h-4 w-4"
                                  />
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {item === "Purity" && isOpen && (
                          <div className="pb-5 text-sm font-normal text-black">
                            <div className="flex flex-wrap gap-3">
                              {purityOptions.map((option) => (
                                <button
                                  type="button"
                                  key={option}
                                  onClick={() => toggleFilter(option)}
                                  className={getFilterOptionClass(
                                    option,
                                    "flex items-center gap-2",
                                  )}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {item === "Occasion" && isOpen && (
                          <div className="pb-5 text-sm font-normal text-black">
                            <div className="flex flex-wrap gap-3">
                              {visibleOccasionOptions.map((option) => (
                                <button
                                  type="button"
                                  key={option}
                                  onClick={() => toggleFilter(option)}
                                  className={getFilterOptionClass(option)}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>

                            
                          </div>
                        )}
                        {item === "Metal" && isOpen && (
                          <div className="pb-5 text-sm font-normal text-black">
                            <div className="flex flex-wrap gap-3">
                              {metalOptions.map((option) => (
                                <button
                                  type="button"
                                  key={option.label}
                                  onClick={() => toggleFilter(option.label)}
                                  className={getFilterOptionClass(
                                    option.label,
                                    "flex items-center gap-2",
                                  )}
                                >
                                  <img
                                    src={option.icon}
                                    alt=""
                                    className="h-4 w-4"
                                  />
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {item === "Collection" && isOpen && (
                          <div className="pb-5 text-sm font-normal text-black">
                            <div className="flex flex-wrap gap-3">
                              {collectionOptions.map((option) => (
                                <button
                                  type="button"
                                  key={option}
                                  onClick={() => toggleFilter(option)}
                                  className={getFilterOptionClass(option)}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {item === "Type" && isOpen && (
                          <div className="pb-5 text-sm font-normal text-black">
                            <div className="flex flex-wrap gap-3">
                              {typeOptions.map((option) => (
                                <button
                                  type="button"
                                  key={option}
                                  onClick={() => toggleFilter(option)}
                                  className={getFilterOptionClass(option)}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {item === "Metal Colour" && isOpen && (
                          <div className="pb-5 text-sm font-normal text-black">
                            <div className="flex flex-wrap gap-3">
                              {metalColourOptions.map((option) => (
                                <button
                                  type="button"
                                  key={option}
                                  onClick={() => toggleFilter(option)}
                                  className={getFilterOptionClass(option)}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex shrink-0 flex-col gap-3 sm:mt-8 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFilters([]);
                      setMinPrice("");
                      setMaxPrice("");

                      onFilterChange({
                        filters: [],
                        minPrice: "",
                        maxPrice: "",
                      });
                    }}
                    className="flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full border border-[#9b2b2f] bg-[#fbf0f1] px-6 py-4 text-sm font-semibold text-black sm:h-12 sm:min-h-0 sm:gap-6 sm:px-4 sm:py-0"
                  >
                    Clear Filters
                    <span className="text-2xl leading-none">{"\u203A"}</span>
                  </button>

                  <button
                    onClick={handleShowResults}
                    type="button"
                    className="flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full bg-[#98272b] px-6 py-4 text-sm font-semibold text-white sm:h-12 sm:min-h-0 sm:gap-4 sm:px-4 sm:py-0"
                  >
                    Show Results
                    <span className="text-2xl leading-none">{"\u203A"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* GRAY DIVIDER */}
          <div className="hidden w-[1px] h-8 bg-gray-300 lg:block"></div>

          {(hasSelectedFilters
            ? visibleSelectedFilters
            : visibleCategories
          ).map((item) => (
            <button
              type="button"
              key={item}
              onClick={() =>
                hasSelectedFilters ? removeFilter(item) : toggleFilter(item)
              }
              className={`
                hidden items-center gap-2 lg:flex
                border border-gray-300
                px-3 py-2 rounded-md shadow-sm text-sm text-gray-700
                ${hasSelectedFilters ? "bg-gray-100" : "bg-white"}
              `}
            >
              {!hasSelectedFilters && (
                <span
                  className="
                      w-5 h-5 flex items-center justify-center
                      rounded-full
                      bg-[#E5D1C1] text-[#8a4a2f]
                      font-bold text-xs
                    "
                >
                  <img src="/assets/alljew/plus.svg" className="w-2 h-2" />
                </span>
              )}

              {getFilterLabel(item)}
              {hasSelectedFilters && (
                <span className="text-base leading-none text-black">
                  {"\u00D7"}
                </span>
              )}
            </button>
          ))}

          {/* SHOW MORE BUTTON */}
          {(!hasSelectedFilters || hiddenSelectedFilters.length > 0) && (
            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="
                order-3 lg:order-none
                flex items-center gap-2
                rounded-md
                text-xs text-[#8a1616] lg:text-sm lg:text-[#8a4a2f]
              "
            >
              {showMore ? "-Show Less" : "+Show More"}
            </button>
          )}

          {/* SORT BY DROPDOWN */}
          <div
            className={`relative order-2 lg:order-none lg:ml-auto ${filterOpen ? "hidden" : ""}`}
          >
            {sortOpen && (
              <button
                type="button"
                aria-label="Close sort dropdown backdrop"
                onClick={() => setSortOpen(false)}
                className="fixed inset-0 z-[80] bg-white/40 backdrop-blur-sm"
              />
            )}

            <button
              type="button"
              onClick={() => {
                setFilterOpen(false);
                setSortOpen((prev) => !prev);
              }}
              className="
                relative z-[90]
                flex items-center justify-center gap-2 lg:justify-between
                h-10 w-10 p-0 lg:h-auto lg:w-auto lg:min-w-52 lg:px-3 lg:py-2
                border border-gray-300
                rounded-full lg:rounded-md
                text-sm text-gray-700
                shadow-sm bg-white
              "
            >
              <span className="hidden lg:inline">
                Sort By:{" "}
                <span className="text-[#8a4a2f] font-medium">{activeSort}</span>
              </span>
              <img
                src="/assets/alljew/m-sort-icon.svg"
                alt="sort"
                className="h-4 w-4 lg:hidden"
              />

              <img
                src="/assets/alljew/brown-arrow-down.svg"
                alt="dropdown"
                className={`hidden w-5 h-5 transition-transform lg:block ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sortOpen && (
              <div className="fixed left-3 right-3 top-20 z-[100] rounded-lg bg-white px-6 py-6 shadow-[0_14px_34px_rgba(0,0,0,0.13)] sm:left-auto sm:right-6 sm:w-[min(88vw,420px)] lg:absolute lg:right-0 lg:top-0">
                <div className="mb-5 flex items-center justify-between">
                  <h3
                    className="font-serif text-2xl font-normal text-black"
                    id="sort"
                  >
                    Sort By
                  </h3>

                  <button
                    type="button"
                    onClick={() => setSortOpen(false)}
                    aria-label="Close sort dropdown"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-2xl font-light leading-none text-black hover:text-[#8a4a2f]"
                  >
                    {"\u00D7"}
                  </button>
                </div>

                <div className="flex flex-col rounded-2xl border border-gray-300 px-6 py-1 text-sm font-semibold text-black">
                  {sortOptions.map((item, index) => (
                    <React.Fragment key={item}>
                      {index === 4 && (
                        <div className="mx-0 my-1 border-t border-gray-200"></div>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setActiveSort(item.value);
                          onSortChange?.(item.value);
                          setSortOpen(false);
                        }}
                        className={`py-3.5 text-left cursor-pointer hover:text-[#8a4a2f] ${
                          activeSort === item.value
                            ? "text-[#8a4a2f]"
                            : "text-black"
                        }`}
                      >
                        {item.label}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* HIDDEN CATEGORIES SECTION */}
        {showMore &&
          (!hasSelectedFilters || hiddenSelectedFilters.length > 0) && (
            <div className="mt-3 flex gap-3 flex-wrap">
              {(hasSelectedFilters
                ? hiddenSelectedFilters
                : hiddenCategories
              ).map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() =>
                    hasSelectedFilters ? removeFilter(item) : toggleFilter(item)
                  }
                  className={`
                  flex items-center gap-2
                  border border-gray-300
                  px-3 py-2 rounded-md shadow-sm
                  text-sm text-gray-700
                  ${hasSelectedFilters ? "bg-gray-100" : "bg-white"}
                `}
                >
                  {!hasSelectedFilters && (
                    <span
                      className="
                      w-5 h-5 flex items-center justify-center
                      rounded-full
                      bg-[#E5D1C1] text-[#8a4a2f]
                      font-bold text-xs
                    "
                    >
                      <img src="/assets/alljew/plus.svg" className="w-2 h-2" />
                    </span>
                  )}
                  {getFilterLabel(item)}
                  {hasSelectedFilters && (
                    <span className="text-base leading-none text-black">
                      {"\u00D7"}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
      </div>
    </>
  );
};

export default FilterSection;
