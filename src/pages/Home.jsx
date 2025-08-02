import { useEffect } from "react";
import axios from "../utils/axios";

const Home = () => {
  const getproduct = async () => {
    try {
      const response = await axios.get("/products/");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("Home component mounted"); // Mounted
    getproduct();
    // return () => {
    //   console.log("Home component unmounted");
    // }; // Unmounted
  }, []);

  return (
    <div className="text-center py-20 px-6">
      <h1 className="text-4xl font-bold text-white mb-4">
        Welcome to Recipe App 🍽️
      </h1>
      <p className="text-gray-400 text-lg">
        Browse and create amazing recipes with ease.
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={getproduct}
      >
        Get Product
      </button>
    </div>
  );
};

export default Home;
