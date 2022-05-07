import React from 'react'
import {AiOutlineShopping} from "react-icons/ai";
import Link from "next/link";
import {Cart} from "./";
import { useState } from 'react/cjs/react.production.min';
import { useStateContext } from '../context/StateContext';
const Navbar = () => {
  const {showCart,setShowCart,totalquantities,} = useStateContext();
  return (
    <nav className='navbar-container'>
      <Link href={`/`} ><p className='logo'>
        Tech Store
      </p></Link>
        <button type='button' className='cart-icon' onClick={()=>setShowCart(true)}>
          <AiOutlineShopping size={30} />
          <span className="cart-item-qty">
            {totalquantities}
          </span>
        </button>
      {showCart&&<Cart/>}
    </nav>
  )
}

export default Navbar