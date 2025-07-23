import { nanoid } from "nanoid";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { recipecontext } from "../context/RecipeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { data, setdata } = useContext(recipecontext);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const SubmitHandler = (recipe) => {
    recipe.id = nanoid();
    // console.log(recipe);
    // const copydata = [...data];
    // copydata.push(recipe);
    // setdata(copydata);

    setdata([...data, recipe]);
    toast.success("Recipe added successfully!");
    reset(); // Reset the form after submission
    navigate("/recipes");
  };

  return (
    <form
      onSubmit={handleSubmit(SubmitHandler)}
      className="w-full max-w-xl mx-auto p-4 sm:p-6 md:p-8 bg-gray-900 rounded-lg shadow space-y-4"
    >
      <input
        className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
        {...register("image")}
        type="url"
        placeholder="Enter Image URL"
      />

      <small className="text-red-400">This is how the error is show</small>

      <input
        className="w-full p-3 bg-gray-800 rounded border border-gray-700"
        {...register("title")}
        type="text"
        placeholder="Recipe Title"
      />

      <textarea
        className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white" 
        {...register("description")}
        placeholder="//start from here"
      ></textarea>

      <textarea className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white" 
        {...register("ingridients")}
        placeholder="//write ingridients, separate by comma"
      ></textarea>

      <textarea
        className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white" 
        {...register("instructions")}
        placeholder="//write instructions, separate by comma"
      ></textarea>

      <select
        className="w-full p-3 bg-gray-800 rounded border border-gray-700"
        {...register("category")}
      >
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="supper">Supper</option>
        <option value="dinner">Dinner</option>
      </select>

      <button className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded">
        Save Recipe
      </button>
    </form>
  );
};

export default Create;
