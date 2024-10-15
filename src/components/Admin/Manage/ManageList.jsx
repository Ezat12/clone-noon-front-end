import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function ManageList() {
  const navigator = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/user/getDataUser`,
        { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
      );
      const role = response.data.data.role;
      if (role !== "admin" || !role) {
        toast.error("You are not allowed access the route");
        navigator("/");
      }
    } catch (e) {
      toast.error("You are not access the route");
      navigator("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="manage bg-white p-3">
      <ul className="flex flex-col gap-5">
        <Link
          to={"/admin/productManage"}
          className="py-3 px-3 cursor-pointer border-b-2 font-bold hover:bg-black hover:text-white transition-shadow rounded-lg"
        >
          Product management
        </Link>
        <Link
          to={"/admin/orderManage"}
          className="py-3 px-3 cursor-pointer border-b-2 font-bold hover:bg-black hover:text-white transition-shadow rounded-lg"
        >
          Orders management
        </Link>
        <Link
          to={"/admin/addCategory"}
          className="py-3 px-3 cursor-pointer border-b-2 font-bold hover:bg-black hover:text-white transition-shadow rounded-lg"
        >
          Add Category
        </Link>
        <Link
          to={"/admin/addSubCategory"}
          className="py-3 px-3 cursor-pointer border-b-2 font-bold hover:bg-black hover:text-white transition-shadow rounded-lg"
        >
          Add SubCategory
        </Link>
        <Link
          to={"/admin/addBrand"}
          className="py-3 px-3 cursor-pointer border-b-2 font-bold hover:bg-black hover:text-white transition-shadow rounded-lg"
        >
          Add Brand
        </Link>
        <Link
          to={"/admin/addProduct"}
          className="py-3 px-3 cursor-pointer border-b-2 font-bold hover:bg-black hover:text-white transition-shadow rounded-lg"
        >
          Add Product
        </Link>
        <Link
          to={"/admin/addImagesCategory"}
          className="py-3 px-3 cursor-pointer border-b-2 font-bold hover:bg-black hover:text-white transition-shadow rounded-lg"
        >
          Add Images Category
        </Link>
      </ul>
    </div>
  );
}

export default ManageList;
