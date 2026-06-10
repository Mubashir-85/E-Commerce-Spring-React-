import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AppContext = createContext({
  data: [],
  isError: "",
  cart: [],
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  refreshData: () => {},
  updateStockQuantity: (productId, quantity) => {},
});

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const addToCart = (product) => {
    const existingProduct = cart.findIndex((item) => item.id === product.id);
    if (existingProduct !== -1) {
      const updatedCart = cart.map((item, index) =>
        index === existingProduct
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const refreshData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      console.log(response.data);
      
      setData(response.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  const clearCart = () => {
    setData([]);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleCategory =(category)=>{
    setSelectedCategory(category);
    console.log(category);
  }

  return (
    <AppContext.Provider
      value={{
        data,
        isError,
        cart,
        addToCart,
        removeFromCart,
        refreshData,
        clearCart,
        handleCategory,
        selectedCategory,

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
