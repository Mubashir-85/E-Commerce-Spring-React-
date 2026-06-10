import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../Context/Context";
import { CiHeart } from "react-icons/ci";

import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  const [isdataFetched, setIsDataFetched] = useState(false);
  const { data, isError, addToCart, refreshData, selectedCategory } =
    useContext(AppContext);

  useEffect(() => {
    if (!isdataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isdataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImageAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/products/${product.id}/image`,
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
      };
      fetchImageAndUpdateProducts();
    }
  }, [data]);

  const filteredProduct = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;
  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error fetching products. Please try again later.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredProduct.length === 0 ? (
          <h2 className="text center flex items-center justify-center">
            No products Available
          </h2>
        ) : (
          filteredProduct.map((product) => {
            const { id, name, brand, description, price, imageUrl, available } =
              product;
            return (
              <div key={id} className="mb-3 w-[18rem] h-[24rem] flex flex-col">
                <Link to={`/product/${id}`} className="h-[70%]">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-100% h-[180px] object-cover p-[5px] m-0"
                  />
                  <div className="absolute top-[25px] left-[220px] z-1">
                    <div>
                      <CiHeart />
                    </div>
                  </div>
                  <div className="flex grow flex-col justify-between p-[10px]">
                    <div>
                      <h5>{name.toUpperCase()}</h5>
                      <i className="font-serif">{"~" + brand}</i>
                    </div>
                    <div>
                      <h5>{"$" + price}</h5>
                      <button
                        className="w-100%"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        disabled={!available}
                      ></button>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default Home;
