import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useSearchParams } from "react-router-dom";
import FilterSection from "../components/FilterSection";
import { getProductPath } from "../utils/productRoutes";
import { useCart } from "../context/cartState";
import ribbonStarIcon from "/public/ribbon-singlestar-icon.svg";
import axios from "axios";
const ITEMS_PER_PAGE = 60;
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const PRICE_FILTERS = {
  "< \u20B925,000": { min: 0, max: 25000 },
  "\u20B925,000 - \u20B950,000": { min: 25000, max: 50000 },
  "\u20B950,000 - \u20B91,00,000": { min: 50000, max: 100000 },
  "\u20B91,00,000+": { min: 100000, max: Number.POSITIVE_INFINITY },
};
const FILTER_KEYS = {
  GOLD: "Gold Jewellery",
  DIAMOND: "Diamond Jewellery",
  EARRINGS: "Earrings",
  PENDANT: "Pendant",
  MANGALSUTRA: "Mangalsutra",
  MEN: "Gifts for Him",
  WOMEN: "Gifts for Women",
};

const normalizeFilterValue = (value) => String(value ?? "").toLowerCase();

const isBestsellerItem = (item) => {
  const bestseller = item?.bestseller;

  return bestseller === true || String(bestseller).toLowerCase() === "true";
};
const isNewArrivalItem = (item) => {
  const newArrival = item?.isNewArrival;

  return newArrival === true || String(newArrival).toLowerCase() === "true";
};

const itemMatchesSearchTerm = (item, searchTerm) => {
  const normalizedSearchTerm = normalizeFilterValue(searchTerm).trim();

  if (!normalizedSearchTerm) {
    return true;
  }

  const searchableWords =
    [
      item.name,
      item.product,
      item.type,
      item.category,
      item.jewelleryType,
      item.metal,
      item.gender,
      item.collection,
      item.occasion,
      item.purity,
      item.metalColour,
      item.price,
    ]
      .map(normalizeFilterValue)
      .join(" ")
      .match(/[a-z0-9]+/g) ?? [];

  return normalizedSearchTerm.split(/\s+/).every((term) => {
    const singularTerm = term.endsWith("s") ? term.slice(0, -1) : term;

    return (
      searchableWords.includes(term) || searchableWords.includes(singularTerm)
    );
  });
};

const itemMatchesGoldJewellery = (item) => {
  const searchableValues = [
    item.jewelleryType,
    item.metal,
    item.category,
    item.name,
  ].map(normalizeFilterValue);

  return searchableValues.some((value) => value.includes("gold"));
};
const itemMatchesDiamondJewellery = (item) => {
  const searchableValues = [
    item.jewelleryType,
    item.category,
    item.name,
    item.product,
    item.description,
  ].map((value) => normalizeFilterValue(value));

  return searchableValues.some(
    (value) => value.includes("diamond") || value.includes("diamonds"),
  );
};
const itemMatchesEarrings = (item) => {
  const searchableValues = [
    item.product,
    item.type,
    item.category,
    item.name,
  ].map(normalizeFilterValue);

  return searchableValues.some((value) => value.includes("earring"));
};
const itemMatchesAnklet = (item) => {
  const searchableValues = [
    item.product,
    item.type,
    item.category,
    item.name,
    item.subCategory,
    item.productType,
  ]
    .filter(Boolean)
    .map(normalizeFilterValue);

  return searchableValues.some((value) => value.includes("anklet"));
};
const itemMatchesBangle = (item) => {
  const searchableValues = [
    item.product,
    item.type,
    item.category,
    item.name,
    item.subCategory,
    item.productType, // add this too
  ]
    .filter(Boolean)
    .map(normalizeFilterValue);

  return searchableValues.some((value) => value.includes("bangle"));
};
const getProductImageClass = (positionClass) => {
  return `absolute inset-0 h-full w-full ${positionClass} object-cover p-0 transition-transform duration-500 ease-out`;
};

const normalizeProductItem = (item, index) => {
  const primaryImage =
    item.image ||
    item.images?.find((image) => image?.isPrimary)?.url ||
    item.images?.[0]?.url;
  const hoverImage =
    item.hoverImage ||
    item.images?.find((image) => !image?.isPrimary)?.url ||
    item.images?.[1]?.url ||
    primaryImage;

  return {
    ...item,
    id: item.id ?? item._id ?? index + 1,
    image: primaryImage,
    hoverImage,
    gender: normalizeFilterValue(item.gender ?? item.category),
    product: item.product ?? item.subCategory,
  };
};

