import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import AllJewellery from "./pages/AllJewellery";
import ProductDetails from "./pages/ProductDetails";
import VerifyOtp from "./pages/VerifyOtp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    // Navbar top spacing fixed inside Navbar component
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/place-order" element={<PlaceOrder />} /> {/*Change*/}
        <Route path="/orders" element={<Orders />} /> {/*Change*/}
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/alljewellery" element={<AllJewellery />} />
        <Route path="/product/:productSlug" element={<ProductDetails />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
};

export default App;
