import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist } from "../../toolKit/wishlist/wishlistSlice";
import { ShimmerDiv } from "shimmer-effects-react";
import { addCart } from "../../toolKit/cart/cartSlice";

function Categories() {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const cartUser = useSelector((state) => state.cart);

  const fetchData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/categories`
    );
    setCategories(response.data.data);
    // if (Cookies.get("auth-token")) {
    // Push Wishlist ==========
    // const responseWishlist = await axios.get(
    //   `${import.meta.env.VITE_URL}/api/v1/wishlist`,
    //   { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
    // );
    // const wishlistUser = responseWishlist.data.wishlistUser;
    // wishlistUser.map((wishlist) => {
    //   dispatch(addWishlist(wishlist));
    // });

    // Push Cart =============
    // const responseCart = await axios.get(
    //   `${import.meta.env.VITE_URL}/api/v1/cart`,
    //   { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
    // );
    // const cartUser = responseCart.data.data.cartItem;
    // cartUser.map((item) => {
    //   dispatch(addCart(item));
    // });
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="categories p-8 ">
      <div className="flex items-center gap-3 justify-around">
        {categories.length <= 0 && (
          <div className="w-full flex items-center justify-between ">
            <ShimmerDiv
              mode="light"
              height={"140px"}
              width={"144px"}
              rounded={50}
            />
            <ShimmerDiv
              mode="light"
              height={"140px"}
              width={"144px"}
              rounded={50}
            />
            <ShimmerDiv
              mode="light"
              height={"140px"}
              width={"144px"}
              rounded={50}
            />
            <ShimmerDiv
              mode="light"
              height={"140px"}
              width={"144px"}
              rounded={50}
            />
            <ShimmerDiv
              mode="light"
              height={"140px"}
              width={"144px"}
              rounded={50}
            />
            <ShimmerDiv
              mode="light"
              height={"140px"}
              width={"144px"}
              rounded={50}
            />
          </div>
        )}
        {categories.map((category, index) => {
          return (
            <Link to={`/${category.slug}`} state={category} key={index}>
              <img className="w-36 h-40" src={category.image} alt="" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
