import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../Context/Context";
import { CiHeart } from "react-icons/ci";

import { Link } from "react-router-dom";

function Home({ selectedCategory }) {
  const [products, setProducts] = useState([]);

  const [isdataFetched, setIsDataFetched] = useState(false);
  const { data, isError, addToCart, refreshData  } =
    useContext(AppContext);

  useEffect(() => {
    if (!isdataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isdataFetched]);

  useEffect(() => {
    console.log("Data from context:", data);
    if (data && data.length > 0) {
      const fetchImageAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" },
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                `Error fetching image for product ${product.id}:`,
                error,
              );
              return { ...product, imageUrl: null };
            }
          }),
        );
        setProducts(updatedProducts);
        console.log("updated products", updatedProducts);
        
      };
      fetchImageAndUpdateProducts();
    }
  }, [data]);

  const filteredProduct = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-50 border border-red-200 text-red-600 px-8 py-6 rounded-xl shadow-sm">
          <p className="text-lg font-medium">Error fetching products.</p>
          <p className="text-sm text-red-500 mt-1">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProduct.length === 0 ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <h2 className="text-2xl font-semibold text-gray-500">
              No products Available
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProduct.map((product) => {
              const { id, name, brand, description, price, imageUrl, available } =
                product;
              return (
                <div 
                  key={id} 
                  className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 ${available ? "bg-white hover:-translate-y-1" : "bg-gray-100 opacity-75"}`}
                >
                  <Link to={`/product/${id}`} className="block">
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button 
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 text-gray-600 hover:text-red-500"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <CiHeart className="w-5 h-5" />
                      </button>
                      {!available && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="mb-3">
                        <h5 className="text-base font-bold text-gray-900 line-clamp-1 tracking-wide">
                          {name.toUpperCase()}
                        </h5>
                        <i className="text-sm text-gray-500 font-serif">{"~" + brand}</i>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <h5 className="text-xl font-bold text-gray-900">
                          {"$" + price}
                        </h5>
                        <button
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                            available 
                              ? "bg-gray-900 text-white hover:bg-gray-800 active:scale-95 shadow-sm hover:shadow-md" 
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                          }}
                          disabled={!available}
                        >
                          {available ? "Add to Cart" : "Out of Stock"}
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;