import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncloginuser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";

const Login = () => {
  const { register, reset, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginHandler = (user) => {
    // console.log(user);
    dispatch(asyncloginuser(user));
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(LoginHandler)}
      className="flex flex-col mt-10 justify-start items-start"
    >
      <input
        {...register("email")}
        className="outline-0 border-b p-2 text-2xl mt-7"
        type="email"
        placeholder="john@gmail.com"
      />
      <input
        {...register("password")}
        className="outline-0 border-b p-2 text-2xl mt-7"
        type="password"
        placeholder="********"
      />
      <button className="px-5 py-2 mt-5 bg-gray-700 rounded">Login User</button>
      <p className="mt-5">
        Don't have an account?
        <Link to="/register" className="text-blue-400 ml-1">
          Register
        </Link>
      </p>
    </form>
  );
};

export default Login;
