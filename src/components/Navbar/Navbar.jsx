// import React from 'react'
import logo from "../../assets/logo-shop.jpeg";
import { CiUser } from "react-icons/ci";
import { HiOutlineHeart } from "react-icons/hi2";
import { PiShoppingCartLight } from "react-icons/pi";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { addWishlist } from "../../toolKit/wishlist/wishlistSlice";
import { addCart } from "../../toolKit/cart/cartSlice";
import { IoMdArrowDropup } from "react-icons/io";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Navbar() {
  const dispatch = useDispatch();
  const wishlistDate = useSelector((state) => state.wishlist);
  const cartData = useSelector((state) => state.cart);
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (Cookies.get("auth-token")) {
        try {
          const responseInvalidToken = await axios.get(
            `${import.meta.env.VITE_URL}/api/v1/user/getDataUser`,
            {
              headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` },
            }
          );
        } catch (e) {
          Swal.fire({
            title: "error token!",
            text: "Please Login again",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            // confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              Cookies.remove("auth-token");
              location.reload();
              location.href = "/login";
              // navigator("/login");
            }
          });
        }
      }

      // Push Wishlist User =============================
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/wishlist`,
        { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
      );
      const wishlistUser = response.data.wishlistUser;
      wishlistUser.map((wishlist) => {
        dispatch(addWishlist(wishlist));
      });

      // Push Cart User ==============================
      const responseCart = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/cart`,
        { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
      );

      const cartUser = responseCart.data.data.cartItem;
      cartUser.map((item) => {
        dispatch(addCart(item));
      });
    };

    const fetchDatSearch = async () => {
      const responseProductSearch = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/product?keyword=${search}`
      );
      setDataSearch(responseProductSearch.data.data);
    };
    if (Cookies.get("auth-token")) {
      fetchData();
    }
    if (search) {
      fetchDatSearch();
    } else {
      setDataSearch([]);
    }
  }, [search]);

  return (
    <div className="navbar bg-main_color">
      <div className="navbar-container p-3 flex items-center justify-between gap-4 flex-wrap">
        <Link to={"/"} className="logo cursor-pointer">
          <img src={logo} alt="" />
        </Link>
        <div className="form flex-1 relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none p-2 rounded-md text-black "
            type="text"
            placeholder="What are you looking for?.."
          />
          {dataSearch.length > 0 && (
            <span className="absolute left-0 top-7">
              <IoMdArrowDropup color="#ddd" size={"40px"} />
            </span>
          )}
          {search && (
            <div className="search absolute bg-gray-100 w-full mt-3 z-50 shadow-2xl flex flex-col">
              {dataSearch.map((p, index) => {
                return (
                  <Link
                    onClick={() => {
                      setSearch("");
                      setDataSearch([]);
                    }}
                    to={`/show-product/${p._id}`}
                    state={p}
                    key={index}
                    className="p-2 font-semibold transition duration-75 hover:bg-blue-300 hover:text-white cursor-pointer"
                  >
                    {p.description}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <ul className="ul-logo flex items-center gap-5">
          {!Cookies.get("auth-token") ? (
            <Link to={"/login"} className="li_link">
              <a>log in</a>
              <CiUser className="icons" />
            </Link>
          ) : (
            <Link to={"/account"} className="li_link flex">
              <a className="font-bold">My Account</a>
              <MdAccountCircle />
            </Link>
          )}
          <Link to={"/wishlist"} className="li_link relative">
            <a>Wishlist</a>
            <HiOutlineHeart className="icons" />
            {wishlistDate.length > 0 && (
              <span className="w-4 h-4 flex items-center justify-center absolute -top-1.5 -right-1.5  rounded-full bg-blue-600 text-white text-sm font-semibold">
                {wishlistDate.length}
              </span>
            )}
          </Link>
          {
            <Link to={"/cart"} className="li_link">
              <a>Cart</a>
              <PiShoppingCartLight className="icons" />
              {cartData.length > 0 && (
                <span className="w-4 h-4 flex items-center justify-center absolute -top-1.5 -right-1.5  rounded-full bg-blue-600 text-white text-sm font-semibold">
                  {cartData.length}
                </span>
              )}
            </Link>
          }
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
