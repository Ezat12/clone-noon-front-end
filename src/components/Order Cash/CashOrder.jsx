import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeCart } from "../../toolKit/cart/cartSlice";

function CashOrder() {
  const [addresses, setAddresses] = useState([]);
  let chooseAddress;
  const { state } = useLocation();
  const navigator = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
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

  const handleAddresses = (e) => {
    const getDivAddress = document.querySelector(".addresses");
    addresses.map((ad, i) => {
      getDivAddress.children[i].classList.remove("border-blue-400");
    });

    e.currentTarget.classList.add("border-blue-400");
    chooseAddress = e.currentTarget.id;
  };

  const handleConfirm = async () => {
    if (chooseAddress) {
      Swal.fire({
        title: "Click Continue to send you the order!",
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "continue!",
        cancelButtonText: "cancel",
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const data = {
            shippingAddress: {
              alias: addresses[chooseAddress].alias,
              details: addresses[chooseAddress].details,
              phone: addresses[chooseAddress].phone,
              city: addresses[chooseAddress].city,
            },
          };

          const responseOrderCsh = await axios.post(
            // eslint-disable-next-line react/prop-types
            `${import.meta.env.VITE_URL}/api/v1/orders/${state}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("auth-token")}`,
              },
            }
          );

          Swal.fire("The order is on its way to you", "", "success");
          dispatch(removeCart());
          navigator("/account/orders");
          // location.;
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      toast.info("Select Address");
    }
  };

  return (
    <div className="order-cash bg-back_color h-[85vh]">
      <div className="order bg-white p-5 ">
        <h1 className="text-lg font-semibold">Select Delivery Address</h1>
        {addresses.length > 0 && (
          <div className="addresses flex flex-col gap-5 ">
            {addresses.map((add, index) => {
              return (
                <div
                  onClick={handleAddresses}
                  key={index}
                  id={index}
                  className="box mt-3 bg-gray-200 p-4 min-w-96 border-2"
                >
                  <p className="font-semibold">
                    <span className="text-gray-500 mr-3">Alias:</span>{" "}
                    {add.alias}
                  </p>
                  <p className="font-semibold mt-3">
                    <span className="text-gray-500 mr-3">details:</span>{" "}
                    {add.city} ({add.details})
                  </p>
                  <div className="flex items-center mt-3">
                    <span className="text-gray-500  mr-3">phone:</span>
                    {add.phone}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-6">
          <button
            onClick={handleConfirm}
            className="text-xl bg-blue-500 py-3 text-white px-6 rounded-md"
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
}

export default CashOrder;
