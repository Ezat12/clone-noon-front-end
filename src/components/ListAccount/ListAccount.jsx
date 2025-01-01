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
import { PiUserList } from "react-icons/pi";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
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
    <div className="list-account relative">
      <div className="list-icon hidden absolute top-[30px] left-[240px]">
        <Menu>
          <MenuButton className="list-icon z-30  bg-gray-100 px-4 py-2 cursor-pointer rounded-3xl flex items-center gap-4">
            <PiUserList size={"25px"} />
            <MdOutlineArrowDropDownCircle size={"20px"} />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border border-white/5 bg-gray-100 p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <button
                onClick={() => navigator("/account/profile")}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-blue-500 data-[focus]:text-white"
              >
                Profile
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => navigator("/account/addresses")}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-blue-500 data-[focus]:text-white"
              >
                Addresses
              </button>
            </MenuItem>
            <div className="my-1 h-px bg-white/5" />
            <MenuItem>
              <button
                onClick={() => navigator("/account/orders")}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-blue-500 data-[focus]:text-white"
              >
                Orders
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => navigator("/account/setting")}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-blue-500 data-[focus]:text-white"
              >
                Setting
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => navigator("/account/setting")}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-red-500 data-[focus]:text-white"
              >
                Logout
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <div
        className={
          location.pathname !== "/account"
            ? "p-8 w-[300px] list relative"
            : "p-8 w-[300px] relative"
        }
      >
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
    </div>
  );
}

export default ListAccount;
