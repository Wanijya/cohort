import { useContext } from "react";
import { useParams } from "react-router-dom";
import { recipecontext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SingleRecipe = () => {
  const { data, setdata } = useContext(recipecontext);
  const params = useParams();
  const recipe = data.find((recipe) => params.id == recipe.id);
  console.log(params);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: recipe.title,
      image: recipe.image,
      description: recipe.description,
      ingridients: recipe.ingridients,
      instructions: recipe.instructions,
      category: recipe.category,
    },
  });
  const navigate = useNavigate();

  const SubmitHandler = (recipe) => {
    const index = data.findIndex((recipe) => params.id == recipe.id);
    const copydata = [...data];
    copydata[index] = { ...copydata[index], ...recipe };
    setdata(copydata);
    toast.success("Recipe updated successfully!");
    // console.log(index);
  };

  const DeleteHandler = () => {
    const filterData = data.filter((r) => r.id != params.id);
    setdata(filterData);
    toast.success("Recipe deleted successfully!");
    navigate("/recipes");
  };

  return recipe ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-4">
        <img
          className="w-full h-64 object-cover rounded-lg shadow-md"
          src={recipe.image}
          alt={recipe.title}
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          {recipe.title}
        </h1>
        <p className="text-gray-400 text-base">{recipe.description}</p>
        <div>
          <h2 className="text-xl font-semibold text-yellow-400 mt-4">
            🧂 Ingredients:
          </h2>
          <ul className="list-disc list-inside text-gray-300">
            {recipe.ingridients}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-yellow-400 mt-4">
            📋 Instructions:
          </h2>
          <ol className="list-decimal list-inside text-gray-300">
            {recipe.instructions}
          </ol>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-yellow-400 mt-4">
            🏷️ Category:
          </h2>
          <p className="text-gray-200 capitalize">{recipe.category}</p>
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg p-6 shadow space-y-4">
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
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
            {...register("title")}
            type="text"
            placeholder="Recipe Title"
          />

          <textarea
            className="w-full p-3 bg-gray-800 rounded border border-gray-700"
            {...register("description")}
            placeholder="//start from here"
          ></textarea>

          <textarea
            className="w-full p-3 bg-gray-800 rounded border border-gray-700"
            {...register("ingridients")}
            placeholder="//write ingridients, separate by comma"
          ></textarea>

          <textarea
            className="w-full p-3 bg-gray-800 rounded border border-gray-700"
            {...register("instructions")}
            placeholder="//write instructions, separate by comma"
          ></textarea>

          <select
            className="mt-4 border-b outline-0 p-2 block"
            {...register("category")}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="supper">Supper</option>
            <option value="dinner">Dinner</option>
          </select>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md">
              Update Recipe
            </button>
            <button
              type="button"
              onClick={DeleteHandler}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md"
            >
              Delete Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div>Recipe not found</div>
  );
};

export default SingleRecipe;
