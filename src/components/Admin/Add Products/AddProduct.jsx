import React, { useEffect, useRef, useState } from "react";
import ManageList from "../Manage/ManageList";
import img_upload from "../../../assets/upload images.png";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { BeatLoader } from "react-spinners";
import { SyncLoader } from "react-spinners";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

function AddProduct() {
  const [clickButton, setClickButton] = useState(false);

  const [addColors, setAddColors] = useState(false);
  const [loading, setLoading] = useState(true);
  const colorRef = useRef();
  const [accept, setAccept] = useState(false);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [priceDiscount, setPriceDiscount] = useState();
  const [quantity, setQuantity] = useState();

  const [image, setImage] = useState();
  const [colors, setColors] = useState([]);
  const [imagesProduct, setImagesProduct] = useState([]);

  const [categories, setCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [brands, setBrands] = useState([]);
  const [brandValue, setBrandValue] = useState("");
  const [brandId, setBrandId] = useState("");

  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const [subCategoryId, setSubCategoryId] = useState([]);

  /// Fetch Data =======================================
  const fetchGetCategories = async () => {
    const responseCategory = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/categories`
    );

    const responseBrand = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/brands`
    );

    setCategories(responseCategory.data.data);
    setBrands(responseBrand.data.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchGetCategories();
  }, []);

  const getSubCategories = async () => {
    if (categoryValue) {
      const response = await axios.get(
        `${
          import.meta.env.VITE_URL
        }/api/v1/categories/${categoryId}/subCategory`
      );
      setSubCategories(response.data.data);
    }
  };

  useEffect(() => {
    getSubCategories();
  }, [categoryValue]);

  /// Get Category Id ====================================
  const getCategory = (e) => {
    const value = e.target.value;
    setCategoryValue(value);
    const category = categories.filter((e) => e.name === value);

    setCategoryId(category[0]._id);
  };

  /// Get Brand Id ==========================================
  const getBrand = (e) => {
    const value = e.target.value;
    setBrandValue(value);
    const brand = brands.filter((e) => e.name === value);

    setBrandId(brand[0]._id);
  };

  /// Get Sub Category Id ===================================
  const getSubCategory = (e) => {
    const value = e.target.value;
    setSubCategoryValue(value);
    const subCategory = subCategories.filter((e) => e.name === value);

    setSubCategoryId((subCat) => [...subCat, subCategory[0]]);
  };

  const deleteSubCategory = (sub) => {
    const subCategoryList = subCategoryId.filter(
      (subCategory) => subCategory._id !== sub._id
    );
    setSubCategoryId(subCategoryList);
  };

  /// Change Image ==========================================
  const changeImage = (e) => {
    if (e.target.files[0]) {
      if (e.target.classList.contains("image")) setImage(e.target.files);
      else {
        setImagesProduct((image) => [...image, e.target.files[0]]);
      }
    }
  };

  /// Delete Image =============================================
  const deleteImage = (img) => {
    const images = imagesProduct.filter((image) => image !== img);

    setImagesProduct(images);
  };

  /// Button Add Color  =========================================
  const buttonAddColors = () => {
    setColors((colors) => [...colors, colorRef.current.value.toLowerCase()]);
    setAddColors(false);
  };

  /// Add product ================================================
  const addProduct = async () => {
    setAccept(true);
    if (title && description && price && quantity && categoryId && categoryId) {
      if (!image) toast.error("The Image must be required");
      else {
        /// ADD PRODUCT
        setClickButton(true);
        let subCategory = [];
        subCategoryId.map((sub) => subCategory.push(sub._id));
        console.log(colors);

        const formData = new FormData();
        formData.append("imgCover", image[0]);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("quantity", quantity);
        formData.append("price", price);
        priceDiscount ? formData.append("price_discount", priceDiscount) : null;
        colors
          ? colors.forEach((color, index) => {
              formData.append(`colors[${index}]`, color);
            })
          : null;

        imagesProduct.forEach((file) => {
          formData.append(`images`, file);
        });
        formData.append("category", categoryId);
        subCategory.forEach((sub, index) => {
          formData.append(`subCategory[${index}]`, sub);
        });
        brandId ? formData.append("brand", brandId) : null;

        const response = await axios.post(
          `${import.meta.env.VITE_URL}/api/v1/product`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth-token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response) {
          setClickButton(false);
        }
        toast.success("Success Add Product");

        console.log(response.data);
      }
    }
  };

  return (
    <div className="admin relative flex p-6 bg-gray-100 min-h-[85vh] gap-10">
      <ManageList />
      {addColors && (
        <div className="bg-overlay_color_2 z-20 absolute top-0 left-0 w-full h-[160vh]"></div>
      )}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-[100vh] bg-overlay_color_loading flex items-center justify-center">
          <BeatLoader />
        </div>
      )}
      <div className="add-product flex-1">
        <h1 className="font-semibold text-xl pb-2 border-b-2">
          Add New Product
        </h1>
        <form className="mt-4">
          <label
            htmlFor="image"
            className="text-gray-500 font-semibold w-fit block"
          >
            Add Image Product
            {!image ? (
              <img
                className="cursor-pointer mt-2 max-w-36"
                src={img_upload}
                alt=""
              />
            ) : (
              <img
                className="cursor-pointer mt-2 max-w-36"
                src={URL.createObjectURL(image[0])}
                alt=""
              />
            )}
          </label>
          <input
            id="image"
            className="image"
            type="file"
            onChange={changeImage}
            hidden
          />
          <div className="flex gap-1 flex-col mt-5">
            <label className="text-gray-500 font-semibold">Title:</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter title product"
              className={`p-2 max-w-96 border border-solid ${
                accept && !title ? `border-red-700 border-2` : `border-gray-400`
              } rounded-md outline-none`}
            />
          </div>
          <div className="flex gap-1 flex-col mt-5">
            <label className="text-gray-500 font-semibold">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`p-2 max-w-96 border border-solid ${
                accept && !description
                  ? `border-red-700 border-2`
                  : `border-gray-400`
              } rounded-md outline-none`}
              placeholder="Enter the description"
            ></textarea>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex gap-1 flex-col mt-5">
              <label className="text-gray-500 font-semibold">Price:</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Enter Price"
                className={`p-2 max-w-96 border border-solid ${
                  accept && !price
                    ? `border-red-700 border-2`
                    : `border-gray-400`
                } rounded-md outline-none`}
              />
            </div>
            <div className="flex gap-1 flex-col mt-5">
              <label className="text-gray-500 font-semibold">
                Price Discount:
              </label>
              <input
                value={priceDiscount}
                onChange={(e) => setPriceDiscount(e.target.value)}
                type="number"
                placeholder="Enter Price Discount"
                className="p-2 max-w-96 border border-solid border-gray-400 rounded-md outline-none"
              />
            </div>
            <div className="flex gap-1 flex-col mt-5">
              <label className="text-gray-500 font-semibold">Quantity:</label>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                placeholder="Enter Quantity"
                className={`p-2 max-w-96 border border-solid ${
                  accept && !quantity
                    ? `border-red-700 border-2`
                    : `border-gray-400`
                } rounded-md outline-none`}
              />
            </div>
          </div>
          <div className="flex gap-1 flex-col mt-5">
            <label className="text-gray-500 font-semibold">Colors</label>
            <div className="flex items-center gap-1 ">
              {colors.map((color, index) => {
                const classColor = `bg-${color}-700`;
                return (
                  <div
                    key={index}
                    className={`${classColor} w-[40px] h-[40px] rounded-full`}
                  ></div>
                );
              })}
              <div
                onClick={() => setAddColors(true)}
                className="border-solid border-2 border-gray-400 w-[40px] h-[40px] rounded-full flex cursor-pointer justify-center font-bold text-2xl text-gray-400"
              >
                +
              </div>

              {addColors && (
                <div className="add-color flex flex-col gap-2 absolute w-96 top-[50%] left-[50%] p-6 bg-white z-30 transform translate-x-[-50%] translate-y-[-50%]">
                  <label className="add-color text-gray-500 font-semibold">
                    Add Color:
                  </label>
                  <input
                    ref={colorRef}
                    type="text"
                    placeholder="Enter Color"
                    className="p-2 max-w-96 border border-solid border-gray-400 rounded-md outline-none"
                  />
                  <button
                    onClick={buttonAddColors}
                    type={"button"}
                    className="bg-blue-400 px-3 py-2 text-white font-semibold"
                  >
                    ADD COLOR
                  </button>
                  <IoClose
                    onClick={() => setAddColors(false)}
                    className="absolute top-3 right-3 text-xl cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-1 flex-col mt-5">
            <label
              htmlFor="images"
              className="text-gray-500 font-semibold w-fit block"
            >
              Images Product
              <img
                className="cursor-pointer mt-2 max-w-36"
                src={img_upload}
                alt=""
              />
            </label>
            <div className="flex gap-2 ">
              {imagesProduct.map((img, index) => {
                return (
                  <div key={index} className="relative">
                    <img
                      key={index}
                      className="mt-2 max-w-28"
                      src={URL.createObjectURL(img)}
                      alt=""
                    />
                    <MdDelete
                      onClick={() => deleteImage(img)}
                      className="absolute top-3 right-3 cursor-pointer text-2xl text-red-700"
                    />
                  </div>
                );
              })}
            </div>
            <input type={"file"} id="images" onChange={changeImage} hidden />
          </div>

          <div className="flex flex-col gap-1 mt-6 w-[400px]">
            <label htmlFor="categories" className="text-gray-500 font-semibold">
              Categories
            </label>
            <select
              value={categoryValue}
              onChange={getCategory}
              id="categories"
              className={`p-2 max-w-96 border border-solid ${
                accept && !categoryId
                  ? `border-red-700 border-2`
                  : `border-gray-400`
              } rounded-md outline-none`}
            >
              {categories.map((category, index) => {
                return <option key={index}>{category.name}</option>;
              })}
            </select>
          </div>

          {subCategories.length > 0 && (
            <div className="flex flex-col gap-1 mt-6 w-[400px]">
              <label
                htmlFor="subCategories"
                className="text-gray-500 font-semibold"
              >
                SubCategories
              </label>
              <select
                value={subCategoryValue}
                onChange={getSubCategory}
                id="subCategories"
                className={`p-2 max-w-96 border border-solid ${
                  accept && !subCategoryId
                    ? `border-red-700 border-2`
                    : `border-gray-400`
                } rounded-md outline-none`}
              >
                {subCategories.map((category, index) => {
                  return <option key={index}>{category.name}</option>;
                })}
              </select>
            </div>
          )}
          {subCategoryId && (
            <div className="flex items-center gap-2 mt-4">
              {subCategoryId.map((sub, index) => {
                return (
                  <div
                    key={index}
                    className="px-5 py-2 bg-[#46a248] text-white font-semibold rounded-md relative"
                  >
                    {sub.name}
                    <MdDelete
                      onClick={() => deleteSubCategory(sub)}
                      className="absolute top-[-10px] right-0 cursor-pointer text-xl text-red-700"
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex flex-col gap-1 mt-6 w-[400px]">
            <label htmlFor="categories" className="text-gray-500 font-semibold">
              Brand
            </label>
            <select
              value={brandValue}
              onChange={getBrand}
              id="categories"
              className={`p-2 max-w-96 border border-solid ${`border-gray-400`} rounded-md outline-none`}
            >
              {brands.map((category, index) => {
                return <option key={index}>{category.name}</option>;
              })}
            </select>
          </div>
        </form>

        <button
          className="text-white bg-blue-400 py-4 px-10 font-bold mt-6"
          onClick={addProduct}
        >
          {!clickButton ? "ADD PRODUCT" : <BeatLoader color="#FFF" />}
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
