import { useContext } from "react";
import { recipecontext } from "../context/RecipeContext.jsx";
import RecipeCard from "../components/RecipeCard.jsx";

const Fav = () => {
  const favorite = JSON.parse(localStorage.getItem("fav")) || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 sm:p-6">
      {favorite.length > 0
        ? favorite.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} />)
        : "No Favorites available. Please add some!"}
    </div>
  );
};

export default Fav;
