/* eslint-disable react/prop-types */
import React from "react";
import img_text from "../../assets/slider_1.avif";
import delivery_img from "../../assets/delivery.avif";
import coupon_img from "../../assets/coupon-discount-v2.svg";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { deleteWishlist } from "../../toolKit/wishlist/wishlistSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function ItemsWishlist(props) {
  const { product } = props;
  // const product = {
  //   imgCover: img_text,
  //   description: "Timberland Ss Millers River ColPolo",
  //   price_discount: 120,
  //   price: 200,
  // };

  const dispatch = useDispatch();

  const handleDelete = async () => {
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
          return "Deleted to Wishlist";
        },
      },
    });
  };

  return (
    <div className="items px-3 py-5">
      <div className="box  bg-white p-3 rounded-lg">
        <div className=" p-2 relative">
          <img className="" src={product.imgCover} />
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
          <div className="offer bg-[#38ae040d] w-fit flex items-center gap-2 mt-2 p-1 text-sm text-[#38ae04] font-semibold border-dashed border-[1px] border-[#38ae04]">
            <img width={"13px"} src={coupon_img} />
            <span>Get 10% off</span>
          </div>
          <div className="view flex items-center gap-3 mt-5">
            <Link
              to={`/show-product/${product._id}`}
              state={product}
              className="flex-1 text-center p-2 border-[1px] border-blue-700 text-blue-700 uppercase rounded-md font-semibold hover:text-white hover:bg-blue-700 transition delay-75"
            >
              View Option
            </Link>
            <div
              onClick={handleDelete}
              className="p-2 border-red-700 border-[1px] text-xl rounded-md cursor-pointer"
            >
              <MdDelete color="red" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsWishlist;
