import React, { useState } from "react";
import ManageList from "../Manage/ManageList";
import img_upload from "../../../assets/upload images.png";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function AddCategory() {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [accept, setAccept] = useState(false);

  const changeImage = (e) => {
    setImage(e.target.files);
  };

  const addCategory = async () => {
    setAccept(true);

    if (name) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image[0]);

      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/categories`,
        formData,
        { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
      );

      if (response) toast.success("Success Add Category");
      console.log(response);
    }
  };

  return (
    <div className="admin flex p-6 bg-gray-100 min-h-[85vh] gap-10">
      <ManageList />
      <div className="add-category ">
        <h1 className="font-semibold text-xl pb-2 border-b-2">
          Add New Category
        </h1>
        <form className="mt-5">
          <label htmlFor="image" className="text-gray-500 font-semibold">
            Add Image
            {!image ? (
              <img className="cursor-pointer mt-2" src={img_upload} alt="" />
            ) : (
              <img
                className="cursor-pointer mt-2"
                src={URL.createObjectURL(image[0])}
                alt=""
              />
            )}
          </label>
          <input id="image" type="file" onChange={changeImage} hidden />

          <div className="flex flex-col gap-1 mt-6 w-[400px]">
            <label className="text-gray-500 font-semibold">category name</label>
            <input
              className={
                accept && !name
                  ? "p-2 border-[2px] border-solid border-[#dc3545] outline-none"
                  : "p-2 border-[1px] border-solid border-gray-600 outline-none"
              }
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="category name"
            />
          </div>
        </form>
        <button
          className="text-white bg-blue-400 py-3 px-4 font-bold mt-6"
          onClick={addCategory}
        >
          ADD CATEGORY
        </button>
      </div>
    </div>
  );
}

export default AddCategory;
