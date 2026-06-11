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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
          <h2 className="text-xl font-medium text-gray-600">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          
          {/* Left Section - Product Image */}
          <div className="relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12 min-h-[400px] md:min-h-[600px]">
            <img
              className="w-full h-full max-h-[500px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              src={imageUrl}
              alt={product.imageName}
            />
            {!product.available && (
              <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wide shadow-lg">
                OUT OF STOCK
              </div>
            )}
          </div>

          {/* Right Section - Product Details */}
          <div className="flex flex-col justify-between p-8 md:p-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                  {product.category}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {new Date(product.releaseDate).toLocaleDateString()}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                {product.name}
              </h1>

              <p className="text-lg text-gray-500 font-medium mt-2">
                {product.brand}
              </p>

              <div className="mt-6 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-500">(128 reviews)</span>
              </div>

              <p className="text-gray-600 leading-relaxed mt-6 text-base md:text-lg">
                {product.description}
              </p>
            </div>

            <div className="mt-8 md:mt-12 space-y-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                  {"$" + product.price}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  {"$" + Math.round(product.price * 1.2)}
                </span>
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  SAVE 20%
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${product.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <span className="font-semibold">
                    {product.available ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <span className="text-gray-300">|</span>
                <span>
                  Only <strong className="text-gray-900">{product.quantity}</strong> units left
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className={`flex-1 py-4 px-8 rounded-xl font-bold text-base uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] ${
                    !product.available
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                  onClick={handlAddToCart}
                  disabled={!product.available}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {product.available ? "Add to Cart" : "Out of Stock"}
                  </span>
                </button>

                <button className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Wishlist
                </button>
              </div>

              <div className="flex items-center justify-center gap-8 pt-4 border-t border-gray-100 text-xs text-gray-500 uppercase tracking-wide">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free Shipping
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  2 Year Warranty
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  30 Day Returns
                </span>
              </div>
            </div>

            {/* Update & Delete Buttons */}
            
            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
              <button
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
                type="button"
                onClick={handleEditClick}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Update
              </button>

              {/* <button
                className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
                type="button"
                onClick={deleteProduct}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button> */}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;