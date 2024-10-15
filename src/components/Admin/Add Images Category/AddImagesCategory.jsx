import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import ManageList from "../Manage/ManageList";
import { BeatLoader } from "react-spinners";
import img_upload from "../../../assets/upload images.png";

function AddImagesCategory() {
  const [images, setImages] = useState([]);
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
    if (e.target.files[0]) {
      setImages((image) => [...image, e.target.files[0]]);
    }
  };

  /// Get Category
  const getCategory = (e) => {
    const value = e.target.value;
    setCategoryValue(value);
    const category = categories.filter((e) => e.name === value);

    setCategoryId(category[0]._id);
  };

  /// Add SubCategory
  const addImagesCategory = async () => {
    setAccept(true);

    if (!images.length) {
      toast.error("the images is required");
    } else if (!categoryId) {
      toast.error("the category is required");
    } else {
      setLoading(true);
      const formData = new FormData();
      images.forEach((img) => {
        formData.append(`images`, img);
      });
      formData.append("category", categoryId);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/api/v1/imagesCategory`,
          formData,

          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth-token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response) setLoading(false);
        toast.success("Success Add Images Category");
        console.log(response);
      } catch (e) {
        setLoading(false);
        console.log(e);

        toast.error(e.response.data.error[0].msg);
      }
    }
  };
  return (
    <div className="images-category">
      <div className="admin flex p-6 bg-gray-100 min-h-[85vh] gap-10">
        <ManageList />
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full bg-overlay_color_loading flex items-center justify-center">
            <BeatLoader />
          </div>
        )}
        <div className="add-images ">
          <h1 className="font-semibold text-xl pb-2 border-b-2">
            Add New Images Category
          </h1>
          <form className="mt-5">
            <label htmlFor="image" className="text-gray-500 font-semibold">
              Add Image
              <img
                className="cursor-pointer mt-2 max-w-36"
                src={img_upload}
                alt=""
              />
              {images.length > 0 && (
                <div className="flex items-center gap-3">
                  {images.map((img, index) => {
                    return (
                      <img
                        key={index}
                        className="cursor-pointer mt-2 max-w-36"
                        src={URL.createObjectURL(img)}
                        alt=""
                      />
                    );
                  })}
                </div>
              )}
            </label>
            <input id="image" type="file" onChange={changeImage} hidden />

            <div className="flex flex-col gap-1 mt-6 w-[400px]">
              <label
                htmlFor="categories"
                className="text-gray-500 font-semibold"
              >
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
            onClick={addImagesCategory}
          >
            ADD IMAGES
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddImagesCategory;
