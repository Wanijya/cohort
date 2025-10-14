import { memo } from "react";

const Recipe = ({ ing }) => {
  console.log("hellooo from recipe comonents");

  return <div>Recipe</div>;
};

export default memo(Recipe);