const itemMatchesPendants = (item) => {
  const searchableValues = [
    item.product,
    item.type,
    item.category,
    item.name,
  ].map(normalizeFilterValue);

  return searchableValues.some((value) => value.includes("pendant"));
};
const itemMatchesMangalsutra = (item) => {
  const searchableValues = [
    item.product,
    item.type,
    item.category,
    item.name,
  ].map(normalizeFilterValue);

  return searchableValues.some((value) => value.includes("mangalsutra"));
};

const dailywearItems = [
  {
    id: 1,
    title: "Dailywear Rings",
    image: "/assets/alljew/jewellery1.webp",
  },
  {
    id: 2,
    title: "Dailywear Earrings",
    image: "/assets/alljew/jewellery2.webp",
  },
  {
    id: 3,
    title: "Dailywear Mangalsutra",
    image: "/assets/alljew/jewellery3.webp",
  },
  {
    id: 4,
    title: "Dailywear Jewellery",
    image: "/assets/alljew/jewellery4.webp",
  },
];
const AllJewellery = () => {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();

  const sliderRef = useRef(null);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") ?? "";
  const [jewelleryItems, setJewelleryItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(1);
  const [activeSort, setActiveSort] = useState("Best Matches");
  // NEW: store filters + min/max price together
  const [filterData, setFilterData] = useState({
    filters: [],
    minPrice: "",
    maxPrice: "",
  });
  const activeFilters = filterData.filters || [];
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const sortedJewelleryItems = useMemo(() => {
    const filteredItems = jewelleryItems.filter((item) => {
      // search filter
      if (!itemMatchesSearchTerm(item, searchTerm)) return false;

      // gender filters
      if (activeFilters.includes(FILTER_KEYS.MEN) && item.gender !== "men") {
        return false;
      }

      if (
        activeFilters.includes(FILTER_KEYS.WOMEN) &&
        item.gender !== "women"
      ) {
        return false;
      }

      // category filters
      if (
        activeFilters.includes(FILTER_KEYS.GOLD) &&
        !itemMatchesGoldJewellery(item)
      ) {
        return false;
      }
      if (
        activeFilters.includes(FILTER_KEYS.DIAMOND) &&
        !itemMatchesDiamondJewellery(item)
      ) {
        return false;
      }
      if (
        activeFilters.includes(FILTER_KEYS.EARRINGS) &&
        !itemMatchesEarrings(item)
      ) {
        return false;
      }
      if (
        activeFilters.includes(FILTER_KEYS.ANKLET) &&
        !itemMatchesAnklet(item)
      ) {
        return false;
      }
      if (
        activeFilters.includes(FILTER_KEYS.BANGLE) &&
        !itemMatchesBangle(item)
      ) {
        return false;
      }
      if (
        activeFilters.includes(FILTER_KEYS.PENDANT) &&
        !itemMatchesPendants(item)
      ) {
        return false;
      }

      if (
        activeFilters.includes(FILTER_KEYS.MANGALSUTRA) &&
        !itemMatchesMangalsutra(item)
      ) {
        return false;
      }
      return true;
    });
    if (activeSort === "Best Sellers") {
      return filteredItems.filter(isBestsellerItem);
    }
    if (activeSort === "newArrivals") {
      return filteredItems.filter(
        (item) =>
          item.isNewArrival === true ||
          String(item.isNewArrival).toLowerCase() === "true",
      );
    }

    const sortedItems = [...filteredItems];

    if (activeSort === "Price: Low to High") {
      return sortedItems.sort((firstItem, secondItem) => {
        const firstPrice = Number(firstItem.price) || Number.POSITIVE_INFINITY;
        const secondPrice =
          Number(secondItem.price) || Number.POSITIVE_INFINITY;

        return firstPrice - secondPrice;
      });
    }

    if (activeSort === "Price: High to Low") {
      return sortedItems.sort((firstItem, secondItem) => {
        return Number(secondItem.price) - Number(firstItem.price);
      });
    }

    return sortedItems;
  }, [filterData, activeFilters, activeSort, jewelleryItems, searchTerm]);

  const visibleJewelleryItems = useMemo(() => {
    console.log("Active Filters:", activeFilters);
    return sortedJewelleryItems.slice(0, visibleCount);
  }, [sortedJewelleryItems, visibleCount]);

  const hasMoreJewelleryItems = visibleCount < sortedJewelleryItems.length;
  const buildPriceQuery = (filterData) => {
    const selectedPriceRanges = (filterData.filters || [])
      .map((filter) => PRICE_FILTERS[filter])
      .filter(Boolean);

    console.log("Selected Filters:", filterData.filters);
    console.log("Selected Price Ranges:", selectedPriceRanges);

    if (filterData.minPrice !== "" || filterData.maxPrice !== "") {
      return {
        minPrice: filterData.minPrice,
        maxPrice: filterData.maxPrice,
      };
    }

    if (selectedPriceRanges.length === 0) {
      return {};
    }

    const minPrice = Math.min(...selectedPriceRanges.map((range) => range.min));

    const maxPrice = Math.max(...selectedPriceRanges.map((range) => range.max));
    console.log("Price Query:", {
      minPrice,
      maxPrice,
    });

    return {
      minPrice,
      maxPrice: maxPrice === Number.POSITIVE_INFINITY ? "" : maxPrice,
    };
  };
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       console.log("FILTER DATA:", filterData);

  //       const res = await axios.get(`${backendUrl}/api/product/list`, {
  //         params: {
  //           filters: JSON.stringify(filterData.filters),
  //           minPrice: filterData.minPrice,
  //           maxPrice: filterData.maxPrice,
  //         },
  //       });
  //       console.log("API RESPONSE:", res.data);
  //       console.log("FIRST PRODUCT:", res.data.products?.[0]);

  //       setJewelleryItems(res.data.products);
  //     } catch (err) {
  //       console.error(err);
  //       setJewelleryItems([]);
  //     }
  //   };

  //   fetchProducts();
  // }, [filterData]);
  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setIsLoadingProducts(true);

        const priceQuery = buildPriceQuery(filterData);

        // const params = new URLSearchParams({
        //   limit: "60",
        //   sort: "sortOrder",
        // });
        const params = new URLSearchParams({
          limit: "60",
          sort: activeSort,
        });

        params.append("filters", JSON.stringify(filterData.filters || []));

        if (priceQuery.minPrice !== undefined) {
          params.append("minPrice", String(priceQuery.minPrice));
        }

        if (priceQuery.maxPrice !== undefined && priceQuery.maxPrice !== "") {
          params.append("maxPrice", String(priceQuery.maxPrice));
        }
        console.log("Request Params:", params.toString());
        const response = await fetch(
          `${backendUrl}/api/product/list?${params.toString()}`,
        );

        if (!response.ok) {
          throw new Error("Product list was not found.");
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.products)) {
          if (isMounted) {
            setJewelleryItems(data.products.map(normalizeProductItem));
          }
        } else {
          throw new Error("Products not found");
        }
      } catch (error) {
        if (isMounted) {
          setJewelleryItems([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingProducts(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [filterData, activeSort]);
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeFilters, activeSort, searchTerm]);

  const updateArrowState = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    setCanScrollLeft(slider.scrollLeft > 2);
    setCanScrollRight(slider.scrollLeft < maxScrollLeft - 2);
    setSlideCount(
      Math.max(1, Math.ceil(slider.scrollWidth / slider.clientWidth)),
    );
    setActiveSlide(Math.round(slider.scrollLeft / slider.clientWidth));
  }, []);

  const scrollDailywear = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction * slider.clientWidth * 0.85,
      behavior: "smooth",
    });
  };

  const goToDailywearSlide = (slideIndex) => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollTo({
      left: slideIndex * slider.clientWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateArrowState();
    window.addEventListener("resize", updateArrowState);

    return () => {
      window.removeEventListener("resize", updateArrowState);
    };
  }, [updateArrowState]);
  useEffect(() => {
    if (!searchTerm) {
      setFilterData({
        filters: [],
        minPrice: "",
        maxPrice: "",
      });
    }
  }, [searchTerm]);
  return (
    <div className="relative w-full overflow-visible mt-20 sm:mt-0 md:mt-8 lg:mt-0">
      <img src="/assets/alljew/elevated-summer-stack-desktop.webp" />
      <div className="px-4 py-8 text-base  text-gray-600 bg-[#F7F4F2]">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">{">"}</span>
        <span className="text-[#8a4a2f] font-medium">All Jewellery</span>
      </div>
      {searchTerm.trim() && (
        <div className="bg-[#F7F4F2] px-4 pb-6 text-sm text-gray-700">
          Showing results for{" "}
          <span className="font-semibold text-[#8a4a2f]">
            "{searchTerm.trim()}"
          </span>
        </div>
      )}
      <div className="mt-5">
        {/* Filter Bar */}
        <div className="mt-5">
          {/* Filter Bar */}
          <FilterSection
            // NEW: receives filters + minPrice + maxPrice
            onFilterChange={(data) => setFilterData(data)}
            // Existing sorting
            onSortChange={setActiveSort}
            // Existing result count
            resultCount={sortedJewelleryItems.length}
          />

          <div className="mt-8 grid grid-cols-2 gap-x-7 gap-y-9 px-4 pb-10 sm:grid-cols-3 sm:gap-7 lg:grid-cols-3">
            {visibleJewelleryItems.map((item, index) => (
              <React.Fragment key={item._id || item.id}>
                <div>
                  <div className="group relative rounded-md bg-[#f8f8f8] transition-shadow duration-300 hover:shadow-sm">
                    {item.bestseller && (
                      <div className="absolute left-0 top-3 z-30 flex items-center overflow-hidden rounded-r-full shadow-lg">
                        <div className="flex h-8 w-8 items-center justify-center bg-gradient-to-r from-[#8B5E34] to-[#D4AF37]">
                          <img
                            src={ribbonStarIcon}
                            alt="Bestseller"
                            className="h-4 w-4"
                          />
                        </div>

                        <div className="bg-gradient-to-r from-[#D4AF37] via-[#E8C878] to-[#8B5E34] px-3 py-1.5">
                          <span className="text-[10px] font-bold tracking-wider text-[#4B2E16] sm:text-xs">
                            BESTSELLER
                          </span>
                        </div>
                      </div>
                    )}
                    {/* hover border OUTSIDE image with gap */}
                    <div className="pointer-events-none absolute -inset-2 rounded-md border border-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <button
                      className="absolute bottom-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-md transition hover:scale-110"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(item._id || item.id);
                      }}
                    >
                      <img
                        src={
                          isWishlisted(item._id || item.id)
                            ? "/assets/heart-burgundy-filled.svg"
                            : "/assets/alljew/heart-ash-border.svg"
                        }
                        className="w-5 h-5"
                        alt="wishlist"
                      />
                    </button>

                    <Link
                      to={getProductPath(item)}
                      state={{ product: item }}
                      className="relative block aspect-square w-full overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="absolute inset-0 h-full w-full object-cover"
                      />

                      <img
                        src={item.hoverImage}
                        alt={item.name}
                        className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition"
                      />
                      {item.stock && (
                        <span className="absolute bottom-0 left-0 right-0 bg-[#fff1d9] py-1 text-center text-[7px] font-bold uppercase leading-none text-[#8a1616] sm:hidden">
                          {item.stock}
                        </span>
                      )}
                    </Link>

                    <div className="pointer-events-none absolute left-1/2 top-[58%] z-20 hidden -translate-x-1/2 whitespace-nowrap border border-gray-800 bg-white px-3 py-1.5 text-sm text-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
                      {item.name}
                    </div>

                    <div className="absolute bottom-0 left-1/2 z-20 hidden -translate-x-1/2 translate-y-full overflow-hidden rounded-t-lg border border-gray-200 bg-white opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
                      <button
                        type="button"
                        className="flex h-14 min-w-32 items-center justify-center gap-3 px-6 text-sm font-semibold text-black"
                      >
                        <span className="h-5 w-5 rounded-[4px] bg-[#a74f54]"></span>
                        Similar
                      </button>
                    </div>
                  </div>

                  <div className="px-1 pt-5 sm:px-3 sm:pt-4 lg:px-1 lg:pt-7">
                    <Link
                      to={getProductPath(item)}
                      state={{ product: item }}
                      className="block truncate font-serif text-sm font-medium leading-tight text-black transition hover:text-[#8a4a2f] sm:text-xl lg:whitespace-normal lg:text-xl"
                    >
                      {item.name}
                    </Link>
                    <div className="mt-2 flex items-center gap-4 sm:mt-3 sm:gap-6 lg:gap-8">
                      <p className="font-serif text-sm font-medium text-black sm:text-sm lg:text-xl">
                        {item.price
                          ? `${"\u20B9"} ${item.price}`
                          : "Price on request"}
                      </p>
                      {item.stock && (
                        <p className="hidden text-sm font-medium text-[#8a1616] sm:block lg:text-lg">
                          {item.stock}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {index === 3 && (
                  <div
                    className="relative col-span-2 aspect-[1.72/1] overflow-hidden bg-[#570000] px-3 py-3 text-white sm:col-span-2 sm:aspect-[1.8/1] sm:px-4 sm:py-4 md:px-8 md:py-6 lg:min-h-0 lg:px-16 lg:py-7"
                    style={{
                      backgroundImage:
                        "url('/assets/alljew/spot-background.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <h2 className="mb-3 text-center font-serif text-base font-bold leading-tight sm:mb-5 sm:text-xl md:text-3xl lg:mb-6 lg:text-2xl">
                      Dailywear Jewellery
                    </h2>

                    <button
                      type="button"
                      aria-label="Previous dailywear jewellery"
                      disabled={!canScrollLeft}
                      onClick={() => scrollDailywear(-1)}
                      className="absolute left-2 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 transition-opacity disabled:cursor-default disabled:border-gray-400 sm:flex md:h-10 md:w-10 lg:left-4 lg:h-12 lg:w-12"
                    >
                      <img
                        src="/assets/alljew/slider-arrow.png"
                        alt=""
                        className={`h-3 w-3 rotate-180 transition md:h-4 md:w-4 ${canScrollLeft ? "" : "grayscale opacity-45"}`}
                      />
                    </button>

                    <div
                      ref={sliderRef}
                      onScroll={updateArrowState}
                      className="flex h-[calc(100%_-_2.5rem)] snap-x gap-4 overflow-x-auto scroll-smooth sm:h-[calc(100%_-_3.5rem)] sm:gap-6 md:gap-8 lg:h-[calc(100%_-_4.5rem)] lg:gap-9 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                      {dailywearItems.map((dailywear) => (
                        <div
                          key={dailywear.id}
                          className="flex min-w-[calc((100%_-_1rem)/2)] snap-start flex-col sm:min-w-[calc((100%_-_3rem)/3)] lg:min-w-[280px]"
                        >
                          <img
                            src={dailywear.image}
                            alt={dailywear.title}
                            className="min-h-0 flex-1 rounded-lg object-cover"
                          />
                          <h3 className="mt-1 font-serif text-xs font-bold leading-tight sm:mt-2 sm:text-xs md:text-sm lg:mt-4 lg:text-base">
                            {dailywear.title}
                          </h3>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      aria-label="Next dailywear jewellery"
                      disabled={!canScrollRight}
                      onClick={() => scrollDailywear(1)}
                      className="absolute right-2 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 transition-opacity disabled:cursor-default disabled:border-gray-400 sm:flex md:h-10 md:w-10 lg:right-4 lg:h-12 lg:w-12"
                    >
                      <img
                        src="/assets/alljew/slider-arrow.png"
                        alt=""
                        className={`h-3 w-3 transition md:h-4 md:w-4 ${canScrollRight ? "" : "grayscale opacity-45"}`}
                      />
                    </button>

                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-3">
                      {Array.from({ length: slideCount }).map(
                        (_, slideIndex) => (
                          <button
                            key={slideIndex}
                            type="button"
                            aria-label={`Go to dailywear slide ${slideIndex + 1}`}
                            onClick={() => goToDailywearSlide(slideIndex)}
                            className={`h-2 w-2 rounded-full transition ${activeSlide === slideIndex ? "bg-white" : "bg-white/35"}`}
                          />
                        ),
                      )}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {!isLoadingProducts && sortedJewelleryItems.length === 0 && (
          <div className="px-4 pb-16 text-center">
            <h3 className="font-serif text-2xl font-semibold text-[#2b0000]">
              No jewellery found
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Try searching for ring, earrings, pendant, gold, bracelet, chain,
              or mangalsutra.
            </p>
          </div>
        )}
        {hasMoreJewelleryItems && (
          <div className="flex justify-center px-4 pb-12">
            <button
              type="button"
              onClick={() =>
                setVisibleCount((currentCount) => currentCount + ITEMS_PER_PAGE)
              }
              className="rounded border border-[#8a4a2f] px-8 py-3 font-serif text-sm font-semibold text-[#8a4a2f] transition hover:bg-[#8a4a2f] hover:text-white sm:text-base"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJewellery;
