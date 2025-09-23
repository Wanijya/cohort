import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex justify-center items-center gap-5 p-5 bg-gray-800">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
};

export default Nav;
