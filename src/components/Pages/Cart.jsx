import React, { useEffect, useState } from "react";
import CartItems from "../Cart Items/CartItems";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { IoMdCash } from "react-icons/io";
import { FaRegCreditCard } from "react-icons/fa6";
import { IoIosExit } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const cartUser = useSelector((state) => state.cart);
  const [coupon, setCoupon] = useState("");
  const [totalDiscount, setTotalDiscount] = useState();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [checkout, setCheckout] = useState(false);

  const totalPrice = cartUser.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const responseId = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/cart`,
        { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
      );
      setId(responseId.data.data._id);

      const responseAddress = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/addresses`,
        { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
      );

      setAddresses(responseAddress.data.data);
    };
    if (Cookies.get("auth-token")) {
      fetchData();
    }
  }, []);

  const clickCoupon = async () => {
    if (coupon) {
      const response = axios
        .put(
          `${import.meta.env.VITE_URL}/api/v1/cart`,
          { discount: coupon },
          { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
        )
        .then((res) => {
          setTotalDiscount(res.data.data.totalCardPriceAfterDiscount);
        });
      toast.promise(response, {
        pending: "Waiting...",
        success: {
          render() {
            return "success add discount";
          },
        },
        error: "Invalid coupon name",
      });
    }
  };

  const handleCheckOut = () => {
    if (addresses.length > 0) {
      setCheckout(true);
    } else {
      navigator("/account/addresses");
      toast.warning("Add an address to know your address");
    }
  };

  return (
    <div className={"cart relative cart px-10 py-6 bg-[#f7f7fa] min-h-[85vh]"}>
      {cartUser.length > 0 ? (
        <div>
          <div
            className={
              !loading ? "grid grid-cols-3 gap-5" : "grid grid-cols-3 gap-5  "
            }
          >
            <div className="cart-content lg:col-span-2 col-span-3 md:col-span-3">
              <h1 className="text-3xl font-bold">
                Cart
                <span className="text-sm text-gray-500 ml-2 font-semibold">
                  (<span>{cartUser.length}</span> items)
                </span>
              </h1>
              <div className="items mt-7">
                {cartUser.map((item, index) => {
                  return <CartItems key={index} product={item} />;
                })}
              </div>
            </div>
            <div className="order-summary  lg:col-span-1 col-span-3 p-5 border-[1px] h-fit rounded-lg ">
              <div>
                <h1 className="text-2xl font-bold mb-5">Order Summary</h1>
                <div className="field flex items-center">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="p-2 border-[1px] outline-none rounded-md w-full"
                    placeholder="Coupon Code"
                  />
                  <button
                    onClick={clickCoupon}
                    className="text-white bg-[#3866df]  font-semibold uppercase p-2"
                  >
                    Apply
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="text-gray-500">
                    Subtotle(<span>{cartUser.length}</span>items)
                  </div>
                  <span className="font-semibold">EGP {totalPrice}</span>
                </div>
                <div className="flex items-center justify-between mt-2 border-b-[1px] pb-4">
                  <div className="text-gray-500">Shipping Fee</div>
                  <span className="font-bold uppercase text-[#38ae04]">
                    Free
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <h1 className="font-bold text-xl">Total</h1>
                  <span className="price font-bold text-xl">
                    EGP {totalDiscount ? totalDiscount : totalPrice}
                  </span>
                </div>
                <button
                  onClick={handleCheckOut}
                  className="mt-5 bg-[#3866df] text-white font-bold text-xl p-4 w-full"
                >
                  CheckOut
                </button>
              </div>
            </div>
          </div>
          {checkout && (
            <div className="check-out z-50 absolute top-0 left-0 w-full h-full flex  justify-center bg-[#7777775e]">
              <div className="relative p-5 mt-2 w-96 h-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <span
                  onClick={() => setCheckout(false)}
                  className="absolute top-2 right-3 text-lg cursor-pointer"
                >
                  <IoIosExit size={"25px"} />
                </span>
                <div
                  className="py-1 mt-3"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link
                    to={"/order-card"}
                    state={id}
                    id="credit card"
                    className="flex items-center px-4 gap-3 font-semibold py-4 text-md text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <FaRegCreditCard size={"20px"} />
                    Credit Card
                  </Link>
                  <Link
                    to={"/order-cash"}
                    state={id}
                    id="cash"
                    className="flex items-center gap-3 px-4 text-md font-semibold py-4 text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <IoMdCash size={"20px"} />
                    Cash
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="font-semibold flex items-center justify-center flex-col">
          <h1 className="text-3xl">Not Found</h1>
          <span className="text-sm text-gray-500 mt-4">
            Start adding items you love to your cart by tapping on the cart icon
          </span>
        </div>
      )}
    </div>
  );
}

export default Cart;
