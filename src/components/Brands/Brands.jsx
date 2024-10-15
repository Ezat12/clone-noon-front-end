import React, { useEffect, useState } from "react";
import img_brand from "../../assets/brands favorite.avif";
import axios from "axios";
import { Link } from "react-router-dom";

function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchDate = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/brands`
      );
      setBrands(response.data.data);
    };
    fetchDate();
  }, []);

  return (
    <div className="brands px-8 bg-[#f5f5f5]">
      <div className="image mt-5">
        <img src={img_brand} />
      </div>
      <div className="grid grid-cols-6  gap-3">
        {brands.map((brand, index) => {
          return (
            <Link
              to={"/product"}
              state={brand}
              key={index}
              className="box mb-5"
            >
              <img className="h-36 w-48 rounded-2xl" src={brand.image} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Brands;