import axios from 'axios';
import React, { createContext, useState } from 'react'

const AppContext = createContext({
        data:[],
        isError:"",
        cart:[],
        addToCart:(product)=>{},
        removeFromCart:(productId)=>{},
        refreshData:()=>{},
        updateStockQuantity:(productId,quantity)=>{}
    });

    export const AppProvider = ({children})=>{
        const [data,setData] = useState([]);
        const [isError,setIsError] = useState("");
        const [cart,setCart] = useState([]);

        const addToCart = (product)=>{
            const existingProduct = cart.findIndex((item)=>item.id === product.id);
            if(existingProduct !== -1){
                const updatedCart = cart.map((item,index)=>
                    idex === existingProduct 
                    ? {...item,quantity:item.quantity + 1}
                    : item
                )
                setCart(updatedCart);
                localStorage.setItem("cart",JSON.stringify(updateCart));
            }else{
                const updatedCart = [...cart,{...product,quantity:1}];
                setCart(updatedCart);
                localStorage.setItem("cart",JSON.stringify(updatedCart));
            }
        }

        const removeFromCart =(productId)=>{
            const updatedCart = cart.filter((item)=>item.id !== productId);
            setCart(updatedCart);
            localStorage.setItem("cart",JSON.stringify(updatedCart));

        };

        const refershData = async()=>{
            // try{
            //     const response = await axios.get()
            // }
        }
    }


export default AppContext;