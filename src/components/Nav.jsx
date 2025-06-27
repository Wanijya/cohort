import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="flex justify-center gap-10 bg-gray-700 p-4 text-white">
      <NavLink
        className={(e) => (e.isActive ? "text-red-400" : "")}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={(e) => (e.isActive ? "text-red-400" : "")}
        to="/product"
      >
        Product
      </NavLink>
      <NavLink
        className={(e) => (e.isActive ? "text-red-400" : "")}
        to="/service"
      >
        Service
      </NavLink>
      <NavLink
        className={(e) => (e.isActive ? "text-red-400" : "")}
        to="/about"
      >
        About
      </NavLink>
    </div>
  );
};

export default Nav;
