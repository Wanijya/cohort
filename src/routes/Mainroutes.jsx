import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import About from "../pages/About";
import Create from "../pages/Create";
import SingleRecipe from "../pages/SingleRecipe";
import PageNotFound from "../pages/PageNotFound";
import Fav from "../pages/Fav";

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/details/:id" element={<SingleRecipe />} />{" "}
      {/* Dynamic route for recipe details */}
      <Route path="/about" element={<About />} />
      <Route path="/create-recipe" element={<Create />} />
      <Route path="/fav" element={<Fav />} />
      <Route path="*" element={<PageNotFound />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default Mainroutes;
