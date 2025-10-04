import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asynccreateproduct } from "../../store/actions/productActions";

const CreateProduct = () => {
  const { register, reset, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const CreaterProductHandler = (product) => {
    product.id = nanoid();
    console.log(product);

    dispatch(asynccreateproduct(product));
    navigate("/products");
  };

  return (
    <form
      onSubmit={handleSubmit(CreaterProductHandler)}
      className="flex flex-col mt-10 justify-start items-start"
    >
      <input
        {...register("image")}
        className="outline-0 border-b p-2 text-2xl"
        type="url"
        placeholder="image url"
      />
      <input
        {...register("title")}
        className="outline-0 border-b p-2 text-2xl mt-7"
        type="text"
        placeholder="title"
      />
      <input
        {...register("price")}
        className="outline-0 border-b p-2 text-2xl mt-7"
        type="number"
        placeholder="0.00"
      />
      <textarea
        {...register("description")}
        className="outline-0 border-b p-2 text-2xl mt-7"
        placeholder="enter description here"
      ></textarea>
      <input
        {...register("category")}
        className="outline-0 border-b p-2 text-2xl mt-7"
        type="text"
        placeholder="category"
      />
      <button className="px-5 py-2 mt-5 bg-gray-700 rounded">
        Create Product
      </button>
    </form>
  );
};

export default CreateProduct;
