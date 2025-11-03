import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="text-white">
      <h6>All Courses</h6>
      <Link className="m-4 text-2xl" href="/courses/cohort1">
        Cohort 1
      </Link>
      <Link className="m-4 text-2xl" href="/courses/cohort2">
        Cohort 2
      </Link>
    </div>
  );
};

export default page;
