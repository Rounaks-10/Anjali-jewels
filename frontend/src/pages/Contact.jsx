import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const inputClassName =
  "mt-2 h-12 w-full rounded border border-gray-300 px-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-[#8a4a2f] focus:ring-2 focus:ring-[#ead7d0]";

const contactOptions = [
  ["Call Us", "+91 98765 43210", "10:00 AM to 8:00 PM"],
  ["Email", "care@anjalijewels.com", "Replies within 24 hours"],
  ["Visit Store", "MG Road, Bengaluru", "Open all days"],
];
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Contact = () => {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      enquiryType: formData.get("enquiryType"),
      message: formData.get("message"),
    };

    try {
      const response = await axios.post(`${backendUrl}/api/contact`, data);

      if (response.data.success) {
        setSubmitted(true);
        event.target.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-20 bg-white px-4 pb-16 sm:mt-8 lg:mt-0">
      <div className="py-5 text-sm text-gray-600">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">{">"}</span>
        <span className="font-medium text-[#8a4a2f]">Contact</span>
      </div>

      <div className="border-b border-gray-200 pb-6">
        <p className="text-sm font-semibold uppercase text-[#8a4a2f]">
          Customer care
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-[#2b0000] sm:text-4xl">
          Contact Anjali Jewels
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
          Speak with our team for jewellery guidance, order support, store
          visits, repairs, and custom enquiries.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="space-y-5">
          {contactOptions.map(([title, value, detail]) => (
            <div
              key={title}
              className="rounded-md border border-[#ead7d0] bg-[#fffaf7] p-5"
            >
              <p className="text-sm font-semibold uppercase text-gray-500">
                {title}
              </p>
              <p className="mt-2 font-serif text-2xl font-semibold text-[#2b0000]">
                {value}
              </p>
              <p className="mt-1 text-sm text-gray-600">{detail}</p>
            </div>
          ))}

          <div className="rounded-md border border-gray-200 p-5">
            <h2 className="font-serif text-2xl font-semibold text-[#2b0000]">
              Store Assistance
            </h2>
            <div className="mt-4 grid gap-3 text-sm text-gray-700">
              {[
                "Gold and diamond jewellery guidance",
                "Order, exchange, and delivery support",
                "Appointment booking for store visits",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded bg-[#fbf7f4] px-4 py-3"
                >
                  <span>{item}</span>
                  <span className="font-semibold text-[#8a4a2f]">
                    Available
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-md border border-gray-200 p-6">
          <h2 className="font-serif text-2xl font-semibold text-[#2b0000]">
            Send an Enquiry
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Share your details and our jewellery specialist will get back to
            you.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            <label className="text-sm font-semibold text-black">
              Full Name
              <input
                type="text"
                name="name"
                required
                minLength="3"
                placeholder="Enter full name"
                className={inputClassName}
              />
            </label>
            <label className="text-sm font-semibold text-black">
              Mobile Number
              <input
                type="tel"
                name="phone"
                required
                pattern="[6-9][0-9]{9}"
                placeholder="10 digit mobile number"
                className={inputClassName}
              />
            </label>
            <label className="text-sm font-semibold text-black sm:col-span-2">
              Email Address
              <input
                type="email"
                name="email"
                required
                placeholder="Enter email address"
                className={inputClassName}
              />
            </label>
            <label className="text-sm font-semibold text-black sm:col-span-2">
              Enquiry Type
              <select
                name="enquiryType"
                required
                className={inputClassName}
                defaultValue=""
              >
                <option value="" disabled>
                  Select enquiry type
                </option>
                <option>Order Support</option>
                <option>Product Guidance</option>
                <option>Store Appointment</option>
                <option>Repair or Exchange</option>
                <option>Custom Jewellery</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-black sm:col-span-2">
              Message
              <textarea
                name="message"
                required
                minLength="10"
                rows="5"
                placeholder="How can we help you?"
                className="mt-2 w-full rounded border border-gray-300 px-4 py-3 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-[#8a4a2f] focus:ring-2 focus:ring-[#ead7d0]"
              ></textarea>
            </label>

            {submitted && (
              <p className="rounded border border-[#b7dfc1] bg-[#f3fbf5] px-4 py-3 text-sm font-medium text-[#1f7a3a] sm:col-span-2">
                Thank you. Your enquiry has been received.
              </p>
            )}

            <button
              type="submit"
              className="h-12 rounded bg-[#8a4a2f] px-6 text-sm font-bold text-white transition hover:bg-[#6f3923] sm:col-span-2"
            >
              Submit Enquiry
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
