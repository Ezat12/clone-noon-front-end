import React, { useEffect, useState } from "react";
import ItemsWishlist from "../Items Wishlist/ItemsWishlist";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist, removeAll } from "../../toolKit/wishlist/wishlistSlice";
import { toast } from "react-toastify";

function Wishlist() {
  // const [wishlistDate, setWishlistDate] = useState([]);
  const dispatch = useDispatch();

  const wishlistDate = useSelector((state) => state.wishlist);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/wishlist`,
        { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
      );
      const wishlistUser = response.data.wishlistUser;
      wishlistUser.map((wishlist) => {
        dispatch(addWishlist(wishlist));
      });
    };
    if (Cookies.get("auth-token")) {
      fetchData();
    }
  }, []);

  const deleteAll = async () => {
    const response = axios.delete(
      `${import.meta.env.VITE_URL}/api/v1/wishlist/delete-all`,
      { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
    );
    toast.promise(response, {
      pending: "Waiting...",
      success: {
        render() {
          dispatch(removeAll());
          return "success deleted";
        },
      },
      error: "some thing error",
    });
  };

  return (
    <div className="wishlist p-8 bg-[#f7f7fa]">
      {wishlistDate.length > 0 ? (
        <div>
          {" "}
          <div className="flex items-center justify-between pb-5 border-b-[1px]">
            <h1 className="text-2xl font-bold text-gray-700">Wishlist</h1>
            <button
              onClick={deleteAll}
              type="text"
              className="py-2 px-5 bg-red-700 text-white font-semibold rounded-lg"
            >
              Delete All
            </button>
          </div>
          <div className="grid grid-cols-5 ">
            {wishlistDate.map((p, index) => {
              return <ItemsWishlist key={index} product={p} />;
            })}
          </div>{" "}
        </div>
      ) : (
        <div className="flex flex-col items-center h-[70vh] justify-center font-bold text-4xl">
          <span>Not Found</span>
          <p className="text-sm text-gray-500 font-sans mt-4">
            Start adding items you love to your wishlist by tapping on the heart
            icon
          </p>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
