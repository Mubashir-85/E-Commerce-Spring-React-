import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";
// import UpdateProduct from "./UpdateProduct";
const Product = () => {
  const { id } = useParams();
  const { data, addToCart, removeFromCart, cart, refreshData } =
    useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );
        setProduct(response.data);
        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/product/${id}/image`,
        { responseType: "blob" }
      );
      setImageUrl(URL.createObjectURL(response.data));
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      removeFromCart(id);
      console.log("Product deleted successfully");
      alert("Product deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handlAddToCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };
  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }
  return (
  <>
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl overflow-hidden">
        
        {/* Left Section - Product Image */}
        <div className="flex items-center justify-center bg-gray-100 p-6">
          <img
            className="w-full max-h-[500px] object-contain rounded-lg"
            src={imageUrl}
            alt={product.imageName}
          />
        </div>

        {/* Right Section - Product Details */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              {product.category}
            </span>

            <h1 className="text-4xl font-bold text-gray-900 mt-2">
              {product.name}
            </h1>

            <h5 className="text-lg text-gray-600 mt-2">
              {product.brand}
            </h5>

            <p className="text-gray-700 leading-relaxed mt-6">
              {product.description}
            </p>
          </div>

          <div className="mt-8">
            <span className="block text-3xl font-bold text-green-600 mb-4">
              {"$" + product.price}
            </span>

            <button
              className={`w-full py-3 rounded-lg font-semibold transition ${
                !product.available
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              onClick={handlAddToCart}
              disabled={!product.available}
            >
              {product.available ? "Add to Cart" : "Out of Stock"}
            </button>

            <h6 className="mt-6 text-gray-700">
              Stock Available :
              <span className="ml-2 text-green-600 font-bold">
                {product.quantity}
              </span>
            </h6>

            <div className="mt-4">
              <h6 className="font-semibold text-gray-800">
                Product listed on:
              </h6>
              <i className="text-gray-600">
                {new Date(product.releaseDate).toLocaleDateString()}
              </i>
            </div>
          </div>

          {/* Update & Delete Buttons */}
          {/*
          <div className="flex gap-4 mt-8">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
              type="button"
              onClick={handleEditClick}
            >
              Update
            </button>

            <button
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
              type="button"
              onClick={deleteProduct}
            >
              Delete
            </button>
          </div>
          */}
        </div>
      </div>
    </div>
  </>
);
};

export default Product;