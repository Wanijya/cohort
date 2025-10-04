import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Products = () => {
  const products = useSelector((state) => state.productReducer.products);

  if (!products || products.length === 0) {
    return (
      <p className="text-center mt-6 text-lg font-medium text-gray-600">
        Loading products...
      </p>
    );
  }

  return (
    <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium transition">
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
    </div>
  );
};

export default Products;
