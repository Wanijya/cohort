import { nanoid } from "nanoid";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { recipecontext } from "../context/RecipeContext";

const Create = () => {
  const { data, setdata } = useContext(recipecontext);
  const { register, handleSubmit, reset } = useForm();

  const SubmitHandler = (recipe) => {
    recipe.id = nanoid();
    // console.log(recipe);
    // const copydata = [...data];
    // copydata.push(recipe);
    // setdata(copydata);

    setdata([...data, recipe]);
    reset(); // Reset the form after submission
  };

  return (
    <form onSubmit={handleSubmit(SubmitHandler)}>
      <input
        className="mt-10 border-b outline-0 p-2 block"
        {...register("image")}
        type="url"
        placeholder="Enter Image URL"
      />

      <small className="text-red-400">This is how the error is show</small>

      <input
        className="mt-10 border-b outline-0 p-2 block"
        {...register("title")}
        type="text"
        placeholder="Recipe Title"
      />

      <textarea
        className="mt-10 border-b outline-0 p-2 block"
        {...register("description")}
        placeholder="//start from here"
      ></textarea>

      <textarea
        className="mt-10 border-b outline-0 p-2 block"
        {...register("ingridients")}
        placeholder="//write ingridients, separate by comma"
      ></textarea>

      <textarea
        className="mt-10 border-b outline-0 p-2 block"
        {...register("instructions")}
        placeholder="//write instructions, separate by comma"
      ></textarea>

      <select
        className="mt-4 border-b outline-0 p-2 block"
        {...register("category")}
      >
        <option value="cat-1">Category 1</option>
        <option value="cat-2">Category 2</option>
        <option value="cat-3">Category 3</option>
      </select>

      <button className="block mt-5 bg-gray-900 px-4 py-2 rounded">
        Save Recipe
      </button>
    </form>
  );
};

export default Create;
