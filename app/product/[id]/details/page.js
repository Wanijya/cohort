"use client";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();

  return (
    <div>
      <h6 className="capitalize">{id}'s Product Details</h6>
    </div>
  );
};

export default page;
