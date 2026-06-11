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
  return
  
   (
    <></>
   )
}

export default UpdateProduct;
