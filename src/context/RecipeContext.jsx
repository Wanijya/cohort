import React, { createContext, useState } from "react";

export const recipecontext = createContext(null);
const RecipeContext = (props) => {
  const [data, setdata] = useState([
    {
      "id": 1,
      "title": "Classic Margherita Pizza",
      "ingredients": [
        "Pizza dough",
        "Tomato sauce",
        "Fresh mozzarella cheese",
      ],
      "instructions": [
        "Preheat the oven to 475°F (245°C).",
        "Roll out the pizza dough and spread tomato sauce evenly.",
        "Top with slices of fresh mozzarella and fresh basil leaves.",
      ],
      "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
      "description": "A simple and classic pizza with fresh ingredients.",
      "category": "lunch",
    },
  ]);

  console.log(data);
  
  return (
    <recipecontext.Provider value={{ data, setdata }}>
      {props.children}
    </recipecontext.Provider>
  );
};

export default RecipeContext;
