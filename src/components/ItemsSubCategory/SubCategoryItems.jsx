/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

function SubCategoryItems(props) {
  // eslint-disable-next-line react/prop-types
  const { state } = props;

  return (
    <div className="items-subCategory px-8 py-4">
      <h1 className="text-2xl font-bold">{props.title}</h1>
      <div className="flex items-center flex-wrap justify-around mt-7">
        {state.map((sub, index) => {
          return (
            <Link to={"/product"} state={sub} key={index}>
              <img className="w-24 lg:w-36 md:w-36 cursor-pointer" src={sub.image} alt="" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SubCategoryItems;
