import React, { useState } from "react";
import CartItems from "../Cart Items/CartItems";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function Cart() {
  const cartUser = useSelector((state) => state.cart);
  const [coupon, setCoupon] = useState("");
  const [totalDiscount, setTotalDiscount] = useState();
  const [loading, setLoading] = useState(true);

  const totalPrice = cartUser.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

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
            return "Success Add Coupon";
          },
        },
        error: "Invalid coupon name",
      });
    }
  };

  return (
    <div className={"relative cart px-10 py-6 bg-[#f7f7fa] min-h-[85vh]"}>
      {cartUser.length > 0 ? (
        <div>
          <div
            className={
              !loading ? "grid grid-cols-3 gap-5" : "grid grid-cols-3 gap-5  "
            }
          >
            <div className="cart-content col-span-2">
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
            <div className="order-summary p-5 border-[1px] h-fit rounded-lg ">
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
                <button className="mt-5 bg-[#3866df] text-white font-bold text-xl p-4 w-full">
                  CheckOut
                </button>
              </div>
            </div>
          </div>
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
