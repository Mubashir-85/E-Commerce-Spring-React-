import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsError(true);
      }
    };
    fetchData();
  }, []);
  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error fetching products. Please try again later.
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between min-h-screen bg-gray-100 py-2 px-6 sm:px-0 ">
        {products.map((product) => {
          return (
            <div
              className="bg-white rounded-lg shadow-md p-4 m-4 flex flex-col items-center justify-center h-64 w-64"
              key={product.id}
            >
              <h2 className="text-xl font-bold mb-2">{product.name.toUpperCase()}</h2>
              <p className="text-gray-600">{product.brand}</p>
              <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add To Cart
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
