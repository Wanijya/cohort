import { useDispatch, useSelector } from "react-redux";
import { loadlazyproduct } from "../store/reducers/productSlice";
import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

const useInfiniteProducts = () => {
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `/products?_limit=5&_start=${products.length}`
      );
      if (data.length == 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
        dispatch(loadlazyproduct(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, hasMore, fetchProducts };
};

export default useInfiniteProducts;
