import React, { useEffect, useState } from "react";
import ListAccount from "../ListAccount/ListAccount";
import Cookies from "js-cookie";
import axios from "axios";
import { BiX } from "react-icons/bi";
import Addresses from "../Addresses/Addresses";
import Loading from "../Loading/Loading";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDta = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/orders/getOrderUser`,
        { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
      );

      setOrders(response.data.data);
      setLoading(false);
    };
    fetchDta();
  }, []);

  return (
    <div className="relative order flex">
      {loading && <Loading />}
      <ListAccount />
      <div className="p-8 bg-[#f3f4f8] flex-1">
        <h1 className="text-2xl font-semibold">Orders</h1>
        {orders.length > 0 ? (
          <div className="max-w-[600px] mt-6">
            <div className="flex flex-col gap-5">
              {orders.map((or, i) => {
                return (
                  <div key={i} className="box p-4 bg-white">
                    <p className="font-semibold">
                      {or?.shippingAddress?.alias}
                    </p>
                    {/*<p className="font-semibold mt-1">
                      <span className="text-gray-500 mr-3">details:</span>{" "}
                      {or?.shippingAddress?.city} (
                      {or?.shippingAddress?.details})
                    </p>*/}
                    {/*<div className="flex items-center mt-1">
                      <span className="text-gray-500  mr-3">phone:</span>
                      {or?.shippingAddress?.phone}
                    </div>*/}
                    <div className="items mt-3">
                      <h3 className="font-semibold">Items:</h3>
                      <div className="images flex items-center gap-3 flex-wrap">
                        {or.cartItem.map((it, index) => {
                          return (
                            <div key={index} className="w-40 h-40">
                              <img
                                src={it.product.imgCover}
                                className="w-full h-full"
                                alt=""
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="price flex gap-2 items-center">
                        <span className="font-semibold text-lg text-gray-500">
                          Total Price:
                        </span>
                        <span className="font-semibold text-lg">
                          {or.totalPriceOrder}.00
                        </span>
                      </div>
                      <div className="flex items-center gap-6 mt-4">
                        <div className="paid flex items-center">
                          <span className="font-serif text-lg">isPaid:</span>
                          <span className="font-semibold">
                            <BiX size={"30px"} color="red" />
                          </span>
                        </div>
                        <div className="paid flex items-center">
                          <span className="font-serif text-lg">
                            isDelivered:
                          </span>
                          <span className="font-semibold">
                            <BiX size={"30px"} color="red" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-xl font-semibold">You Have no Orders</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
