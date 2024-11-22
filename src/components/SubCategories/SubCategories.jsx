import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SliderImg from "../Slider/SliderImg";
import { BeatLoader } from "react-spinners";
import SubCategoryItems from "../ItemsSubCategory/SubCategoryItems";
import Items from "../ItemsProduct/Items";
import { ShimmerDiv } from "shimmer-effects-react";

function SubCategories() {
  const { state } = useLocation();
  const [subCategories, setSubCategories] = useState([]);
  const [imagesCategory, setImagesCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  let isInto = [];

  useEffect(() => {
    const fetchData = async () => {
      const responseSubCategory = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/categories/${state._id}/subCategory`
      );

      const responseProduct = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/categories/${state._id}/product`
      );

      const responseImagesCategory = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/categories/${
          state._id
        }/imagesCategory`
      );

      setSubCategories(responseSubCategory.data.data);
      setProduct(responseProduct.data.data);
      setImagesCategory(responseImagesCategory.data.data[0].images);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="subCategory relative">
      {!loading && <SliderImg images={imagesCategory} />}
      {loading && (
        <div className="px-5">
          <ShimmerDiv width={"100%"} height={"350px"} mode={"light"} />
        </div>
      )}
      {/*loading && (
        <div className="absolute top-0 left-0 w-full h-full z-10 bg-[#ffffffab]">
          {" "}
          <BeatLoader className="absolute top-[50%] left-[50%]" />
        </div>
      )*/}
      <SubCategoryItems state={subCategories} title={"Shop By Category"} />
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
      <h1 className="px-8 py-4 text-2xl font-semibold bg-[#eff4f4] flex items-center justify-between">
        You May Like{" "}
        <span className="bg-black text-white py-3 px-5 rounded-lg text-xl cursor-pointer">
          Shop Now
        </span>
      </h1>
      {loading && (
        <div className="flex items-center justify-between px-6 bg-back_color py-4">
          <div>
            <ShimmerDiv mode="light" height={350} width={250} />
          </div>
          <div>
            <ShimmerDiv mode="light" height={350} width={250} />
          </div>
          <div>
            <ShimmerDiv mode="light" height={350} width={250} />
          </div>
          <div>
            <ShimmerDiv mode="light" height={350} width={250} />
          </div>
          <div>
            <ShimmerDiv mode="light" height={350} width={250} />
          </div>
        </div>
      )}
      <div className="grid grid-cols-5 bg-back_color">
        {product.map((item, index) => {
          if (index >= 5) {
            return;
          } else {
            let theRandom;
            do {
              theRandom = product[Math.floor(Math.random() * product.length)];
            } while (isInto.includes(theRandom._id) && product.length > 0);

            if (theRandom) {
              isInto.push(theRandom._id);
              return <Items key={index} product={theRandom} />;
            } else {
              return;
            }
          }
        })}
      </div>
    </div>
  );
}

export default SubCategories;
