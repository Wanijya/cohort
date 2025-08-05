import { useEffect } from "react";
import axios from "./api/axiosConfig";

const App = () => {
  const getProduct = async () => {
    try {
      const response = await axios.get("/products");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return <div></div>;
};

export default App;
