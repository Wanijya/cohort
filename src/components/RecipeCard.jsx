import { Link } from "react-router-dom";

const RecipeCard = (props) => {
  const { id, image, title, description, ingredients, instructions } =
    props.recipe;

  return (
    <Link
      to={`/recipes/details/${id}`}
      className="rounded-xl shadow bg-gray-900 border border-gray-800 transition hover:scale-[1.02]"
    >
      <img src={image || "..."} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold text-white truncate">{title}</h2>
        <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
        <p className="text-xs text-gray-600 mt-2">Tap to view ➤</p>
      </div>
    </Link>
  );
};

export default RecipeCard;
