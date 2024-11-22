import axios from "axios";
import React, { useEffect, useState } from "react";
import { ShimmerDiv } from "shimmer-effects-react";
import SubCategoryItems from "../ItemsSubCategory/SubCategoryItems";
import Items from "../ItemsProduct/Items";

function Electronics() {
  const [subCategory, setSubCategories] = useState([]);
  const [product, setProduct] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/subCategories/electronics`
      );
      setSubCategories(response.data.data);
      setProduct(response.data.product);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="electronics bg- mt-5 px-5">
      {loading && (
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold mb-4">Electronics</h1>
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
        <div className="flex flex-col">
          <div className="mt-7">
            <SubCategoryItems state={subCategory} title={"Electronics"} />
          </div>
          <div className="grid grid-cols-5 gap-3 bg-[#f5f5f5]">
            {product.map((theRandom, index) => {
              return <Items key={index} product={theRandom} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Electronics;
