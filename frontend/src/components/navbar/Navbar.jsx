import React from 'react'
import { NavLink } from 'react-router-dom';
import "./navbar.css";

const Navbar = () => {

    const getStyles = ({isActive})=>({
        color:isActive ? "white": "black",
        textDecoration: isActive ? "underline" : "none",
        textUnderlineOffset: isActive ? "4px" : "none",
    })


  return (
    <>
     <div className="navbar content">
        <h1>Patient Management</h1>  
        <div className="navbar-links">
            <NavLink style={getStyles} to="/">Patient</NavLink>
            <NavLink style={getStyles} to="/ward">Ward</NavLink>
            <NavLink style={getStyles} to="/hospital">Hospital</NavLink>
        </div> 
     </div> 
    </>
  )
}

export default Navbar;