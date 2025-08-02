import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-950 px-6 py-4 shadow-md">
      <h1 className="text-xl font-bold text-white mb-2 md:mb-0">🍳 MyRecipes</h1>
      <nav className="flex flex-wrap gap-4 text-sm">
        <NavLink className={({ isActive }) => isActive ? "text-yellow-400 font-semibold" : "text-white hover:text-yellow-300"} to="/">Home</NavLink>
        <NavLink className={({ isActive }) => isActive ? "text-yellow-400 font-semibold" : "text-white hover:text-yellow-300"} to="/recipes">Recipes</NavLink>
        <NavLink className={({ isActive }) => isActive ? "text-yellow-400 font-semibold" : "text-white hover:text-yellow-300"} to="/about">About</NavLink>
        <NavLink className={({ isActive }) => isActive ? "text-yellow-400 font-semibold" : "text-white hover:text-yellow-300"} to="/create-recipe">Create</NavLink>
        <NavLink className={({ isActive }) => isActive ? "text-yellow-400 font-semibold" : "text-white hover:text-yellow-300"} to="/fav">Favorite</NavLink>
        
      </nav>
    </div>
  );
};
export default Navbar;
