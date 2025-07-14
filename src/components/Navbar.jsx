import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex justify-center gap-10 items-center bg-gray-900 px-10 py-5 rounded-lg shadow-lg text-md">
        <NavLink className={(e)=>e.isActive ? "text-red-300" : ""} to="/">Home</NavLink>
        <NavLink className={(e)=>e.isActive ? "text-red-300" : ""} to="/recipes">Recipes</NavLink>
        <NavLink className={(e)=>e.isActive ? "text-red-300" : ""} to="/about">About</NavLink>
        <NavLink className={(e)=>e.isActive ? "text-red-300" : ""} to="/create-recipe">Create Recipes</NavLink>
    </div>
    
  )
}

export default Navbar