import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  asyncdeleteuser,
  asynclogoutuser,
  asyncupdateuser,
} from "../../store/actions/userActions";

const UserProfile = () => {
  const { id } = useParams();
  const { users } = useSelector((state) => state.userReducer);
  //   console.log( users);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      username: users?.username,
      email: users?.email,
      password: users?.password,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const UpdateUserHandler = (user) => {
    console.log(user);
    dispatch(asyncupdateuser(users.id, user));
  };

  const DeleteHandler = () => {
    dispatch(asyncdeleteuser(users.id));
    navigate("/login");
  };

  const LogoutUserHandler = () => {
    dispatch(asynclogoutuser());
    navigate("/login");
  };
  return users ? (
    <div>
      <form
        onSubmit={handleSubmit(UpdateUserHandler)}
        className="flex flex-col mt-10 justify-start items-start w-full"
      >
        <input
          {...register("username")}
          className="outline-0 border-b p-2 text-2xl w-full"
          type="text"
          placeholder="jhon-doe"
        />
        <input
          {...register("email")}
          className="outline-0 border-b p-2 text-2xl mt-7 w-full"
          type="text"
          placeholder="jhon@gmail.com"
        />
        <input
          {...register("password")}
          className="outline-0 border-b p-2 text-2xl mt-7 w-full"
          type="password"
          placeholder="*********"
        />
        <div className="flex gap-20">
          <button className="px-5 py-2 mt-5 bg-gray-700 rounded">
            Update User
          </button>
          <button
            type="button"
            onClick={LogoutUserHandler}
            className="px-5 py-2 mt-5 bg-red-500 rounded"
          >
            Logout User
          </button>
          <button
            type="button"
            onClick={DeleteHandler}
            className="px-5 py-2 mt-5 bg-red-800 rounded"
          >
            Delete User
          </button>
        </div>
      </form>
    </div>
  ) : (
    "Loading..."
  );
};

export default UserProfile;
