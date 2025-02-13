/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import delivery_img from "../../assets/delivery.avif";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  addQuantity,
  deleteCartWithItems,
  removeCart,
} from "../../toolKit/cart/cartSlice";

function CartItems(props) {
  const { product } = props;
  const [quantity, setQuantity] = useState(product.quantity);
  const [loading, setLoading] = useState(false);
  const cartUser = useSelector((state) => state.cart);

  const [dropQuantity, setDropQuantity] = useState(false);
  const dispatch = useDispatch();

  const quantityList = [];
  for (let i = 1; i <= product.product.quantity; i++) {
    quantityList.push(i);
  }

  function addDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".handle")) {
        setDropQuantity(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDropQuantity = () => {
    setDropQuantity((drop) => !drop);
  };

  const handleQuantity = async (e) => {
    setLoading(true);
    setQuantity(e.target.innerHTML);
    const response = await axios.put(
      `${import.meta.env.VITE_URL}/api/v1/cart/${product._id}`,
      { quantity: e.target.innerHTML },
      { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
    );

    const payload = {
      itemId: product._id,
      quantity: Number(e.target.innerHTML),
    };
    dispatch(addQuantity(payload));

    setLoading(false);
  };

  const deleteQuantity = async () => {
    setLoading(true);

    const response = await axios.delete(
      `${import.meta.env.VITE_URL}/api/v1/cart/${product._id}`,
      { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
    );

    dispatch(deleteCartWithItems(product.product));
    setLoading(false);
  };

  return (
    <div className="item p-4 bg-white rounded-lg mt-3">
      {loading && <Loading />}
      <div className="flex gap-4">
        <div className="image">
          <img className="w-40" src={product.product.imgCover} />
        </div>
        <div className="content-product flex-1">
          <div className="flex justify-between flex-wrap gap-5">
            <div className="">
              <p className="font-semibold mb-2 max-w-[550px] max-h-[100px] overflow-hidden">
                {product.product.description}
              </p>
              <span className="text-sm text-gray-500">Order in 15 h 36 m</span>
              <div className="text-sm flex items-center font-semibold">
                <p>
                  Get It by{" "}
                  <span className="text-green-700">
                    {addDays(new Date(), 2).toDateString().slice(3)}
                  </span>
                </p>
              </div>
              <div className="text-gray-500 mt-2 font-semibold">
                Sold by{" "}
                <span className="font-semibold text-black">
                  {product.product.title}
                </span>
              </div>
            </div>
            <div className="">
              <h2 className="text-end text-sm">
                EGP{" "}
                <span className="font-bold text-2xl">
                  {product.price_discount
                    ? product.price_discount
                    : product.price}
                </span>
              </h2>
              <div className="flex items-center  gap-2 mt-3">
                <img className="mt-1" width={"22px"} src={delivery_img} />
                <p className="text-[12px] font-semibold ">Free Delivery</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-8">
            <button className="border-[1px] rounded-md p-2 flex items-center justify-center">
              <div
                onClick={deleteQuantity}
                className="flex items-center gap-1 text-sm font-semibold text-gray-500"
              >
                <RiDeleteBin6Line />
                <span>Remove</span>
              </div>
            </button>
            <button className="flex items-center gap-3 text-gray-600">
              <span>Qty</span>
              <div
                onClick={handleDropQuantity}
                className="handle border-[1px] p-2 rounded-md flex items-center justify-center relative gap-3"
              >
                <span>{product.quantity}</span>
                <IoMdArrowDropdown />
                <div className="quantity-scroll bg-white border-2 flex flex-col absolute z-50 top-14 shadow-lg max-h-72 overflow-auto ">
                  {dropQuantity &&
                    quantityList.map((q, i) => {
                      return (
                        <span
                          onClick={handleQuantity}
                          className="py-2 px-8 duration-100 cursor-pointer hover:bg-blue-500 hover:text-white"
                          key={i}
                        >
                          {q}
                        </span>
                      );
                    })}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
