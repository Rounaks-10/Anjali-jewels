import React from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartState";

const Navbar = () => {
  /* ------------------------------
      ROTATING SEARCH TEXT LOGIC
  --------------------------------*/
  const rotatingItems = [
    "diamond jewellery",
    "engagement rings",
    "gold necklaces",
  ];

  const [index, setIndex] = React.useState(0);
  const [focused, setFocused] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();

  /* mega menu state */
  const [openDesktopMenu, setOpenDesktopMenu] = React.useState(null);
  const [openMobileJewellery, setOpenMobileJewellery] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState("category");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const { cartCount, setToken, token } = useCart();
  const categoryLinks = [
    { name: "All Jewellery", path: "/alljewellery" },
    { name: "Finger Rings", path: "/alljewellery?category=Finger Rings" },
    { name: "Nose Pin", path: "/alljewellery?category=Nose Pin" },
    { name: "Bangles", path: "/alljewellery?category=Bangles" },
    { name: "Earrings", path: "/alljewellery?category=Earrings" },
    { name: "Mangalsutra", path: "/alljewellery?category=Mangalsutra" },
    { name: "Necklaces", path: "/alljewellery?category=Necklaces" },
    { name: "Bracelets", path: "/alljewellery?category=Bracelets" },
    { name: "Pendants", path: "/alljewellery?category=Pendants" },
    { name: "Chains", path: "/alljewellery?category=Chains" },
    { name: "Necklace Set", path: "/alljewellery?category=Necklace Set" },
    {
      name: "Pendant & Earrings Set",
      path: "/alljewellery?category=Pendant & Earrings Set",
    },
  ];
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingItems.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchValue = params.get("search") ?? "";

    setSearchTerm(searchValue);
    setFocused(searchValue.length > 0);
  }, [location.search]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();
    const searchPath = trimmedSearchTerm
      ? `/alljewellery?search=${encodeURIComponent(trimmedSearchTerm)}`
      : "/alljewellery";

    navigate(searchPath);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setProfileMenuOpen(false);
    navigate("/login");
  };

  const rotatingText = rotatingItems[index];
  const openJewellery = openDesktopMenu === "jewellery";
  const openGold = openDesktopMenu === "gold";
  const openDiamond = openDesktopMenu === "diamond";
  const openEarrings = openDesktopMenu === "earrings";
  const openRings = openDesktopMenu === "rings";
  const openDailyWear = openDesktopMenu === "dailywear";
  const openGemstone = openDesktopMenu === "gemstone";
  const openWedding = openDesktopMenu === "wedding";
  const openGifting = openDesktopMenu === "gifting";
  const openMore = openDesktopMenu === "more";

  return (
    <>
      {/* =============================
           TOP NAVBAR
      ============================== */}
      <div className="fixed top-0 left-0  z-50 w-full bg-white flex items-center justify-between gap-2 py-2 px-2 sm:px-4 font-medium">
        {/* MOBILE MENU */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#8a4a2f] lg:hidden"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* LOGO */}
        <NavLink to="/">
          <img
            src="/assets/logo.png"
            className="w-16 sm:w-20 md:w-24 flex-shrink-0"
            alt="Logo"
          />
        </NavLink>

        {/* SEARCH BAR */}
        <div className="flex-1 max-w-[220px] sm:max-w-[320px] md:max-w-[420px] mx-2 sm:mx-4">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative z-0 ">
              {/* Input */}
              <input
                type="text"
                value={searchTerm}
                onFocus={() => setFocused(true)}
                onBlur={(e) => {
                  if (e.target.value === "") setFocused(false);
                }}
                onChange={(e) => {
                  const nextSearchTerm = e.target.value;

                  setSearchTerm(nextSearchTerm);
                  if (nextSearchTerm.length > 0) setFocused(true);
                  else setFocused(false);
                }}
                className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 text-sm
                focus:border-[#8a4a2f] focus:outline-none bg-white"
              />

              {/* Search Icon */}
              <button
                type="submit"
                className="absolute left-3 top-2.5 h-5 w-5 text-[#8a4a2f]"
                aria-label="Search jewellery"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0a7 7 0 111-1l4.35 4.35z"
                  />
                </svg>
              </button>

              {/* Static text */}
              {!focused && (
                <span className="absolute left-10 top-2 text-gray-400 text-sm pointer-events-none px-1 z-20">
                  Search for
                </span>
              )}

              {/* Rotating Text */}
              {!focused && (
                <span className="absolute left-[110px] top-2 max-w-[calc(100%-120px)] truncate text-[#8a4a2f] text-sm pointer-events-none animate-rotateText px-1 z-20">
                  {rotatingText}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
          <NavLink to="/wishlist">
            <img
              src="/assets/heart.svg"
              className="w-6 h-6 cursor-pointer"
              alt="Wishlist"
            />
          </NavLink>

          <div
            className="group relative"
            onMouseEnter={() => setProfileMenuOpen(true)}
            onMouseLeave={() => setProfileMenuOpen(false)}
          >
            <img
              className="w-6 h-6 cursor-pointer"
              src="/assets/user.svg"
              alt="User"
              onClick={() => setProfileMenuOpen(true)}
            />

            {token && (
              <div
                className={`absolute right-0 pt-4 z-20 ${
                  profileMenuOpen ? "block" : "hidden"
                } group-hover:block`}
              >
                <div className="flex flex-col gap-2 w-45 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <NavLink to="/contact">
                    <p className="cursor-pointer hover:text-[#8a4a2f] active:text-[#8a4a2f]">
                      Contact us
                    </p>
                  </NavLink>
                  <NavLink to="/orders">
                    <p className="cursor-pointer hover:text-[#8a4a2f] active:text-[#8a4a2f]">
                      Orders
                    </p>
                  </NavLink>
                  {token && (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="cursor-pointer text-left hover:text-[#8a4a2f] active:text-[#8a4a2f]"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative">
            <img
              src="/assets/shopping-bag.svg"
              className="w-6 h-6 cursor-pointer"
              alt="Cart"
            />
            {cartCount > 0 && (
              <p className="absolute -right-1 -top-1 min-w-4 rounded-full bg-black px-1 text-center text-[8px] leading-4 text-white">
                {cartCount}
              </p>
            )}
          </Link>
        </div>
      </div>

      {/* =============================
            MOBILE DRAWER
      ============================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          />

          <div className="relative h-full w-[86%] max-w-sm overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <img src="/assets/logo.png" className="w-24" alt="Logo" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#8a4a2f]"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="divide-y divide-gray-100 text-sm font-medium">
              <button
                type="button"
                onClick={() => setOpenMobileJewellery(!openMobileJewellery)}
                className="flex w-full items-center justify-between px-4 py-4 text-left hover:text-[#8a4a2f]"
              >
                <span className="flex items-center gap-3">
                  <img
                    src="/assets/all-jewellery-l1.svg"
                    alt="All Jewellery"
                    className="h-6 w-6"
                  />
                  All Jewellery
                </span>
                <span className="text-xl leading-none">
                  {openMobileJewellery ? "-" : "+"}
                </span>
              </button>

              {openMobileJewellery && (
                <div className="bg-amber-50/50 px-4 pb-4">
                  <div className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {["category", "price", "occasion", "gender"].map((menu) => (
                      <button
                        type="button"
                        key={menu}
                        onClick={() => setActiveMenu(menu)}
                        className={`shrink-0 rounded-full border px-4 py-2 capitalize ${
                          activeMenu === menu
                            ? "border-[#8a4a2f] text-[#8a4a2f]"
                            : "border-gray-200 text-gray-600"
                        }`}
                      >
                        {menu}
                      </button>
                    ))}
                  </div>

                  {/*{activeMenu === "category" && (
                    <div className="grid grid-cols-1 gap-2 py-2 text-gray-700">
                      {[
                        "All Jewellery",
                        "Finger Rings",
                        "Nose Pin",
                        "Bangles",
                        "Earrings",
                        "Mangalsutra",
                        "Necklaces",
                        "Bracelets",
                        "Pendants",
                        "Chains",
                        "Necklace Set",
                        "Pendant & Earrings Set",
                      ].map((item) => (
                        <p key={item} className="rounded-md bg-white px-3 py-2">
                          {item}
                        </p>
                      ))}
                    </div>
                  )}*/}
                  {activeMenu === "category" && (
                    <div className="grid grid-cols-1 gap-2 py-2 text-gray-700">
                      {categoryLinks.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="rounded-md bg-white px-3 py-3 hover:text-[#8a4a2f] hover:bg-amber-50 transition"
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  )}

                  {activeMenu === "price" && (
                    <div className="grid grid-cols-2 gap-2 py-2 text-gray-700">
                      {["<25K", "25K-50K", "50K-1L", "1L & Above"].map(
                        (item) => (
                          <p
                            key={item}
                            className="rounded-md bg-white px-3 py-2 text-center"
                          >
                            {item}
                          </p>
                        ),
                      )}
                    </div>
                  )}

                  {activeMenu === "occasion" && (
                    <div className="grid grid-cols-2 gap-2 py-2 text-gray-700">
                      {[
                        "Office Wear",
                        "Modern Wear",
                        "Casual Wear",
                        "Traditional Wear",
                      ].map((item) => (
                        <p
                          key={item}
                          className="rounded-md bg-white px-3 py-2 text-center"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  )}

                  {activeMenu === "gender" && (
                    <div className="grid grid-cols-2 gap-2 py-2 text-gray-700">
                      {["Women", "Men", "Kids & Teens"].map((item) => (
                        <p
                          key={item}
                          className="rounded-md bg-white px-3 py-2 text-center"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {[
                ["/assets/gold-l1.svg", "Gold"],
                ["/assets/diamond-l1.svg", "Diamond"],
                ["/assets/earrings-l1.svg", "Earrings"],
                ["/assets/rings-l1.svg", "Rings"],
                ["/assets/dailywear-l1.svg", "Daily Wear"],
                ["/assets/gemstone.webp", "Gemstone"],
                ["/assets/wedding-l1.svg", "Wedding"],
                ["/assets/gifting-l1.svg", "Gifting"],
                ["/assets/logo.png", "More"],
              ].map(([src, label]) => (
                <button
                  type="button"
                  key={label}
                  className="flex w-full items-center gap-3 px-4 py-4 text-left hover:text-[#8a4a2f]"
                >
                  <img src={src} className="h-6 w-6" alt="" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =============================
            CATEGORY NAVBAR
      ============================== */}
      <div
        className="lg:pt-25 md:pt-20 relative bg-white select-none"
        onMouseLeave={() => setOpenDesktopMenu(null)}
      >
        <div className="hidden gap-5 overflow-x-auto whitespace-nowrap px-2 py-3 text-sm font-medium border-b border-gray-200 sm:gap-8 sm:px-10 lg:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* ================= ALL JEWELLERY ================= */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => {
              setOpenDesktopMenu("jewellery");
              setActiveMenu("category");
            }}
          >
            <div className="relative w-fit">
              <NavLink to="/alljewellery">
                <span className="hover:text-[#8a4a2f] flex items-center gap-3 ">
                  <img
                    src="/assets/all-jewellery-l1.svg"
                    alt="All Jewellery"
                    className="w-6 h-6"
                  />
                  All Jewellery
                </span>
              </NavLink>

              {/* Brown underline animation */}
              <div
                className={`absolute left-0 -bottom-3 h-[3px] bg-[#8a4a2f] transition-all duration-300
                ${openJewellery ? "w-full" : "w-0"}`}
              />
            </div>
          </div>

          {/* Other Categories- Gold*/}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => {
              setOpenDesktopMenu("gold");
              setActiveMenu("category");
            }}
          >
            <div className="relative w-fit">
              <span className="hover:text-[#8a4a2f] flex items-center gap-3">
                <img src="/assets/gold-l1.svg" className="w-6 h-6" />
                Gold
              </span>

              {/* Brown underline animation */}
              <div
                className={`absolute left-0 -bottom-3 h-[3px] bg-[#8a4a2f] transition-all duration-300
                ${openGold ? "w-full" : "w-0"}`}
              />
            </div>
          </div>

          {/*Diamond*/}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => {
              setOpenDesktopMenu("diamond");
              setActiveMenu("category");
            }}
          >
            <div className="relative w-fit">
              <span className="hover:text-[#8a4a2f] flex items-center gap-3">
                <img src="/assets/diamond-l1.svg" className="w-6 h-6" />
                Diamond
              </span>

              {/* Brown underline animation */}
              <div
                className={`absolute left-0 -bottom-3 h-[3px] bg-[#8a4a2f] transition-all duration-300
                ${openDiamond ? "w-full" : "w-0"}`}
              />
            </div>
          </div>
          {/*Earrings*/}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => {
              setOpenDesktopMenu("earrings");
              setActiveMenu("category");
            }}
          >
            <div className="relative w-fit">
              <span className="hover:text-[#8a4a2f] flex items-center gap-3">
                <img src="/assets/earrings-l1.svg" className="w-6 h-6" />
                Earrings
              </span>

              {/* Brown underline animation */}
              <div
                className={`absolute left-0 -bottom-3 h-[3px] bg-[#8a4a2f] transition-all duration-300
                ${openEarrings ? "w-full" : "w-0"}`}
              />
            </div>
          </div>

          {/* Rings */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => {
              setOpenDesktopMenu("rings");
              setActiveMenu("category");
            }}
          >
            <div className="relative w-fit">
              <span className="hover:text-[#8a4a2f] flex items-center gap-3">
                <img src="/assets/rings-l1.svg" className="w-6 h-6" />
                Rings
              </span>

              {/* Brown underline animation */}
              <div
                className={`absolute left-0 -bottom-3 h-[3px] bg-[#8a4a2f] transition-all duration-300
                ${openRings ? "w-full" : "w-0"}`}
              />
            </div>
          </div>
          {/* DailyWear */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => {
              setOpenDesktopMenu("dailywear");
              setActiveMenu("category");
            }}
          >
            <div className="relative w-fit">
              <span className="hover:text-[#8a4a2f] flex items-center gap-3">
                <img src="/assets/dailywear-l1.svg" className="w-6 h-6" />
                Daily Wear
              </span>

              {/* Brown underline animation */}
              <div
                className={`absolute left-0 -bottom-3 h-[3px] bg-[#8a4a2f] transition-all duration-300
                ${openDailyWear ? "w-full" : "w-0"}`}
              />
            </div>
          </div>
          {/* Gemstone */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => {
              setOpenDesktopMenu("gemstone");
              setActiveMenu("category");
            }}
          >
            <div className="relative w-fit">
              <span className="hover:text-[#8a4a2f] flex items-center gap-3">
                <img src="/assets/gemstone.webp" className="w-6 h-6" />
                Gemstone
              </span>

              {/* Brown underline animation */}
              <div
                className={`absolute left-0 -bottom-3 h-[3px] bg-[#8a4a2f] transition-all duration-300
                ${openGemstone ? "w-full" : "w-0"}`}
              />
            </div>
          </div>
          {/* Wedding */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => {
              setOpenDesktopMenu("wedding");
              setActiveMenu("category");
            }}
          >
            <div className="relative w-fit">
              <span className="hover:text-[#8a4a2f] flex items-center gap-3">
                <img src="/assets/wedding-l1.svg" className="w-6 h-6" />
                Wedding
              </span>

              {/* Brown underline animation */}
              <div
                className={`absolute left-0 -bottom-3 h-[3px] bg-[#8a4a2f] transition-all duration-300
                ${openWedding ? "w-full" : "w-0"}`}
              />
            </div>
          </div>
          {/* Gifting */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => {
              setOpenDesktopMenu("gifting");
              setActiveMenu("giftfor");
            }}
          >
            <div className="relative w-fit">
              <span className="hover:text-[#8a4a2f] flex items-center gap-3">
                <img src="/assets/gifting-l1.svg" className="w-6 h-6" />
                Gifting
              </span>

              {/* Brown underline animation */}
              <div
                className={`absolute left-0 -bottom-3 h-[3px] bg-[#8a4a2f] transition-all duration-300
                ${openGifting ? "w-full" : "w-0"}`}
              />
            </div>
          </div>
          {/* More */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => {
              setOpenDesktopMenu("more");
              setActiveMenu("customer");
            }}
          >
            <div className="relative w-fit">
              <span className="hover:text-[#8a4a2f] flex items-center gap-3">
                <img src="/assets/logo.png" className="w-6 h-6" />
                More
              </span>

              {/* Brown underline animation */}
              <div
                className={`absolute left-0 -bottom-3 h-[3px] bg-[#8a4a2f] transition-all duration-300
                ${openMore ? "w-full" : "w-0"}`}
              />
            </div>
          </div>
        </div>

        {/* ================= MEGA MENU ================= */}
        {openJewellery && (
          <div
            className="absolute left-0 top-full z-50 hidden h-auto max-h-[75vh] w-full overflow-auto bg-white shadow-xl sm:h-120 lg:block"
            onMouseLeave={() => setOpenDesktopMenu(null)}
          >
            <div className="flex min-w-0 flex-col gap-4 px-4 py-5 text-sm lg:flex-row lg:gap-0 lg:px-4 lg:py-6 xl:px-10">
              {/* LEFT FILTERS */}
              <div className="flex w-full shrink-0 gap-3 overflow-x-auto text-gray-600 lg:w-[150px] xl:w-[180px] lg:flex-col lg:overflow-visible">
                <p
                  onMouseEnter={() => setActiveMenu("category")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "category"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Category
                </p>
                <p
                  onMouseEnter={() => setActiveMenu("price")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "price"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Price
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("occasion")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "occasion"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Occasion
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("gender")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "gender"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Gender
                </p>
              </div>
              {activeMenu === "category" && (
                <>
                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 1 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/all-jewellery-l3.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <NavLink to="/alljewellery">
                        <p>All Jewellery</p>
                      </NavLink>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/finger-rings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Finger Rings</p>
                    </span>

                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/nosepin.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Nose Pin</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/bangles.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Bangles</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 2 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/earrings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Earrings</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/mangalsutra.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Mangalsutra</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/necklaces.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Necklaces</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/bracelets.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Bracelets</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 3 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/pendants.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Pendants</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/chains.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Chains</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/necklace-set.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Necklace Set</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/pendant-earring-set.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Pendant & Earrings Set</p>
                    </span>
                  </div>
                </>
              )}
              {activeMenu === "price" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/all-jew-below-25k-hr.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">&lt;25K</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/all-jew-25k-50k-hr.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">25K-50K</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/all-jew-50k-1l-hr.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">50K-1L</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/all-jew-1l-above-hr.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">1L &amp; Above</p>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "occasion" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/office-wear.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">Office Wear</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/modern-wear.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Modern Wear</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/casual-wear.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Casual Wear</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/traditional-wear.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">
                        Traditional Wear
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "gender" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/her-hr.jpg"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">Women</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/him.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Men</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/kids.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Kids & Teens</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom image */}
            <div className="mx-4 border-t border-gray-200 sm:mx-10"></div>

            <div className="flex justify-center bg-amber-50 p-4 outline-yellow-200 sm:p-6">
              <div className="flex flex-wrap items-center justify-center gap-4 text-center sm:gap-6 sm:text-left">
                <img
                  src="/assets/all-jew-menu-bottom.webp"
                  className="w-20 h-12 max-h-[180px] object-cover rounded-full "
                  alt="banner"
                />
                <div className="font-bold">
                  Jewellery for Every Moment- See It All Here!
                  <p className="font-medium">14000+ designs to choose from</p>
                </div>

                <button className="px-5 py-2 bg-amber-900 text-white rounded">
                  View All
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Gold Mega Menu */}
        {openGold && (
          <div
            className="absolute left-0 top-full z-50 hidden h-auto max-h-[75vh] w-full overflow-auto bg-white shadow-xl sm:h-120 lg:block"
            onMouseLeave={() => setOpenDesktopMenu(null)}
          >
            <div className="flex min-w-0 flex-col gap-4 px-4 py-5 text-sm lg:flex-row lg:gap-0 lg:px-4 lg:py-6 xl:px-10">
              {/* LEFT FILTERS */}
              <div className="flex w-full shrink-0 gap-3 overflow-x-auto text-gray-600 lg:w-[150px] xl:w-[180px] lg:flex-col lg:overflow-visible">
                <p
                  onMouseEnter={() => setActiveMenu("category")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "category"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Category
                </p>
                <p
                  onMouseEnter={() => setActiveMenu("price")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "price"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Price
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("occasion")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "occasion"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Occasion
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("goldCoin")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "goldCoin"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Gold Coin
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("men")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "men"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Men
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("metal")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "metal"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Metal
                </p>
              </div>
              {activeMenu === "category" && (
                <>
                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 1 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/all-gold.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>All Gold</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-earrings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gold Earrings</p>
                    </span>

                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-rings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gold Rings</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-nosepins.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gold Nosepins</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 2 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-bangles.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gold Bangles</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-chains.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gold Chains</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-engagement-rings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gold Engagement Rings</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-kadas.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gold Kadas</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 3 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-bracelet.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gold Bracelets</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-pendants.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gold Pendants</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-necklaces.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gold Necklaces</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-mangalsutra.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gold Mangalsutras</p>
                    </span>
                  </div>
                </>
              )}
              {activeMenu === "price" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-below-25k-hr.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">&lt;25K</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/gold/gold-25k-50k-hr.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">25K-50K</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/gold/gold-50k-1l-hr.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">50K-1L</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/gold/gold-1l-above-hr.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">1L &amp; Above</p>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "occasion" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/office-wear.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">Office Wear</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/modern-wear.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Modern Wear</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/casual-wear.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Casual Wear</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/traditional-wear.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">
                        Traditional Wear
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "goldCoin" && (
                <>
                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 1 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/special-coins.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Special Coins</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/4-gram.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>4 Gram</p>
                    </span>

                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/10-gram.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>10 Gram</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/100-gram.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>100 Gram</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 2 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/1-gram.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>1 Gram</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/5-gram.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>5 Gram</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/25-gram.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>25 Gram</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 3 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/2-gram.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>2 Gram</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/8-gram.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>8 Gram</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/50-gram.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>50 Gram</p>
                    </span>
                  </div>
                </>
              )}
              {activeMenu === "men" && (
                <>
                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 1 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-mens-bracelet.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Men's Bracelets</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-mens-kada.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Men's Kadas</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 2 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-mens-chains.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Men's Chains</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-mens-pendant.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Men's Pendants</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 3 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-mens-engagement-rings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Men's Engagement Rings</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/gold-mens-rings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Men's Rings</p>
                    </span>
                  </div>
                </>
              )}
              {activeMenu === "metal" && (
                <>
                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 1 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/Group 8.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Rose</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 2 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/Group 7.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>White</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 3 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gold/Group 10.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Yellow</p>
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Bottom image */}
            <div className="mx-4 border-t border-gray-200 sm:mx-10"></div>

            <div className="flex justify-center bg-amber-50 p-4 outline-yellow-200 sm:p-6">
              <div className="flex flex-wrap items-center justify-center gap-4 text-center sm:gap-6 sm:text-left">
                <img
                  src="/assets/gold/gold-menu-bottom-hr.webp"
                  className="w-20 h-12 max-h-[180px] object-cover rounded-full "
                  alt="banner"
                />
                <div className="font-bold">
                  From Classic to Contemporary.
                  <p className="font-medium">Explore 6000+ Stunning Designs.</p>
                </div>

                <button className="px-5 py-2 bg-amber-900 text-white rounded">
                  View All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Diamond Mega Menu */}
        {openDiamond && (
          <div
            className="absolute left-0 top-full z-50 hidden h-auto max-h-[75vh] w-full overflow-auto bg-white shadow-xl sm:h-120 lg:block"
            onMouseLeave={() => setOpenDesktopMenu(null)}
          >
            <div className="flex min-w-0 flex-col gap-4 px-4 py-5 text-sm lg:flex-row lg:gap-0 lg:px-4 lg:py-6 xl:px-10">
              {/* LEFT FILTERS */}
              <div className="flex w-full shrink-0 gap-3 overflow-x-auto text-gray-600 lg:w-[150px] xl:w-[180px] lg:flex-col lg:overflow-visible">
                <p
                  onMouseEnter={() => setActiveMenu("category")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "category"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Category
                </p>
                <p
                  onMouseEnter={() => setActiveMenu("price")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "price"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Price
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("occasion")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "occasion"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Occasion
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("gender")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "gender"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Gender
                </p>
              </div>
              {activeMenu === "category" && (
                <>
                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 1 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/diamond/all-diamonds.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>All Diamond</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/diamond/diamond-earrings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Diamond Earrings</p>
                    </span>

                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/diamond/diamond-necklace-set.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Diamond Necklace Set</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/diamond/diamond-pendant.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Diamond Pendants</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 2 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/diamond/diamond-bangles.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Diamond Bangles</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/diamond/diamond-engagement-rings-rings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Diamond Rings</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/diamond/diamond-necklaces.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Diamond Necklaces</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 3 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/diamond/diamond-bracelets.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Diamond Bracelets</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/diamond/diamond-mangalsutra.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Diamond Mangalsutra</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/diamond/diamond-nosepins.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Diamond Nose Pins</p>
                    </span>
                  </div>
                </>
              )}
              {activeMenu === "price" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/diamond/diamond-below-25k-hr.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">&lt;25K</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/diamond/diamond-25k-50k-hr.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">25K-50K</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/diamond/diamond-50k-1l-hr.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">50K-1L</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/diamond/diamond-1l-hr.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">1L &amp; Above</p>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "occasion" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/office-wear.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">Office Wear</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/modern-wear.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Modern Wear</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/casual-wear.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Casual Wear</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/traditional-wear.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">
                        Traditional Wear
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "gender" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/her-hr.jpg"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">Women</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/him.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Men</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/kids.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Kids & Teens</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom image */}
            <div className="mx-4 border-t border-gray-200 sm:mx-10"></div>

            <div className="flex justify-center bg-amber-50 p-4 outline-yellow-200 sm:p-6">
              <div className="flex flex-wrap items-center justify-center gap-4 text-center sm:gap-6 sm:text-left">
                <img
                  src="/assets/all-jew-menu-bottom.webp"
                  className="w-20 h-12 max-h-[180px] object-cover rounded-full "
                  alt="banner"
                />
                <div className="font-bold">
                  Diamonds for Every Sparkle
                  <p className="font-medium">
                    Discover 6500+ Exquisite Designs
                  </p>
                </div>

                <button className="px-5 py-2 bg-amber-900 text-white rounded">
                  View All
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Earrings Mega Menu */}
        {openEarrings && (
          <div
            className="absolute left-0 top-full z-50 hidden h-auto max-h-[75vh] w-full overflow-auto bg-white shadow-xl sm:h-120 lg:block"
            onMouseLeave={() => setOpenDesktopMenu(null)}
          >
            <div className="flex min-w-0 flex-col gap-4 px-4 py-5 text-sm lg:flex-row lg:gap-0 lg:px-4 lg:py-6 xl:px-10">
              {/* LEFT FILTERS */}
              <div className="flex w-full shrink-0 gap-3 overflow-x-auto text-gray-600 lg:w-[150px] xl:w-[180px] lg:flex-col lg:overflow-visible">
                <p
                  onMouseEnter={() => setActiveMenu("category")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "category"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Category
                </p>
                <p
                  onMouseEnter={() => setActiveMenu("price")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "price"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Price
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("occasion")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "occasion"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Occasion
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("gender")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "gender"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Gender
                </p>
                <p
                  onMouseEnter={() => setActiveMenu("metal")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "metal"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Metal & Stones
                </p>
              </div>
              {activeMenu === "category" && (
                <>
                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 1 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/earrings/All Earrings 40.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>All Earrings</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/earrings/Jhumkas.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Jhumkas</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 2 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/earrings/Drop & Danglers 40.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Drop & Danglers</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/earrings/Studs & Tops.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Studs & Tops</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 3 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/earrings/Hoops.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Hoops & Huggies</p>
                    </span>
                  </div>
                </>
              )}
              {activeMenu === "price" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/earrings/earrings-below-25k-hr.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">&lt;25K</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/earrings/earrings-25k-50k-hr.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">25K-50K</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/earrings/earrings-50k-1l-hr.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">50K-1L</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/earrings/earrings-1l-above-hr.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">1L &amp; Above</p>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "occasion" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/office-wear.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">Office Wear</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/modern-wear.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Modern Wear</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/casual-wear.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Casual Wear</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/traditional-wear.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">
                        Traditional Wear
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "gender" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/her-hr.jpg"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">
                          Women's Earrings
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/kids.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Kids & Teens</p>
                    </div>
                  </div>
                </div>
              )}
              {activeMenu === "metal" && (
                <>
                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 1 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/earrings/diamond resized.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Diamond</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/earrings/Group 8.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Rose Gold</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 2 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/earrings/Group 10.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gold</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 3 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/earrings/Group 7.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Platinum Metal</p>
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Bottom image */}
            <div className="mx-4 border-t border-gray-200 sm:mx-10"></div>

            <div className="flex justify-center bg-amber-50 p-4 outline-yellow-200 sm:p-6">
              <div className="flex flex-wrap items-center justify-center gap-4 text-center sm:gap-6 sm:text-left">
                <img
                  src="/assets/earrings/earrings-menu-bottom.webp"
                  className="w-20 h-12 max-h-[180px] object-cover rounded-full "
                  alt="banner"
                />
                <div className="font-bold">
                  Earrings for You- Crafted with Precision, Designed for
                  Elegance!
                  <p className="font-medium">Explore 3500+ Stunning Syles.</p>
                </div>

                <button className="px-5 py-2 bg-amber-900 text-white rounded">
                  View All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rings Mega Menu */}
        {openRings && (
          <div
            className="absolute left-0 top-full z-50 hidden h-auto max-h-[75vh] w-full overflow-auto bg-white shadow-xl sm:h-120 lg:block"
            onMouseLeave={() => setOpenDesktopMenu(null)}
          >
            <div className="flex min-w-0 flex-col gap-4 px-4 py-5 text-sm lg:flex-row lg:gap-0 lg:px-4 lg:py-6 xl:px-10">
              {/* LEFT FILTERS */}
              <div className="flex w-full shrink-0 gap-3 overflow-x-auto text-gray-600 lg:w-[150px] xl:w-[180px] lg:flex-col lg:overflow-visible">
                <p
                  onMouseEnter={() => setActiveMenu("category")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "category"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Category
                </p>
                <p
                  onMouseEnter={() => setActiveMenu("price")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "price"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Price
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("occasion")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "occasion"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Occasion
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("gender")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "gender"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Gender
                </p>
                <p
                  onMouseEnter={() => setActiveMenu("metal")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "metal"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Metal & Stones
                </p>
              </div>
              {activeMenu === "category" && (
                <>
                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 1 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/rings/finger-rings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>All Rings</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/rings/diamond-engagement-rings-rings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Diamond Engagement Rings</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/rings/mens-rings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Men's Rings</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 2 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/rings/casual-rings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Casual Rings</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/rings/engagement-rings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Engagement Rings</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/rings/platinum-engagement-rings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Platinum Engagement Rings</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 3 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/rings/couple-rings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Couple Rings</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/rings/gold-engagement-rings-rings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gold Engagement Rings</p>
                    </span>
                  </div>
                </>
              )}
              {activeMenu === "price" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/rings/rings-below-25k-hr.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">&lt;25K</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/rings/rings-25k-50k-hr.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">25K-50K</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/rings/rings-50k-1l-hr.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">50K-1L</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/rings/rings-1l-above-hr.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">1L &amp; Above</p>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "occasion" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/office-wear.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">Office Wear</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/modern-wear.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Modern Wear</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/casual-wear.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Casual Wear</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/traditional-wear.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">
                        Traditional Wear
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "gender" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/her-hr.jpg"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">Women</p>
                      </div>
                    </div>
                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/him.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Men</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/kids.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Kids & Teens</p>
                    </div>
                  </div>
                </div>
              )}
              {activeMenu === "metal" && (
                <>
                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 1 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/rings/diamond resized.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Diamond</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/rings/diamond-l1.svg"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Solitaire</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 2 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/earrings/Group 10.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gold</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/earrings/Group 7.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p> White Gold</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 3 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/earrings/Group 8.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Rose Gold</p>
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Bottom image */}
            <div className="mx-4 border-t border-gray-200 sm:mx-10"></div>

            <div className="flex justify-center bg-amber-50 p-4 outline-yellow-200 sm:p-6">
              <div className="flex flex-wrap items-center justify-center gap-4 text-center sm:gap-6 sm:text-left">
                <img
                  src="/assets/rings/rings-menu-bottom-hr.webp"
                  className="w-20 h-12 max-h-[180px] object-cover rounded-full "
                  alt="banner"
                />
                <div className="font-bold">
                  Celebrate Love & Milestones with a Ring That Speaks Your
                  Heart.
                  <p className="font-medium">3900+ Designs to Choose From.</p>
                </div>

                <button className="px-5 py-2 bg-amber-900 text-white rounded">
                  View All
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Dailywear Mega Menu */}
        {openDailyWear && (
          <div
            className="absolute left-0 top-full z-50 hidden h-auto max-h-[75vh] w-full overflow-auto bg-white shadow-xl sm:h-120 lg:block"
            onMouseLeave={() => setOpenDesktopMenu(null)}
          >
            <div className="flex min-w-0 flex-col gap-4 px-4 py-5 text-sm lg:flex-row lg:gap-0 lg:px-4 lg:py-6 xl:px-10">
              {/* LEFT FILTERS */}
              <div className="flex w-full shrink-0 gap-3 overflow-x-auto text-gray-600 lg:w-[150px] xl:w-[180px] lg:flex-col lg:overflow-visible">
                <p
                  onMouseEnter={() => setActiveMenu("category")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "category"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Category
                </p>
                <p
                  onMouseEnter={() => setActiveMenu("price")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "price"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Price
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("style")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "style"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Style
                </p>
              </div>
              {activeMenu === "category" && (
                <>
                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 1 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/dailywear/dailywear-jewellery.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Dailywear Jewellery</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/dailywear/dailywear-rings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Dailywear Rings</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 2 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/dailywear/dailywear-chains.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Dailywear Chains</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/dailywear/dailywear-mangalsutra.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Dailywear Mangalsutra</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 3 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/dailywear/dailywear-earrings.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Dailywear Earrings</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/dailywear/dailywear-pendant.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Dailywear Pendants</p>
                    </span>
                  </div>
                </>
              )}
              {activeMenu === "price" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px  bg-gray-300 mx-4 lg:block"></div>

                  <div className="flex flex-wrap my-3 items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/dailywear/dailywear-below-25k.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">&lt;25K</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/dailywear/dailywear-25k-50k.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">25K-50K</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/dailywear/dailywear-50k-1l.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">50K-1L</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/dailywear/dailywear-1l-above.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">1L &amp; Above</p>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "style" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col my-3 items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/office-wear.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">Office Wear</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/modern-wear.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Modern Wear</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/casual-wear.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Casual Wear</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/traditional-wear.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">
                        Traditional Wear
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom image */}
            <div className="mx-4 border-t border-gray-200 sm:mx-10"></div>

            <div className="flex justify-center bg-amber-50 p-4 outline-yellow-200 sm:p-6">
              <div className="flex flex-wrap items-center justify-center gap-4 text-center sm:gap-6 sm:text-left">
                <img
                  src="/assets/dailywear/dailywear-menu-bottom-hr.webp"
                  className="w-20 h-12 max-h-[180px] object-cover rounded-full "
                  alt="banner"
                />
                <div className="font-bold">
                  From Everyday Glow to Extraordinary Sparkle.
                  <p className="font-medium">3000+ Designs Await.</p>
                </div>

                <button className="px-5 py-2 bg-amber-900 text-white rounded">
                  View All
                </button>
              </div>
            </div>
          </div>
        )}
        {openGemstone && (
          <div
            className="absolute left-0 top-full z-50 hidden h-auto max-h-[75vh] w-full overflow-auto bg-white shadow-xl sm:h-120 lg:block"
            onMouseLeave={() => setOpenDesktopMenu(null)}
          >
            <div className="flex min-w-0 flex-col gap-4 px-4 py-5 text-sm lg:flex-row lg:gap-0 lg:px-4 lg:py-6 xl:px-10">
              {/* LEFT FILTERS */}
              <div className="flex w-full shrink-0 gap-3 overflow-x-auto text-gray-600 lg:w-[150px] xl:w-[180px] lg:flex-col lg:overflow-visible">
                <p
                  onMouseEnter={() => setActiveMenu("category")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "category"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Category
                </p>
              </div>
              {activeMenu === "category" && (
                <>
                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 1 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gemstone/gemstone resized.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gemstone</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gemstone/gemstone resized-1.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gemstone Rings</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 2 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gemstone/gemstone resized-1.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gemstone Earrings</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gemstone/emerald.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Emerald Stone</p>
                    </span>
                  </div>

                  <div className="mx-4 hidden w-px self-stretch bg-gray-300 lg:-my-6 lg:block"></div>

                  {/* COLUMN 3 */}
                  <div className="flex min-w-[180px] flex-1 flex-col gap-2 lg:w-1/4">
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gemstone/gemstone resized-1.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Gemstone Pendants</p>
                    </span>
                    <span
                      className="group cursor-pointer flex items-center gap-2 py-4 font-semibold 
                 hover:text-[#8a4a2f]
                 hover:bg-gray-100
                 hover:shadow-sm
                 transition-all duration-200 px-2 rounded-md"
                    >
                      <div
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center
                  border border-transparent
                  group-hover:border-[#8a4a2f]
                  transition-all duration-200"
                      >
                        <img
                          src="/assets/gemstone/ruby.webp"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <p>Ruby</p>
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="mx-4 border-t border-gray-200 sm:mx-10"></div>
          </div>
        )}
        {openWedding && (
          <div
            className="absolute left-0 top-full z-50 hidden h-auto max-h-[75vh] w-full overflow-auto bg-white shadow-xl sm:h-120 lg:block"
            onMouseLeave={() => setOpenDesktopMenu(null)}
          >
            <div className="flex min-w-0 flex-col gap-4 px-4 py-5 text-sm lg:flex-row lg:gap-0 lg:px-4 lg:py-6 xl:px-10">
              {/* LEFT FILTERS */}
              <div className="flex w-full shrink-0 gap-3 overflow-x-auto text-gray-600 lg:w-[150px] xl:w-[180px] lg:flex-col lg:overflow-visible">
                <p
                  onMouseEnter={() => setActiveMenu("category")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "category"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Category
                </p>
                <p
                  onMouseEnter={() => setActiveMenu("community")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "community"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Community
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("metal")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "metal"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Metal
                </p>
              </div>

              {activeMenu === "category" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>

                  <div className="flex flex-wrap my-3 items-center gap-4 sm:gap-x-8 sm:gap-y-2">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/wedding/rivaah-necklace-set.jpg"
                          className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                        />
                        <p className="text-sm font-medium mt-2">
                          Wedding Choker
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/rivaah-haram.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">Wedding Haram</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/rivaah-bangles.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">
                        Wedding Bangles
                      </p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/rivaah-diamond-jewellery.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">
                        Wedding Diamond
                      </p>
                    </div>
                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/rivaah-mangalsutra.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">
                        Wedding Mangalsutra
                      </p>
                    </div>
                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/rivaah-accessories.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">Accessories</p>
                    </div>
                  </div>
                </div>
              )}
              {activeMenu === "community" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>

                  <div className="flex flex-wrap my-3 items-center gap-4 sm:gap-x-8 sm:gap-y-2">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/wedding/bengali-bride.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                        />
                        <p className="text-sm font-medium mt-2">
                          Bengali Bride
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/bihari-bride.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">Bihari Bride</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/gujarati-bride.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">Gujarati Bride</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/kannada-bride.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">Kannada Bride</p>
                    </div>
                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/marathi-bride.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">Marathi Bride</p>
                    </div>
                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/odia-bride.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">Odia Bride</p>
                    </div>
                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/punjabi-bride.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">Punjabi Bride</p>
                    </div>
                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/tamil-bride.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">Tamil Bride</p>
                    </div>
                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/telugu-bride.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">Telugu Bride</p>
                    </div>
                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/up-bride.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">UP Bride</p>
                    </div>
                  </div>
                </div>
              )}
              {activeMenu === "metal" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>

                  <div className="flex flex-wrap my-3 items-center gap-4 sm:gap-x-8 sm:gap-y-2">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/wedding/rivaah-plain-gold.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                        />
                        <p className="text-sm font-medium mt-2">Plain Gold</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/rivaah-pjws.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">
                        Stone Jewellery
                      </p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/rivaah-glass-kundan.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">Glass Kundan</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/rivaah-jwgs.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">Gemstones</p>
                    </div>
                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/wedding/rivaah-polki.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
                      />
                      <p className="text-sm font-medium mt-2">Polki</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom image */}
            <div className="mx-4 border-t border-gray-200 sm:mx-10"></div>
          </div>
        )}
        {openGifting && (
          <div
            className="absolute left-0 top-full z-50 hidden h-auto max-h-[75vh] w-full overflow-auto bg-white shadow-xl sm:h-120 lg:block"
            onMouseLeave={() => setOpenDesktopMenu(null)}
          >
            <div className="flex min-w-0 flex-col gap-4 px-4 py-5 text-sm lg:flex-row lg:gap-0 lg:px-4 lg:py-6 xl:px-10">
              {/* LEFT FILTERS */}
              <div className="flex w-full shrink-0 gap-3 overflow-x-auto text-gray-600 lg:w-[150px] xl:w-[180px] lg:flex-col lg:overflow-visible">
                <p
                  onMouseEnter={() => setActiveMenu("giftfor")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "giftfor"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Gift For
                </p>
                <p
                  onMouseEnter={() => setActiveMenu("price")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "price"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Price
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("occasion")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "occasion"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Occasion
                </p>

                <p
                  onMouseEnter={() => setActiveMenu("corporate")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "corporate"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Corporate
                </p>
              </div>
              {activeMenu === "giftfor" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/her-hr.jpg"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">Women</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/him.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Men</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/kids.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Kids & Teens</p>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "price" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/gifting/gifting-below-25k.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">&lt;25K</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/gifting/gifting-25k-50k.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">25K-50K</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/gifting/gifting-50k-1l.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">50K-1L</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/gifting/gifting-1l-above.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">1L &amp; Above</p>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "occasion" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/gifting/gifting-wedding.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">Wedding</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/gifting/gifting-birthday.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Birthday</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/gifting/gifting-anniversary.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Anniversary</p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/gifting/gifting-auspicious.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">Auspicious</p>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "corporate" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/gifting/corporate-gifting.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">
                          Corporate Gifting
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom image */}
            <div className="mx-4 border-t border-gray-200 sm:mx-10"></div>

            <div className="flex justify-center bg-amber-50 p-4 outline-yellow-200 sm:p-6">
              <div className="flex flex-wrap items-center justify-center gap-4 text-center sm:gap-6 sm:text-left">
                <img
                  src="/assets/gifting/gifting-menu-bottom.webp"
                  className="w-20 h-12 max-h-[180px] object-cover rounded-full "
                  alt="banner"
                />
                <div className="font-bold">
                  Celebrate life’s joys with Anjali.
                  <p className="font-medium">
                    Find the jewellery for all occasions and celebrations here.
                  </p>
                </div>

                <button className="px-5 py-2 bg-amber-900 text-white rounded">
                  View All
                </button>
              </div>
            </div>
          </div>
        )}
        {openMore && (
          <div
            className="absolute left-0 top-full z-50 hidden h-auto max-h-[75vh] w-full overflow-auto bg-white shadow-xl sm:h-120 lg:block"
            onMouseLeave={() => setOpenDesktopMenu(null)}
          >
            <div className="flex min-w-0 my-3 flex-col gap-4 px-4 py-5 text-sm lg:flex-row lg:gap-0 lg:px-4 lg:py-6 xl:px-10">
              {/* LEFT FILTERS */}
              <div className="flex w-full shrink-0 gap-3 overflow-x-auto text-gray-600 lg:w-[150px] xl:w-[180px] lg:flex-col lg:overflow-visible">
                <p
                  onMouseEnter={() => setActiveMenu("customer")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "customer"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Customer Service
                </p>
                <p
                  onMouseEnter={() => setActiveMenu("exchange")}
                  className={`py-2 px-4 cursor-pointer font-semibold rounded-md transition-all duration-200
    hover:bg-amber-50 hover:border hover:border-[#8a4a2f] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    ${
      activeMenu === "exchange"
        ? "bg-amber-50 border border-[#8a4a2f] shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#8a4a2f]"
        : "text-gray-700"
    }`}
                >
                  Exchange Program
                </p>
              </div>
              {activeMenu === "customer" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/more/blogs.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">Blog</p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/more/book-an-appointment.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">
                        Book an Appointment
                      </p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/more/jewellery-care-guide.webp"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">
                        Jewellery Care Guide
                      </p>
                    </div>

                    <div
                      className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                    >
                      <img
                        src="/assets/more/ring-size-guide.jpg"
                        className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                      />
                      <p className="text-sm font-medium mt-2">
                        Ring Size Guide
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {activeMenu === "exchange" && (
                <div className="flex w-full min-w-0 gap-6 lg:-my-6">
                  <div className="hidden w-px bg-gray-300 mx-4 lg:block"></div>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* CARD */}
                      <div
                        className="flex flex-col items-center p-2 rounded-md cursor-pointer
        hover:bg-white hover:border hover:border-[#8a4a2f]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        transition-all duration-200"
                      >
                        <img
                          src="/assets/gifting/gifting-below-25k.webp"
                          className="h-28 w-28 rounded-md object-contain sm:h-40 sm:w-40"
                        />
                        <p className="text-sm font-medium mt-2">
                          Gold Exchange
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom image */}
            <div className="mx-4 border-t border-gray-200 sm:mx-10"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
