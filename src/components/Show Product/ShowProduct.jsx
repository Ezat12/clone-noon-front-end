/* eslint-disable no-self-assign */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import shop_img from "../../assets/shop.avif";
import credit_img from "../../assets/credit card.avif";
import img_1 from "../../assets/show-product images/delivery_by_noon.avif";
import img_2 from "../../assets/show-product images/high_rated_seller.avif";
import img_3 from "../../assets/show-product images/low_return_product.avif";
import img_4 from "../../assets/show-product images/cash_on_delivery.avif";
import free_returns_usp from "../../assets/show-product images/free_returns_usp.svg";
import secure_usp from "../../assets/show-product images/secure_usp.svg";
import trusted_shipping_usp_v2 from "../../assets/show-product images/trusted_shipping_usp_v2.svg";
import axios from "axios";
import Cookies from "js-cookie";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { toast } from "react-toastify";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import "./ShowProduct.css";
import img_noReview from "../../assets/show-product images/no-reviews-found.svg";
import Items from "../ItemsProduct/Items";
import { useDispatch, useSelector } from "react-redux";
import {
  addWishlist,
  deleteWishlist,
} from "../../toolKit/wishlist/wishlistSlice";
import { addCart } from "../../toolKit/cart/cartSlice";
import Swal from "sweetalert2";

