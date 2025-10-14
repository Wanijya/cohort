import { useMemo, useState } from "react";
import { set } from "react-hook-form";

const App = () => {
  const [add, setadd] = useState(0);
  const [sub, setsub] = useState(99);

  const Product = useMemo(() => {
    console.log("product function called");
    return add * 2;
  }, [add]);

  return (
    <div className="bg-gray-800 h-screen w-screen text-white font-thin py-10 px-10">
      <h1 className="text-6xl mb-5">{Product}</h1>
      <div className="">
        <button
          onClick={() => setadd(add + 1)}
          className=" p-2 rounded bg-blue-400 text-5xl text-center font-black"
        >
          +
        </button>
        <span className="text-5xl ml-5 font-black">{add}</span>
        <br />
        <br />
        <button
          onClick={() => setsub(sub - 1)}
          className=" p-2 rounded bg-red-400 text-5xl text-center font-black"
        >
          -
        </button>
        <span className="text-5xl ml-5 font-black">{sub}</span>
      </div>
    </div>
  );
};

export default App;
