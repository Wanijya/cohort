import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { asynclogoutuser } from "../store/actions/userActions";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.users);
  console.log(user);

  const LogoutHandler = () => {
    dispatch(asynclogoutuser());
    navigate("/");
  };

  return (
    <nav className="flex justify-center items-center gap-5 p-5 bg-gray-800">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      {user ? (
        <>
          <NavLink to="/admin/create-product">Create Product</NavLink>
          <button
            onClick={LogoutHandler}
            className="px-5 py-2 bg-red-500 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </nav>
  );
};

export default Nav;
