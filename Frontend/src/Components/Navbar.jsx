import React from 'react'
import {Link, Links} from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  return (
    <>
    
    <nav className="bg-gray-800 text-white p-6  gap-5 items-center">
        <div className="text-2xl font-bold">
        </div>
        <div className='flex justify-between'>

        <div className='flex gap-5'>
          <h1 className='text-2xl font-bold'>E-Commerce</h1>
          <ul className=' flex text-xl gap-5 justify-center items-center'>
            <Link to="/">Home</Link>
            <Link to="/add_product">Add Product</Link>
          </ul>
        </div>
        <div className='flex text-xl gap-5 justify-center items-center'>

            <Link to="/cart"><FaShoppingCart /></Link>
        </div>
        
        </div>

    </nav>
    </>
  )
}

export default Navbar