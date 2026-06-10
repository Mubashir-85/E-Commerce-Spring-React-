import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import AddProduct from "./Components/AddProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add_product" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
