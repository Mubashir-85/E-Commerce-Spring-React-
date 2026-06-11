import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const { id } = useParams;
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState();
  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    decription: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    available: "",
    quantity: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`,
        );
        setProduct(response.data);
        const responseImage = await axios.get(
          `http://localhost:8080/api/product/${id}/image`,
          { responseType: "blob" },
        );
        const imageFile = await convertUrlToFile(
          responseImage.data,
          response.data.imageName,
        );
        setImage(imageFile);
        setUpdateProduct(response.data);
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    console.log("Image updated", image);
  }, [image]);

  const convertUrlToFile = () => {
    const file = new File([blobData], fileName, { type: blob.type });
    return file;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("img", image);
    console.log("product updated", updateProduct);
    const updatedProduct = new FromData();
    updatedProduct.append("imgFile", img);
    updatedProduct.append(
      "product",
      new Blob([JSON.stringify(updateProduct)], { type: "application/json" }),
    );

    console.log("formData", updatedProduct);
    axios
      .put(`http:/localhost:8080/api/product/${id}`, updateProduct, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product Successfully", updatedProduct);
        alert("Product Updated successfully");
      })
      .catch((error) => {
        console.error("Error updating product", error);
        console.log("Product unsuccessfully updated", updateProduct);
        alert("Failed to update product. Please try again.");
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({
      ...updateProduct,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };
  return;

  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Update Product</h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Product Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            onChange={handleChange}
            name="name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium mb-2">Brand</label>
          <input
            type="text"
            onChange={handleChange}
            name="brand"
            placeholder="Enter brand name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
            onChange={handleChange}
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
          <label className="block text-sm font-medium mb-2">Release Date</label>
          <input
            type="date"
            onChange={handleChange}
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
            onChange={handleChange}
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
  </div>;
}

export default UpdateProduct;
