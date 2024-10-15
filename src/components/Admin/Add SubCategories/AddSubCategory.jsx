import React, { useEffect, useState } from "react";
import ManageList from "../Manage/ManageList";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import img_upload from "../../../assets/upload images.png";
import { BeatLoader } from "react-spinners";

function AddSubCategory() {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [categories, setCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(true);

  /// Fetch Get Categories
  const fetchGetCategories = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/categories`
    );

    setCategories(response.data.data);
    setLoading(false);
  };

  /// useEffect
  useEffect(() => {
    fetchGetCategories();
  }, []);

  /// Change Image
  const changeImage = (e) => {
    setImage(e.target.files);
  };

  /// Get Category
  const getCategory = (e) => {
    const value = e.target.value;
    setCategoryValue(value);
    const category = categories.filter((e) => e.name === value);

    setCategoryId(category[0]._id);
  };

  /// Add SubCategory
  const addSubCategory = async () => {
    setAccept(true);

    if (!name) {
      toast.error("the name is required");
    } else if (!categoryId) {
      toast.error("the category is required");
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image[0]);
      formData.append("category", categoryId);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/api/v1/subCategories`,
          formData,

          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth-token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response) setLoading(false);
        toast.success("Success Add SubCategory");
        console.log(response);
      } catch (e) {
        setLoading(false);
        toast.error(e.response.data.error[0].msg);
      }
    }
  };

  return (
    <div className="admin flex p-6 bg-gray-100 min-h-[85vh] gap-10">
      <ManageList />
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-overlay_color_loading flex items-center justify-center">
          <BeatLoader />
        </div>
      )}
      <div className="add-subcategory ">
        <h1 className="font-semibold text-xl pb-2 border-b-2">
          Add New SubCategory
        </h1>
        <form className="mt-5">
          <label htmlFor="image" className="text-gray-500 font-semibold">
            Add Image
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
          <input id="image" type="file" onChange={changeImage} hidden />

          <div className="flex flex-col gap-1 mt-6 w-[400px]">
            <label className="text-gray-500 font-semibold">
              SubCategory name
            </label>
            <input
              className={
                accept && !name
                  ? "p-2 border-[2px] border-solid border-[#dc3545] outline-none"
                  : "p-2 border-[1px] border-solid border-gray-600 outline-none"
              }
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Subcategory name"
            />
          </div>
          <div className="flex flex-col gap-1 mt-6 w-[400px]">
            <label htmlFor="categories" className="text-gray-500 font-semibold">
              Categories
            </label>
            <select
              value={categoryValue}
              onChange={getCategory}
              id="categories"
              className="p-2"
            >
              {categories.map((category, index) => {
                return <option key={index}>{category.name}</option>;
              })}
            </select>
          </div>
        </form>
        <button
          className="text-white bg-blue-400 py-3 px-4 font-bold mt-6"
          onClick={addSubCategory}
        >
          ADD SUBCATEGORY
        </button>
      </div>
    </div>
  );
}

export default AddSubCategory;
