import React from 'react'
import {Link, Links} from 'react-router-dom'

function Navbar() {
  return (
    <>
    
    <nav className="bg-gray-800 text-white p-6 flex justify-start gap-5 items-center">
        <div className="text-2xl font-bold">
          <div><h1>E-Commerce</h1></div>
        </div>
        <div>
          <ul className='flex text-xl gap-5'>
            <Link to="/">Home</Link>
            <Link to="/product">Add Product</Link>
          </ul>
        </div>
        

    </nav>
    </>
  )
}

export default Navbar