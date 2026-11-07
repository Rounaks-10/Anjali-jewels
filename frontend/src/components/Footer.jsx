import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#f8f6f2] -mt-10 ">
    <footer className="relative bg-[#300708]  text-white mt-6 rounded-xl mx-3 md:mx-6 lg:mx-10 overflow-hidden mb-5">

      {/* TOP CENTER DECORATIVE CURVE (Tanishq style) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none">
        <img
          src="/assets/home/top-bottom-border-curve.webp"
          alt="border curve"
          className="w-40 md:w-60 lg:w-72 opacity-80"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-14">

        {/* HEADER / LOGO */}
        <div className="flex flex-col items-center md:items-start mb-12">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">
            Anjali Jewels
          </h1>
          <p className="text-sm text-gray-300 mt-2 text-center md:text-left">
            Crafting timeless elegance with every creation
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* USEFUL LINKS */}
          <div>
            <h2 className="text-lg font-semibold mb-5">Useful Links</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer">Delivery Information</li>
              <li className="hover:text-white cursor-pointer">Payment Options</li>
              <li className="hover:text-white cursor-pointer">Track Your Order</li>
              <li className="hover:text-white cursor-pointer">Returns</li>
              <li className="hover:text-white cursor-pointer">Find a Store</li>
            </ul>
          </div>

          {/* INFORMATION */}
          <div>
            <h2 className="text-lg font-semibold mb-5">Information</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Offers & Contest</li>
              <li className="hover:text-white cursor-pointer">Help & FAQs</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-lg font-semibold mb-5">Contact Us</h2>

            <p className="text-sm text-gray-300">1800-296-6677</p>

            <div className="mt-4 space-y-2 text-sm text-gray-300">
              <p>Chat With Us</p>
              <p>+91 8147349242</p>
              <p>support@anjalijewels.com</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="hover:text-white cursor-pointer">Instagram</span>
              <span className="hover:text-white cursor-pointer">Facebook</span>
              <span className="hover:text-white cursor-pointer">YouTube</span>
              <span className="hover:text-white cursor-pointer">Twitter</span>
            </div>
          </div>

        </div>

        {/* PAYMENT */}
        <div className="border-t border-white/20 mt-12 pt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
          <span>Visa</span>
          <span>MasterCard</span>
          <span>UPI</span>
          <span>PayPal</span>
          <span>American Express</span>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Anjali Jewels. All Rights Reserved.
        </div>

      </div>
    </footer>
    </div>
  );
};

export default Footer;