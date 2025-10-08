import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { asyncregisteruser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";

const Register = () => {
  const { register, reset, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const RegisterHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    user.cart = [];
    dispatch(asyncregisteruser(user));
    navigate("/login");
  };

  return (
    <form
      onSubmit={handleSubmit(RegisterHandler)}
      className="flex flex-col mt-10 justify-start items-start"
    >
      <input
        {...register("username")}
        className="outline-0 border-b p-2 text-2xl"
        type="text"
        placeholder="John-doe"
      />
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
      <button className="px-5 py-2 mt-5 bg-gray-700 rounded">
        Register User
      </button>
      <p className="mt-5">
        Already have an account?
        <Link to="/login" className="text-blue-400 ml-1">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;
