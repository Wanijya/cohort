import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="text-white">
      <h6>Cohort 1</h6>
      <Link className="m-4 text-2xl" href="/courses/cohort1/classroom">
        Module 1
      </Link>
    </div>
  );
};

export default page;
