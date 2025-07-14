import { useContext } from "react";
import { recipecontext } from "../context/RecipeContext.jsx";

const Recipes = () => {
  const { data } = useContext(recipecontext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.map((recipe) => (
        <div
          key={recipe.id}
          className="bg-gray-500 shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-all duration-300"
        >
          <h2 className="text-xl font-bold text-white mb-2">
            {recipe.title || "NA"}
          </h2>

          <div className="mb-2">
            <span className="font-semibold text-gray-200">Description:</span>
            <p className="text-gray-100 text-sm">
              {recipe.description || "NA"}
            </p>
          </div>

          <div className="mb-2">
            <span className="font-semibold text-gray-200">Ingredients:</span>
            <p className="text-gray-100 text-sm">
              {recipe.ingredients || "NA"}
            </p>
          </div>

          <div>
            <span className="font-semibold text-gray-200">Instructions:</span>
            <p className="text-gray-100 text-sm">
              {recipe.instructions || "NA"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recipes;