function ShowProduct() {
  const { state } = useLocation();
  const [product, setProduct] = useState(state);
  const [allProduct, setAllProduct] = useState([]);
  const [ratingDate, setRatingData] = useState([]);
  const [imgCover, setImgCover] = useState(product.imgCover);
  const [dropQuantity, setDropQuantity] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [change, setChange] = useState("not found");
  const [user, setUser] = useState({});
  const [dropReview, setDropReview] = useState(false);
  const [wishList, setWishList] = useState(true);
  const [wishlistData, setWishlistData] = useState([]);

  const cartUser = useSelector((state) => state.cart);

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const quantityList = [];
  let addCartProduct = true;
  cartUser.map((item) => {
    if (item.product._id === product._id) addCartProduct = false;
  });

  // for (let i = 0; i < cartUser.length ; i++) {
  //   if(cartUser[i].product._id === product._id) setAddCart(false)
  // }

  useEffect(() => {
    const fetchData = async () => {
      /// Get Rating Product
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/product/${product._id}/reviews`
      );
      setRatingData(response.data.data);

      /// Get All Product =========================
      const responseAllProduct = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/product`
      );
      const filterProducts = responseAllProduct.data.data.filter((p) => {
        return product.subCategory[0] === p.subCategory[0];
      });
      setAllProduct(filterProducts);

      /// Get Product ==============================
      const responseProduct = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/product/${product._id}`
      );
      setProduct(responseProduct.data.data);

      /// Get User if Login ==========================
      if (Cookies.get("auth-token")) {
        let responseUser;
        try {
          responseUser = await axios.get(
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
          }).then((result) => {
            if (result.isConfirmed) {
              Cookies.remove("auth-token");
              location.reload();
              location.href = "/login";
            }
          });
        }
        const responseWishList = await axios.get(
          `${import.meta.env.VITE_URL}/api/v1/wishlist`,
          { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
        );
        const wishlistUser = responseWishList.data.wishlistUser;
        wishlistUser.map((w) => {
          setWishlistData((data) => [...data, w._id]);
        });

        setUser(responseUser.data.data);
      }
    };
    fetchData();

    window.scrollTo({ top: 0, behavior: "smooth" });

    const handleClickOutside = (event) => {
      if (!event.target.closest(".options")) {
        setDropReview(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [change]);

  const myStylesOverall = {
    itemShapes: RoundedStar,
    activeFillColor: "#80ae04",
    inactiveFillColor: "#dbdde3",
  };

  const myStylesRating = {
    itemShapes: RoundedStar,
    activeFillColor: "#f3ac30",
    inactiveFillColor: "#dbdde3",
  };

  for (let i = 1; i <= product.quantity; i++) {
    quantityList.push(i);
  }

  const handleImgCover = (img) => {
    setImgCover(img);
  };

  const handleQuantity = () => {
    setDropQuantity((drop) => !drop);
  };

  const addRating = async () => {
    if (!rating) {
      toast.warning("Rating Required");
    } else if (!Cookies.get("auth-token")) {
      toast.error("please login");
      navigator("/login");
    } else {
      const data = {
        product: product._id,
        ratings: rating,
        title,
        user: user._id,
      };
      const response = axios.post(
        `${import.meta.env.VITE_URL}/api/v1/reviews`,
        data,
        {
          headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` },
        }
      );
      // .catch((e) => {
      //   // console.log(e);
      //   console.log(e);
      // });

      toast.promise(response, {
        pending: "Waiting...",
        success: {
          render() {
            setChange("Success Add");
            setRating(0);
            setTitle("");
            return "Success Add";
          },
        },
        error: {
          render() {
            setRating(0);
            setTitle("");
            return "You have already created a rating";
          },
        },
      });
      setChange("not found");
    }
  };

  const deleteReview = async (id) => {
    const response = axios.delete(
      `${import.meta.env.VITE_URL}/api/v1/reviews/${id}`,
      { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
    );

    // console.log(response);

    toast.promise(response, {
      pending: "Waiting...",
      success: {
        render() {
          setChange("Success Deleted");
          setWishList((wish) => !wish);
          return "Success Deleted";
        },
      },
      error: "warning!",
    });

    setRating(0);
  };

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

  const addToCart = async () => {
    if (addCartProduct) {
      if (!Cookies.get("auth-token")) {
        navigator("/login");
        toast.warning("Please login");
      } else {
        let idItem;
        const data = { product: product._id };
        const response = axios
          .post(`${import.meta.env.VITE_URL}/api/v1/cart`, data, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` },
          })
          .then((res) => {
            res.data.data.cartItem.map((item) => {
              if (item.product._id === product._id) {
                idItem = item._id;
              }
            });

            if (Number(quantity) > 1) {
              // (responseQuantity);
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
              if (Number(quantity) > 1) {
                const funData = async () => {
                  const responseQuantity = await axios.put(
                    `${import.meta.env.VITE_URL}/api/v1/cart/${idItem}`,
                    { quantity },
                    {
                      headers: {
                        Authorization: `Bearer ${Cookies.get("auth-token")}`,
                      },
                    }
                  );
                  responseQuantity.data.data.cartItem.map((item) => {
                    dispatch(addCart(item));
                  });
                };
                funData();
              }

              return "Added to cart";
            },
          },
          error: "Something went wrong",
        });
      }
    }
  };

  return (
    <div className="show-product  ">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-8 gap-3 items-start border-b-[1px] pb-6">
        <div className="images lg:col-span-1 md:col-span-1 col-span-1 flex gap-5">
          <div className="flex flex-col gap-3 items-center justify-center">
            <div
              onClick={() => handleImgCover(product?.imgCover)}
              className="cursor-pointer w-20 h-28 border-solid border-[1px] border-gray-400 rounded-md"
            >
              <img src={product?.imgCover} />
            </div>
            {product?.images.map((img, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleImgCover(img)}
                  className="cursor-pointer w-20 h-28 border-solid border-[1px] border-gray-400 rounded-md"
                >
                  <img src={img} />
                </div>
              );
            })}
          </div>
          <div className="cover-img ">
            <div className="h-full flex items-center justify-center">
              <img className="w-[300px]" src={imgCover} />
            </div>
          </div>
        </div>
        <div className="content lg:col-span-1 md:col-span-1 col-span-1 border-r-[1px] pr-4">
          <div>
            <span className="block font-semibold text-xl text-gray-500 capitalize">
              {product?.title}
            </span>
            <p className="mt-4 text-xl font-semibold ">{product?.description}</p>
            {product?.price_discount ? (
              <div>
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-sm">Was:</span>
                  <span className="text-gray-500 line-through font-thin">
                    EGP {product?.price?.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-sm">Now:</span>
                  <span className="text-xl font-bold text-gray-800">
                    EGP {product?.price_discount?.toFixed(2)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 mt-4">
                <span className="text-sm">Now:</span>
                <span className="text-xl font-bold text-gray-800">
                  EGP {product?.price?.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 mt-4">
              <img width={"15px"} src={shop_img} />
              <p className="text-sm text-gray-600">20+ sold recently</p>
            </div>
            <div className="mt-4">
              <img src={credit_img} />
            </div>
            <ul className="flex items-center justify-between rounded-lg shadow-xl p-3 mt-10">
              <li className="flex flex-col items-center text-center pl-2 gap-1">
                <img width={"30px"} height={"30px"} src={img_1} />
                <p className="text-sm">Delivery by noon</p>
              </li>
              <li className="flex flex-col items-center text-center pl-2 gap-1 border-l-[1px] ">
                <img width={"30px"} height={"30px"} src={img_2} />
                <p className="text-sm">High Rated Seller</p>
              </li>
              <li className="flex flex-col items-center text-center pl-2 gap-1 border-l-[1px] ">
                <img width={"30px"} height={"30px"} src={img_3} />
                <p className="text-sm">Low Returns</p>
              </li>
              <li className="flex flex-col items-center text-center pl-2 gap-1 border-l-[1px] ">
                <img width={"30px"} height={"30px"} src={img_4} />
                <p className="text-sm">Cash on Delivery</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="add-card lg:col-span-1 ">
          <ul className="rounded-lg shadow-md p-5 flex flex-col gap-7 ">
            <li className="flex gap-3">
              <img src={free_returns_usp} />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">FREE RETURNS</span>
                <p className="text-sm text-gray-500">
                  Get free returns on eligible items
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <img src={trusted_shipping_usp_v2} />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">TRUSTED SHIPPING</span>
                <p className="text-sm text-gray-500">
                  Free shipping when you spend EGP 200 and above on express
                  items
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <img src={secure_usp} />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">SECURE SHOPPING </span>
                <p className="text-sm text-gray-500">
                  Your data is always protected
                </p>
              </div>
            </li>
          </ul>
          <div className="flex gap-3 items-center mt-4">
            <div
              onClick={handleQuantity}
              className="relative quantity p-3 border-[1px] rounded-md flex gap-1 items-center justify-center  text-gray-600 font-semibold"
            >
              <span className="pr-4 border-r-[1px]">{quantity}</span>
              <div className="quantity-scroll flex flex-col bg-white  absolute z-50 top-16 shadow-2xl max-h-72 overflow-auto ">
                {dropQuantity &&
                  quantityList.map((q, i) => {
                    return (
                      <span
                        onClick={(e) => setQuantity(e.target.innerHTML)}
                        className="py-2 px-8 duration-100 cursor-pointer hover:bg-blue-500 hover:text-white"
                        key={i}
                      >
                        {q}
                      </span>
                    );
                  })}
              </div>
              {dropQuantity ? (
                <MdOutlineArrowDropUp className="text-2xl" />
              ) : (
                <MdOutlineArrowDropDown className="text-2xl" />
              )}
            </div>
            <div className="flex-1 flex items-center gap-3">
              <button
                onClick={addToCart}
                className={
                  addCartProduct
                    ? "flex-1 uppercase bg-blue-600 p-3 text-lg rounded-md flex flex-col items-center gap-1 text-white"
                    : "flex-1 uppercase bg-blue-600 p-3 text-lg rounded-md flex flex-col items-center gap-1 text-white cursor-not-allowed"
                }
              >
                Add To card
                {cartUser?.map((item, index) => {
                  if (item?.product._id === product._id) {
                    // setAddCart(false);
                    return (
                      <span
                        className="font-semibold lowercase text-sm"
                        key={index}
                      >
                        product already in cart
                      </span>
                    );
                  }
                })}
              </button>
              <button className="bg-[#f2f2f5] border-[1px] p-4 flex items-center justify-center rounded-md">
                {wishList && !wishlistData?.includes(product._id) ? (
                  <FaHeart onClick={handleWishListAdd} color="#aab8c2" />
                ) : (
                  <FaHeart onClick={handleWishListDelete} color="#2563eb" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="reviews mt-8 p-8">
        <h1 className=" pb-5 border-b-2 text-xl font-semibold ">
          Product Ratings & Reviews
        </h1>
        <div className="grid grid-cols-3 ">
          {product?.ratingQuantity > 0 ? (
            <div className="col-span-3 lg:col-span-1 md:col-span-1">
              <div className="mt-5">
                <h1 className="text-xl font-semibold text-gray-600">
                  Overall Rating
                </h1>
                <div className="flex items-center gap-3">
                  <Rating
                    readOnly
                    value={product?.rating_average}
                    className="w-52 mt-5"
                    itemStyles={myStylesOverall}
                  />
                  <span className="mt-5 text-gray-500 text-sm">
                    ({product?.ratingQuantity} rating)
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="image p-4">
                <img src={img_noReview} />
              </div>
              <p className="text-sm text-gray-600">
                This product doesn't have any reviews yet.
              </p>
            </div>
          )}
          <div className="col-span-3 lg:col-span-2 md:col-span-2">
            <div className="mt-5 pb-3 border-b-[1px] border-collapse">
              <div className="name flex mt-3 gap-2 flex-col">
                <span className="text-sm text-gray-600 font-semibold">
                  {user?.name}
                </span>
                <Rating
                  value={rating}
                  className="w-40"
                  onChange={setRating}
                  itemStyles={myStylesRating}
                />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Write comment"
                  className="p-2 border-2 outline-none w-72 lg:w-96 md:w-96 rounded-md mt-3"
                />
                <button
                  onClick={addRating}
                  className="text-white bg-blue-600 rounded-md py-2 px-3 ml-3 font-semibold mt-3 lg:mt-0 md:mt-0"
                >
                  Add Rating
                </button>
              </div>
            </div>
            <div className="comments bg-[#eeeeee52] px-2 flex flex-col gap-2 mt-3">
              {ratingDate?.map((rat, index) => {
                return (
                  <div
                    key={index}
                    className="coment flex justify-between pb-3 border-b-[1px]"
                  >
                    <div className="content-review">
                      <div className="flex gap-2 items-center">
                        <span>{rat?.user?.name}</span>
                        <div className="flex items-center">
                          <FaStar color="#f3ac30" />
                          <span className="text-gray-500">{rat.ratings}</span>
                        </div>
                      </div>
                      <p className="mt-1 text-gray-500">{rat.title}</p>
                    </div>
                    {rat?.user?.name === user?.name && (
                      <div
                        onClick={() => setDropReview((set) => !set)}
                        className="options relative cursor-pointer"
                      >
                        <div className="icon border-[1px] p-1 rounded-md">
                          <IoMdMore color="#727272" className="text-3xl " />
                        </div>
                        {dropReview && (
                          <div className="absolute  z-50 right-0 mt-2 rounded-md bg-[#cccccc61]">
                            <div
                              onClick={() => deleteReview(rat._id)}
                              className="p-2 px-6 cursor-pointer font-semibold text-red-600 hover:bg-red-600 hover:text-white"
                            >
                              Delete
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="more-product bg-slate-200 mt-7 p-2">
        <h1 className="font-bold px-4 text-2xl my-4">
          Products related to this
        </h1>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
          {allProduct.map((p, index) => {
            if (index < 5) {
              return <Items key={index} product={p} />;
            } else {
              return;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default ShowProduct;
