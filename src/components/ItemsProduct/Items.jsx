/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { LiaCartPlusSolid } from "react-icons/lia";
import delivery_img from "../../assets/delivery.avif";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdDeleteSweep } from "react-icons/md";

import {
  addWishlist,
  deleteWishlist,
} from "../../toolKit/wishlist/wishlistSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Product from "../Product/Product";
import {
  addCart,
  addQuantity,
  deleteCartWithItems,
} from "../../toolKit/cart/cartSlice";

function Items(props) {
  const { product } = props;
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState(false);
  const [cart, setCart] = useState(false);
  const navigator = useNavigate();

  const wishlistUser = useSelector((state) => state.wishlist);
  const cartUser = useSelector((state) => state.cart);

  useEffect(() => {
    wishlistUser.map((p) => {
      if (p._id === product._id) {
        setWishList(true);
      }
    });
    cartUser.map((p) => {
      if (p.product._id === product._id) {
        setCart(true);
      }
    });
  });

  const handleWishListAdd = async () => {
    if (!Cookies.get("auth-token")) {
      navigator("/login");
      toast.warning("Please login");
    } else {
      const data = { product: product._id };
      const response = axios.post(
        `${import.meta.env.VITE_URL}/api/v1/wishlist`,
        data,
        { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
      );

      toast.promise(response, {
        pending: "Waiting...",
        success: {
          render() {
            dispatch(addWishlist(product));
            setWishList((wish) => !wish);
            return "Added to Wishlist";
          },
        },
      });
    }
  };

  const handleWishListDelete = async () => {
    const response = axios.delete(
      `${import.meta.env.VITE_URL}/api/v1/wishlist`,
      {
        data: { product: product._id },
        headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` },
      }
    );

    toast.promise(response, {
      pending: "Waiting...",
      success: {
        render() {
          dispatch(deleteWishlist(product));
          setWishList((wish) => !wish);
          return "Deleted to Wishlist";
        },
      },
    });
  };

  const handleCartAdd = async () => {
    if (!Cookies.get("auth-token")) {
      navigator("/login");
      toast.warning("Please login");
    } else {
      const data = { product: product._id };
      const response = axios
        .post(`${import.meta.env.VITE_URL}/api/v1/cart`, data, {
          headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` },
        })
        .then((res) => {
          let checkProduct = false;
          cartUser.map((item) => {
            if (item.product._id === product._id) checkProduct = true;
          });
          if (checkProduct) {
            const payload = { productId: product._id };
            dispatch(addQuantity(payload));
          } else {
            res.data.data.cartItem.map((item) => {
              dispatch(addCart(item));
            });
          }
        });

      toast.promise(response, {
        pending: "Waiting...",
        success: {
          render() {
            setCart((cart) => !cart);
            return "Added to cart";
          },
        },
        error: "Something went wrong",
      });
    }
  };

  const handleCartDelete = async () => {
    const response = axios.delete(
      `${import.meta.env.VITE_URL}/api/v1/cart/${product._id}`,

      { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
    );
    toast.promise(response, {
      pending: "Waiting...",
      success: {
        render() {
          dispatch(deleteCartWithItems(product));
          setCart((cart) => !cart);
          return "Deleted to cart";
        },
      },
      error: "Something went wrong",
    });
  };

  return (
    <div className="items px-3 py-5">
      <div className="box bg-white p-3 rounded-lg">
        <div className=" p-2 relative">
          <Link
            to={`/show-product/${product._id}`}
            onClick={() =>
              setTimeout(() => {
                window.location.reload();
              }, 4)
            }
            state={product}
          >
            <img className="" src={product.imgCover} />
          </Link>
          <div className="bg-white rounded-lg shadow-lg flex items-center justify-center p-2 absolute  text-gray-500 top-2 right-2 text-xl cursor-pointer">
            {!wishList ? (
              <FaRegHeart onClick={handleWishListAdd} />
            ) : (
              <FaHeart color="red" onClick={handleWishListDelete} />
            )}
          </div>
          <div className="bg-white rounded-lg shadow-lg flex items-center justify-center p-2 absolute text-gray-500 bottom-2 right-2 text-2xl cursor-pointer">
            {!cart ? (
              <LiaCartPlusSolid onClick={handleCartAdd} />
            ) : (
              <MdDeleteSweep onClick={handleCartDelete} />
            )}
          </div>
        </div>
        <div className="mt-2">
          <p className="font-mono overflow-hidden leading-[1.24] h-[34.72px] mb-3">
            {product.description}
          </p>
          <div className="text-sm mt-1 flex items-center">
            EGP
            {product.price_discount && (
              <div>
                <span className="font-bold text-[17px]">
                  {product.price_discount}
                </span>
                <span className="line-through ml-2 text-gray-500">
                  {product.price}
                </span>
                <span className="text-[14px] font-bold text-green-600 ml-2">
                  {(
                    (product.price - product.price_discount) /
                    product.price
                  ).toFixed(1) * 100}
                  %
                </span>
              </div>
            )}
            {!product.price_discount && (
              <span className="font-bold text-[17px]">{product.price}</span>
            )}
          </div>
          <div className="delivery flex items-center gap-1 mt-2">
            <img width={"20px"} src={delivery_img} alt="" />
            <span className="text-[13px]">Free Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Items;
