import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Rings");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [productType, setProductType] = useState("Ring");
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [specifications, setSpecifications] = useState([
    { key: "", value: "" },
  ]);
  const [benefits, setBenefits] = useState([""]);
  const [sizes, setSizes] = useState([""]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      const specificationObject = specifications.reduce((acc, item) => {
        if (item.key.trim() && item.value.trim()) {
          acc[item.key.trim()] = item.value.trim();
        }
        return acc;
      }, {});
      const filteredBenefits = benefits.filter((item) => item.trim() !== "");

      console.log(specificationObject);
      console.log(filteredBenefits);

      formData.append("specifications", JSON.stringify(specificationObject));

      formData.append("benefits", JSON.stringify(benefits.filter(Boolean)));

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("productType", productType);
      formData.append("price", price);
      formData.append("bestseller", bestseller);
      formData.append("isNewArrival", isNewArrival);

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      console.log({
        name,
        category,
        subCategory,
        productType,
      });

      const filteredSizes = sizes.filter((size) => size.trim() !== "");

      formData.append("sizes", JSON.stringify(filteredSizes));
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: { token },
        },
      );

      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);

        setName("");
        setDescription("");
        setCategory("Men");
        setSubCategory("Rings");
        setProductType("Ring");
        setPrice("");
        setBestseller(false);
        setIsNewArrival(false);
        setSpecifications([{ key: "", value: "" }]);
        setBenefits([""]);
        setSizes([""]);
        setImage1(false);
        setImage2(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="flex flex-col w-full items-start gap-3">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="mt-5">
        <p className="w-full">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="my-5">
        <p className="w-full">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] h-32 px-3 py-2"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2"
          >
            <option value="Rings">Rings</option>
            <option value="Pendants">Pendants</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Type</p>
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Anklet">Anklet</option>
            <option value="Bangle">Bangle</option>
            <option value="Bracelet">Bracelet</option>
            <option value="Chain">Chain</option>
            <option value="Earrings">Earrings</option>
            <option value="Finger Ring">Finger Ring</option>
            <option value="Haram">Haram</option>
            <option value="Jewellery Set">Jewellery Set</option>
            <option value="Kada">Kada</option>
            <option value="Maang Tikka">Maang Tikka</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
            required
          />
        </div>
      </div>
      <div className="w-full mt-5">
        <p className="font-medium mb-2">Available Sizes</p>

        {sizes.map((size, index) => (
          <div key={index} className="flex gap-3 mb-3">
            <input
              type="text"
              placeholder="Size"
              value={size}
              onChange={(e) => {
                const updated = [...sizes];
                updated[index] = e.target.value;
                setSizes(updated);
              }}
              className="border px-3 py-2 w-40"
            />

            <button
              type="button"
              onClick={() => {
                const updated = sizes.filter((_, i) => i !== index);
                setSizes(updated);
              }}
              className="bg-red-500 text-white px-3 rounded"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setSizes([...sizes, ""])}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Size
        </button>
      </div>
      <div className="flex gap-2 mt-5">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />

        <label htmlFor="bestseller" className="cursor-pointer ml-2">
          Mark as Bestseller
        </label>
      </div>

      <div className="flex gap-2 mt-3">
        <input
          type="checkbox"
          id="newArrival"
          checked={isNewArrival}
          onChange={() => setIsNewArrival((prev) => !prev)}
        />

        <label htmlFor="newArrival" className="cursor-pointer ml-2">
          Mark as New Arrival
        </label>
      </div>
      {/*Specifications*/}
      {/* Product Specifications */}
      <div className="w-full mt-6">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-lg">Product Specifications</p>

          <button
            type="button"
            onClick={() =>
              setSpecifications([...specifications, { key: "", value: "" }])
            }
            className="px-4 py-2 bg-black text-white rounded"
          >
            + Add Specification
          </button>
        </div>

        <div className="space-y-3">
          {specifications.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center"
            >
              <input
                type="text"
                placeholder="Label (Purity)"
                value={item.key}
                onChange={(e) => {
                  const data = [...specifications];
                  data[index].key = e.target.value;
                  setSpecifications(data);
                }}
                className="border rounded px-3 py-2 md:col-span-2"
              />

              <input
                type="text"
                placeholder="Value (18K)"
                value={item.value}
                onChange={(e) => {
                  const data = [...specifications];
                  data[index].value = e.target.value;
                  setSpecifications(data);
                }}
                className="border rounded px-3 py-2 md:col-span-2"
              />

              <button
                type="button"
                onClick={() =>
                  setSpecifications(
                    specifications.filter((_, i) => i !== index),
                  )
                }
                className="bg-gray-500 text-white rounded px-4 py-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Product Benefits */}
      <div className="w-full mt-8">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-lg">Product Benefits</p>

          <button
            type="button"
            onClick={() => setBenefits([...benefits, ""])}
            className="px-4 py-2 bg-black text-white rounded"
          >
            + Add Benefit
          </button>
        </div>

        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                placeholder="Lifetime Exchange"
                value={benefit}
                onChange={(e) => {
                  const data = [...benefits];
                  data[index] = e.target.value;
                  setBenefits(data);
                }}
                className="flex-1 border rounded px-3 py-2"
              />

              <button
                type="button"
                onClick={() =>
                  setBenefits(benefits.filter((_, i) => i !== index))
                }
                className="bg-gray-500 text-white rounded px-4 py-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
