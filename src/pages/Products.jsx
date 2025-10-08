import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncupdateuser } from "../store/actions/userActions";
import { Suspense, useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  // const products = useSelector((state) => state.productReducer.products);

  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `/products?_limit=5&_start=${products.length}`
      );
      if (data.length == 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
        setProducts([...products, ...data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(hasMore);

  useEffect(() => {
    fetchProducts();
  }, []);

  const AddtoCartHandler = (product) => {
    const copyuser = { ...users, cart: [...users.cart] }; // Deep Copy
    const x = copyuser.cart.findIndex((c) => c.product.id == product.id);
    // console.log(x);
    if (x == -1) {
      copyuser.cart.push({ product, quantity: 1 });
    } else {
      copyuser.cart[x] = {
        product,
        quantity: copyuser.cart[x].quantity + 1,
      };
      console.log(copyuser.cart[x].quantity + 1);
    }
    // console.log(copyuser);
    dispatch(asyncupdateuser(copyuser.id, copyuser));
  };

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchProducts}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>Yay! You have seen it all</p>
      }
    >
      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <Suspense
          fallback={
            <h1 className="text-center text-red-500 text-5xl">Loading...</h1>
          }
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition transform hover:scale-105 duration-300 flex flex-col"
            >
              <div className=" w-full h-44 bg-gray-100 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h1 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2">
                  {product.title}
                </h1>

                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {product.description.slice(0, 80)}...
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <p className="text-lg font-bold text-gray-900">
                    ₹{product.price}
                  </p>
                  <button
                    onClick={() => AddtoCartHandler(product)}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                  >
                    Add to Cart
                  </button>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  className="text-pink-500 hover:underline text-xs mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </Suspense>
      </div>
    </InfiniteScroll>
  );
};

export default Products;
