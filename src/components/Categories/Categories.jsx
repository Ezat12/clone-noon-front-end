import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShimmerDiv } from "shimmer-effects-react";
import "./Categories.css"

function Categories() {
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/categories`
    );
    setCategories(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="categories p-8">
      <div className="image-category flex items-center flex-wrap gap-3 justify-around">
        {categories.length <= 0 && (
          <div className="w-full flex items-center justify-between ">
            <ShimmerDiv
              mode="light"
              height={"140px"}
              width={"144px"}
              rounded={50}
            />
            <ShimmerDiv
              mode="light"
              height={"140px"}
              width={"144px"}
              rounded={50}
            />
            <ShimmerDiv
              mode="light"
              height={"140px"}
              width={"144px"}
              rounded={50}
            />
            <ShimmerDiv
              mode="light"
              height={"140px"}
              width={"144px"}
              rounded={50}
            />
            <ShimmerDiv
              mode="light"
              height={"140px"}
              width={"144px"}
              rounded={50}
            />
            <ShimmerDiv
              mode="light"
              height={"140px"}
              width={"144px"}
              rounded={50}
            />
          </div>
        )}
        {categories.map((category, index) => {
          return (
            <Link to={`/${category.slug}`} state={category} key={index}>
              <img className="w-36 h-40" src={category.image} alt="" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
