import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdArrowRightAlt } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { BiNotepad } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import Cookies from "js-cookie";
import "./ListAccount.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";

function ListAccount() {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/user/getDataUser`,
        { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
      );
      setEmail(response.data.data.email);
    };

    if (!Cookies.get("auth-token")) {
      toast.error("You are not login... , please login");
      navigator("/login");
    } else {
      fetchData();
    }
  });

  const clickSignOut = () => {
    Swal.fire({
      title: "Do you Want to Sign out?",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("auth-token");
        Swal.fire("Success Sign out!", "", "success").then((result) => {
          if (result.isConfirmed) {
            navigator("/");
            location.reload("/");
            // window.location.reload();
          }
        });
      }
    });
  };

  return (
    <div className="p-8 w-[300px]">
      <div className="name my-5 border-b-2 pb-8">
        <h3 className="font-semibold text-lg">Hala!</h3>
        <p className="text-gray-400 mt-3">{email}</p>
      </div>
      <ul className="flex flex-col gap-10">
        <Link
          to={"/account/profile"}
          className="flex items-center justify-between text-[18px] cursor-pointer hover:"
        >
          <div className="flex items-center gap-5">
            <CgProfile />
            <span className="text-gray-500">Profile</span>
          </div>
          <MdArrowRightAlt className="right-alt" />
        </Link>
        <Link
          to={"/account/wishlist"}
          className="flex items-center justify-between text-[18px] cursor-pointer hover:"
        >
          <div className="flex items-center gap-5">
            <FaHeart />
            <span className="text-gray-500">Wishlist</span>
          </div>
          <MdArrowRightAlt className="right-alt" />
        </Link>
        <Link
          to={"/account/addresses"}
          className="flex items-center justify-between text-[18px] cursor-pointer hover:"
        >
          <div className="flex items-center gap-5">
            <FaMapLocationDot />
            <span className="text-gray-500">Addresses</span>
          </div>
          <MdArrowRightAlt className="right-alt" />
        </Link>
        <Link
          to={"/account/orders"}
          className="flex items-center justify-between text-[18px] cursor-pointer hover:"
        >
          <div className="flex items-center gap-5">
            <BiNotepad />
            <span className="text-gray-500">Orders</span>
          </div>
          <MdArrowRightAlt className="right-alt" />
        </Link>
        <Link
          to={"/account/setting"}
          className="flex items-center justify-between text-[18px] cursor-pointer hover:"
        >
          <div className="flex items-center gap-5">
            <IoMdSettings />
            <span className="text-gray-500">Setting</span>
          </div>
          <MdArrowRightAlt className="right-alt" />
        </Link>
        <li
          onClick={clickSignOut}
          className="border-t-[1px] hover:text-gray-500 pt-4 pl-4 cursor-pointer font-semibold"
        >
          Sign out
        </li>
      </ul>
    </div>
  );
}

export default ListAccount;
