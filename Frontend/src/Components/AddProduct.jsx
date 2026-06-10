import axios from "axios";
import React, { useState } from "react";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    releaseDate: "",
    available: true,
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" }),
    );
    axios
      .post("http://localhost:8080/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added", response.data);
        alert("Product added successfully");
      })
      .catch((error) => {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Full Error:", error);
      });
    // .catch((error) => {
    //   console.error("Error adding product", error);
    //   alert("Error adding product");
    // });
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Add Product</h2>

        <form className="space-y-6" onSubmit={submitHandler}>
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              onChange={handleInputChange}
              name="name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium mb-2">Brand</label>
            <input
              type="text"
              onChange={handleInputChange}
              name="brand"
              placeholder="Enter brand name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              onChange={handleInputChange}
              name="description"
              rows="4"
              placeholder="Enter product description"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                onChange={handleInputChange}
                name="price"
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                onChange={handleInputChange}
                name="quantity"
                placeholder="Enter stock quantity"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              onChange={handleInputChange}
              name="category"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Select Category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
            </select>
          </div>

          {/* Release Date */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Release Date
            </label>
            <input
              type="date"
              onChange={handleInputChange}
              name="releaseDate"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="image"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:px-4 file:py-2 file:border-0 file:bg-blue-500 file:text-white file:rounded-md hover:file:bg-blue-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
  // <div>
  {
    /* <h2 className="text-center" style={{ padding: "10rem" }}>
        Add Product Coming Soon.....
      </h2> */
  }
  // </div>
}

export default AddProduct;
