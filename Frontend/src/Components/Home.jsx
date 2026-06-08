import React, { useState } from 'react'

function Home() {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  
  return (
    <>
    <div className = "flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2 px-6 sm:px-0 ">
      {products.map((product)=>{
        return(
          <div className="bg-white rounded-lg shadow-md p-4 m-4" key={product.id}>
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default Home