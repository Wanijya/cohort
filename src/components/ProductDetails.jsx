import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    // console.log(params);
    
  return (
    <div>
      <h1 className="text-4xl font-thin mb-4">{params.name}</h1>
      <h2 className="text-2xl font-thin mb-5">Product detail...</h2>
      <button
        onClick={() => navigate(-1)}
        className="bg-white text-black px-4 py-2 rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default ProductDetails;
