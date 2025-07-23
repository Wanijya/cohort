import { useContext } from "react";
import { recipecontext } from "../context/RecipeContext.jsx";
import RecipeCard from "../components/RecipeCard.jsx";

const Recipes = () => {
  const { data } = useContext(recipecontext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 sm:p-6">
      {data.length > 0
        ? data.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} />)
        : "No recipes available. Please add some!"}
    </div>
  );
};

export default Recipes;
