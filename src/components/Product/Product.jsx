/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Items from "../ItemsProduct/Items.jsx";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { HashLink } from "react-router-hash-link";
import { toast } from "react-hot-toast";
import Loading from "../Loading/Loading.jsx";
import "./Product.css";
import "react-toastify/dist/ReactToastify.css";
import { TfiHome } from "react-icons/tfi";
import { TbCategory2 } from "react-icons/tb";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import Cookies from "js-cookie";

function Product() {
  const { state } = useLocation();
  console.log(state);

  const [loading, setLoading] = useState(true);
  const [sorted, setSorted] = useState("Recommended");
  const [dropDown, setDropDown] = useState(false);
  const ulRef = useRef();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const dropDownRef = useRef(null);
  const [dropCategory, setDropCategory] = useState(true);
  const [dropBrand, setDropBrand] = useState(true);
  const [dropPrice, setDropPrice] = useState(true);
  const [brands, setBrands] = useState([]);
  const [showBrands, setShowBrands] = useState([]);

  const [low, setLow] = useState();
  const [high, setHigh] = useState();
  const [goPrice, setGoPrice] = useState();

  const navigator = useNavigate();

  const clickMyAccount = () => {
    if (Cookies.get("auth-token")) {
      navigator("/account");
    } else {
      navigator("/login");
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchDate = async () => {
      // Fetch product data
      let responseProduct;
      if (state.category) {
        if (!low) {
          responseProduct = await axios.get(
            `${import.meta.env.VITE_URL}/api/v1/subCategories/${
              state._id
            }/product?${
              sorted === "Price:High to Low"
                ? "sort=-price"
                : sorted === "Price:Low to High"
                ? "sort=price"
                : "sort=*price"
            }`
          );
          setProduct(responseProduct.data.data);
        } else {
          responseProduct = await axios.get(
            `${import.meta.env.VITE_URL}/api/v1/subCategories/${
              state._id
            }/product?price[gte]=${low}&price[lte]=${high}&`
          );
          setProduct(responseProduct.data.data);
        }
      } else {
        if (!low) {
          responseProduct = await axios.get(
            `${import.meta.env.VITE_URL}/api/v1/brands/${state._id}/product?${
              sorted === "Price:High to Low"
                ? "sort=-price"
                : sorted === "Price:Low to High"
                ? "sort=price"
                : "sort=*price"
            }`
          );
          setProduct(responseProduct.data.data);
        } else {
          responseProduct = await axios.get(
            `${import.meta.env.VITE_URL}/api/v1/brands/${
              state._id
            }/product?price[gte]=${low}&price[lte]=${high}&`
          );
          setProduct(responseProduct.data.data);
        }
      }

      // Fetch brand data
      const responseBrand = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/brands`
      );
      // setDataBrand(responseBrand.data.data);

      // Fetch categories
      const responseCategory = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/categories`
      );
      setCategories(responseCategory.data.data);

      const subCategoryPromises = responseCategory.data.data.map(
        async (category) => {
          const responseSubCategory = await axios.get(
            `${import.meta.env.VITE_URL}/api/v1/categories/${
              category._id
            }/subCategory`
          );
          return responseSubCategory.data.data;
        }
      );

      const subCategories = await Promise.all(subCategoryPromises);
      setSubCategory(subCategories.flat());

      // Filter brands based on the product data
      const filteredBrands = responseBrand.data.data.filter((brand) =>
        responseProduct.data.data.some((prod) => prod.brand === brand._id)
      );
      setBrands(filteredBrands);

      setLoading(false);
    };

    fetchDate();

    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [goPrice, sorted]);

  /// Handle Drop ==========================================================
  const clickDrop = () => {
    setDropDown((prev) => !prev);
  };
  const handleDrop = (e) => {
    setSorted(e.target.innerHTML);
    clickDrop();
  };

  // const handleClickOutside = (event) => {
  //   if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
  //     setDropDown(false);
  //   }
  // };

  /// Handle Click Category =====================================================
  const handleClickCategory = (e) => {
    let lastElement = e.currentTarget.parentNode.lastChild;
    if (lastElement.classList.contains("hidden")) {
      lastElement.classList.remove("hidden");
    } else {
      lastElement.classList.add("hidden");
    }
  };

  /// Handle Brands =============================================================
  const handleBrands = (e) => {
    const input = e.currentTarget.parentNode.firstChild;
    const label = e.currentTarget.parentNode.lastChild;
    if (!input.checked) {
      setShowBrands((brand) => [...brand, label.id]);
    } else {
      const brandsAdd = showBrands.filter((b) => b !== label.id);
      setShowBrands(brandsAdd);
    }
  };

  /// Handle Price ====================================================
  const handlePrice = (e) => {
    const value = e.target.value;
    if (e.target.name === "low") {
      setLow(value);
    } else {
      setHigh(value);
    }
  };

  const handlePriceGoFetch = () => {
    // console.log("Yes");

    if (low > high) {
      toast.error("Invalid Price");
    } else {
      setGoPrice(low);
    }
  };

  return (
    <div className="product relative bg-[#f7f7fa]">
      {loading && <Loading />}
      <div className="drop-show fixed bottom-0 left-0 shadow-inner bg-white p-5 w-full z-50 flex items-center justify-around hidden">
        <div className="flex flex-col gap-2 items-center cursor-pointer ">
          <TfiHome size={"20px"} />
          <p onClick={() => navigator("/")} className="text-sm font-medium">
            Home
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center cursor-pointer ">
          <TbCategory2 size={"20px"} />
          <p className="text-sm font-medium">SubCategory</p>
        </div>
        <div className="flex flex-col gap-2 items-center cursor-pointer ">
          <RiAccountPinBoxLine size={"20px"} />
          <p onClick={clickMyAccount} className="text-sm font-medium">
            My Account
          </p>
        </div>
        <div
          onClick={() => navigator("/cart")}
          className="flex flex-col gap-2 items-center cursor-pointer"
        >
          <FiShoppingCart size={"20px"} />
          <p className="text-sm font-medium">cart</p>
        </div>
      </div>
      <div className="p-0 md:p-3 lg:p-3">
        <div className="result flex flex-wrap items-center justify-between p-2">
          <h1 className="text-xl mb-7 lg:mb-0 md:mb-0">
            <span>{product.length}</span> Result for You
          </h1>
          <div
            ref={dropDownRef}
            className="drop uppercase font-semibold leading-snug flex items-center relative"
          >
            <p className="text-gray-400 mr-3">Sorted By</p>
            <span
              onClick={clickDrop}
              className="border-solid border-[1px] cursor-pointer border-black p-1 outline-none px-3 text-black flex items-center gap-2"
            >
              {sorted}
              {dropDown ? <FaChevronDown /> : <FaChevronUp />}
            </span>
            {dropDown && (
              <ul
                ref={ulRef}
                className="flex absolute z-20 top-10 right-0 bg-white  flex-col gap-4 rounded-lg shadow-lg text-[14px] cursor-pointer"
              >
                <li
                  onClick={handleDrop}
                  className="p-4 px-7 hover:bg-blue-500 hover:text-white"
                >
                  Price:High to Low
                </li>
                <li
                  onClick={handleDrop}
                  className="p-4 px-7 hover:bg-blue-500 hover:text-white"
                >
                  Price:Low to High
                </li>
                <li
                  onClick={handleDrop}
                  className="p-4 px-7 hover:bg-blue-500 hover:text-white"
                >
                  Best Rated
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="content grid grid-cols-5 mt-5 px-2 gap-5">
          <div className="content-left col-span-1 ">
            <div
              onClick={() => setDropCategory((drop) => !drop)}
              className="category flex items-center justify-between mt-3 cursor-pointer"
            >
              <h2>Category</h2>
              {!dropCategory ? (
                <FaChevronUp className="mt-2" />
              ) : (
                <FaChevronDown className="mt-2" />
              )}
            </div>
            <div>
              {categories &&
                dropCategory &&
                categories.map((cate, index) => {
                  return (
                    <div key={index}>
                      <div
                        onClick={handleClickCategory}
                        className="w-fit cursor-pointer m-5 flex items-center gap-2"
                      >
                        <CiSquarePlus />
                        <span>{cate.name}</span>
                      </div>
                      <div className="subCategory-element transition-opacity hidden">
                        {subCategory.map((sub, i) => {
                          if (sub.category === cate._id) {
                            return (
                              <div
                                key={i}
                                className="ml-4 m-2 flex items-center gap-2 "
                              >
                                <Link
                                  to={"/product"}
                                  state={sub}
                                  onClick={() => window.location.reload()}
                                  className="ml-12 cursor-pointer border-b-2 border-[#f7f7fa] hover:border-gray-300 "
                                >
                                  {sub.name}
                                </Link>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div
              onClick={() => setDropBrand((brand) => !brand)}
              className="brand flex items-center justify-between mt-10 cursor-pointer "
            >
              <h2>Brand</h2>
              {!dropBrand ? (
                <FaChevronUp className="mt-2" />
              ) : (
                <FaChevronDown className="mt-2" />
              )}
            </div>
            <div className="brands">
              {dropBrand &&
                brands.map((brand, index) => {
                  return (
                    <div key={index} className="flex items-center gap-1 m-4">
                      <input
                        hidden
                        id={index}
                        type="checkbox"
                        className="mt-1"
                      />
                      <span className="span-brand"></span>
                      <label
                        onClick={handleBrands}
                        className="cursor-pointer"
                        htmlFor={index}
                        id={brand._id}
                      >
                        {brand.name}
                      </label>
                    </div>
                  );
                })}
            </div>
            <div
              onClick={() => setDropPrice((brand) => !brand)}
              className="price flex items-center justify-between mt-10 cursor-pointer "
            >
              <h2>Price</h2>
              {!dropPrice ? (
                <FaChevronUp className="mt-2" />
              ) : (
                <FaChevronDown className="mt-2" />
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap mt-6">
              <input
                value={low}
                name="low"
                onChange={handlePrice}
                className="w-20 border-solid border-[1px] border-gray-500 outline-none p-2  text-xs"
                type="number"
              />
              <span className="uppercase text-gray-600 ">To</span>
              <input
                value={high}
                name="high"
                onChange={handlePrice}
                className="w-20 border-solid border-[1px] border-gray-500 outline-none p-2  text-xs"
                type="number"
              />
              <span
                onClick={handlePriceGoFetch}
                className="uppercase text-[#3866df] font-bold cursor-pointer hover:text-gray-500"
              >
                GO
              </span>
            </div>
          </div>

          <div className="content-right col-span-4">
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 gap-1 lg:gap-2 md:gap-2">
              {product.map((item, index) => {
                if (showBrands.length === 0) {
                  return <Items key={index} product={item} />;
                } else {
                  if (showBrands.includes(item.brand)) {
                    return <Items key={index} product={item} />;
                  }
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
