import axios from "axios";
import React, { useState } from "react";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: "",
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
        console.error("Error adding product", error);
        alert("Error adding product");
      });
  };
  return (
    <div>
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Add Product Coming Soon.....
      </h2>
    </div>
  );
}

export default AddProduct;
