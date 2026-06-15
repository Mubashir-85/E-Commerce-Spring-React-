import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import AddProduct from "./Components/AddProduct";
import Product from "./Components/Products";
import UpdateProduct from "./Components/UpdateProduct";
import Cart from "./Components/Cart";

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
            selectedCategory={selectedCategory}
          />
          <Route path="/add_product" element={<AddProduct />} />
          <Route path="/product" element={<Product />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="product/update/:id" element={<UpdateProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
