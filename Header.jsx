import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.css";
import { SiBitcoinsv } from "react-icons/si";

const Header = () => {
  return (
    <div className='navbar'>
        <div className='logo'>
        <h1>CryptoSphere&nbsp;<SiBitcoinsv className='icon' color="orange" size={25}/></h1>
        </div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/coins'>Coins</Link></li>
      </ul>
    </div>
  )
}

export default Header

