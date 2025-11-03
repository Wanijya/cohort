"use client";
import { useParams } from "next/navigation";

const page = () => {
  const param = useParams();
  //   console.log(param);

  return (
    <div>
      <h6 className="capitalize">{param.id}'s Collection</h6>
    </div>
  );
};

export default page;
