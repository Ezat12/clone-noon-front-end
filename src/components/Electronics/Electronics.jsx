import axios from "axios";
import React, { useEffect, useState } from "react";
import { ShimmerDiv } from "shimmer-effects-react";
import SubCategoryItems from "../ItemsSubCategory/SubCategoryItems";

function Electronics() {
  const [subCategory, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/subCategories/electronics`
      );
      setSubCategories(response.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="electronics bg- mt-8 px-5">
      {loading && (
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold mb-8">Electronics</h1>
        </div>
      )}
      {loading && (
        <div className="w-full flex items-center justify-between px-5 -mt-2 pb-6">
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
      {!loading && (
        <div className="mt-7">
          <SubCategoryItems state={subCategory} title={"Electronics"} />
        </div>
      )}
    </div>
  );
}

export default Electronics;
