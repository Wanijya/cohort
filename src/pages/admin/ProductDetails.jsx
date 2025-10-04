import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  asyncdeleteproduct,
  asyncupdateproduct,
} from "../../store/actions/productActions";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    productReducer: { products },
    userReducer: { users },
  } = useSelector((state) => state);
  const product = products?.find((product) => product.id == id);
  console.log(product, users);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      description: product?.description,
      price: product?.price,
    },
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const UpdateProductHandler = (product) => {
    console.log(product);
    dispatch(asyncupdateproduct(id, product));
  };

  const DeleteHandler = () => {
    dispatch(asyncdeleteproduct(id));
    navigate("/products");
  };

  return product ? (
    <>
      <div className="w-full lg:h-[80vh] flex mt-6 gap-10">
        <div className="bg-gray-300 lg:h-full lg:w-[50%] rounded-2xl overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={product?.image}
            alt=""
          />
        </div>
        <div className="mt-10 p-5 w-[75%]">
          <h1 className="lg:text-6xl font-semibold mb-5 tracking-tight">
            {product?.title}
          </h1>
          <p className="lg:text-2xl tracking-tight mb-5">
            {product?.description}
          </p>
          <h1 className="lg:text-6xl font-semibold text-green-400">
            ${product?.price}
          </h1>
          <button className="px-5 py-2 mt-5 bg-gray-700 rounded">
            Add to cart
          </button>
        </div>
      </div>
      <hr />
      {users && users?.isAdmin && (
        <form
          onSubmit={handleSubmit(UpdateProductHandler)}
          className="flex flex-col mt-10 justify-start items-start w-full"
        >
          <input
            {...register("image")}
            className="outline-0 border-b p-2 text-2xl w-full"
            type="url"
            placeholder="image url"
          />
          <input
            {...register("title")}
            className="outline-0 border-b p-2 text-2xl mt-7 w-full"
            type="text"
            placeholder="title"
          />
          <input
            {...register("price")}
            className="outline-0 border-b p-2 text-2xl mt-7 w-full"
            type="number"
            placeholder="0.00"
          />
          <textarea
            {...register("description")}
            className="outline-0 border-b p-2 text-2xl mt-7 w-full"
            placeholder="enter description here"
          ></textarea>
          <input
            {...register("category")}
            className="outline-0 border-b p-2 text-2xl mt-7 w-full"
            type="text"
            placeholder="category"
          />
          <div className="flex gap-20">
            <button className="px-5 py-2 mt-5 bg-gray-700 rounded">
              Update Product
            </button>
            <button
              type="button"
              onClick={DeleteHandler}
              className="px-5 py-2 mt-5 bg-red-500 rounded"
            >
              Delete Product
            </button>
          </div>
        </form>
      )}
    </>
  ) : (
    "Loding..."
  );
};

export default ProductDetails;
