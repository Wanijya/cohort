import { useCallback, useState } from "react";
import Recipe from "./Recipe";

const App = () => {
  const [add, setadd] = useState(0);
  const [sub, setsub] = useState(99);

  const ingridients = useCallback(() => {
    console.log("helloooo");
  }, [sub]);

  return (
    <div className="bg-gray-800 h-screen w-screen text-white font-thin py-10 px-10">
      <button
        onClick={() => setadd(add + 1)}
        className="mr-10 p-2 rounded bg-blue-400 text-5xl text-center font-black"
      >
        {add}
      </button>
      <button
        onClick={() => setsub(sub - 1)}
        className=" p-2 rounded bg-red-400 text-5xl text-center font-black"
      >
        {sub}
      </button>
      <br />
      <br />
      <Recipe ing={ingridients} />
    </div>
  );
};

export default App;
