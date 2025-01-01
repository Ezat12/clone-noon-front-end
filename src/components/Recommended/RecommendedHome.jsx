import axios from "axios";
import React, { useEffect, useState } from "react";
import Items from "../ItemsProduct/Items";

function RecommendedHome() {
  const [product, setProduct] = useState([]);
  let isInto = [];

  const selectedProducts = [];
  product.some((item) => {
    if (!isInto.includes(item._id)) {
      selectedProducts.push(item);
      isInto.push(item._id);
    }
    return selectedProducts.length >= 5;
  });

  const fetchDate = async () => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_URL
      }/api/v1/categories/66c26cae1fd8f2a0f361db46/product`
    );

    setProduct(response.data.data);
  };

  useEffect(() => {
    fetchDate();
  }, []);

  return (
    <div className="recommended bg-back_color">
      <div className="px-2 md:px-8 lg:px-8 py-4">
        <h1 className="text-2xl font-semibold">Recommended For You</h1>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
          {selectedProducts.map((theRandom, index) => {
            return <Items key={index} product={theRandom} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default RecommendedHome;
