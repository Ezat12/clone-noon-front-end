import React, { useEffect, useState } from "react";
import Select from "react-select";
import ListAccount from "../ListAccount/ListAccount";
import axios from "axios";
import Cookies from "js-cookie";
import { HashLoader } from "react-spinners";
import Loading from "../Loading/Loading";

function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const [alias, setAlias] = useState("");
  const [details, setDetails] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [phone, setPhone] = useState("+20");

  const [accept, setAccept] = useState(false);

  const cityOptions = [
    { value: "cairo", label: "Cairo" },
    { value: "alexandria", label: "Alexandria" },
    { value: "giza", label: "Giza" },
    { value: "sharm_el_sheikh", label: "Sharm El-Sheikh" },
    { value: "luxor", label: "Luxor" },
    { value: "aswan", label: "Aswan" },
    { value: "hurghada", label: "Hurghada" },
    { value: "gharbia", label: "Gharbia" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/addresses`,
        { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
      );
      setAddresses(response.data.data);
      setLoadingPage(false);
    };

    fetchData();
  }, []);

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    if (value === "" || value.startsWith("+20")) {
      const formattedPhone = value.replace(/[^\d+]/g, "");
      setPhone(formattedPhone);
    }
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const clickAddAddress = async () => {
    setAccept(true);
    if (selectedCity && alias && phone.length >= 13 && details) {
      setLoadingButton(true);
      const data = {
        alias,
        details,
        phone,
        city: selectedCity.label,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/addresses`,
        data,
        {
          headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` },
        }
      );

      const addresses = response.data.data.addresses;
      setAddresses(addresses);
      setLoadingButton(false);
    }
  };

  return (
    <div className="address flex relative">
      <ListAccount />
      {loadingPage && <Loading />}
      <div className="p-8 bg-[#f3f4f8] flex-1">
        <div className="p-5 bg-white flex gap-4">
          <div className="add-address border-r-2 pr-5">
            <h1 className="text-xl font-semibold">Add New Address</h1>
            <div className="field mt-5 flex flex-col">
              <input
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className={
                  accept && !alias
                    ? "border-red-600 border p-3 max-w-60 focus:outline-none  focus:ring-blue-500 focus:border-blue-500 focus:border-transparent rounded-md"
                    : "border p-3 max-w-60 focus:outline-none  focus:ring-blue-500 focus:border-blue-500 focus:border-transparent rounded-md"
                }
                type="text"
                placeholder="write Alias (Ex:Home or work)"
              />
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="write details"
                className={
                  accept && !details
                    ? "mt-3 border-red-600 border p-3 max-w-80 focus:outline-none  focus:ring-blue-500 focus:border-blue-500 focus:border-transparent rounded-md"
                    : "mt-3 border p-3 max-w-80 focus:outline-none  focus:ring-blue-500 focus:border-blue-500 focus:border-transparent rounded-md"
                }
              ></textarea>
              <div className="mt-3 max-w-80">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength="13" // +20 followed by 10 digits
                  placeholder="+20XXXXXXXXXX"
                  className={
                    accept && phone.length < 13
                      ? "mt-1 px-3 py-2 bg-white border border-red-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                      : "mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                  }
                />
                <p className="mt-2 text-sm text-gray-600">
                  Format: +201XXXXXXXXX (10 digits after +20)
                </p>
              </div>
              <div className="mt-3 max-w-60">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select City
                </label>
                <Select
                  id="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                  options={cityOptions}
                  placeholder="Choose a city"
                  className={
                    accept && !selectedCity
                      ? "mt-1 border border-red-600"
                      : "mt-1"
                  }
                />
                {selectedCity && (
                  <p className="mt-2 text-sm text-gray-600">
                    You have selected: {selectedCity.label}
                  </p>
                )}
              </div>
              <button
                onClick={clickAddAddress}
                className="p-4 flex items-center justify-center rounded-md bg-blue-500 max-w-80 text-center text-white text-lg font-semibold mt-5"
              >
                {loadingButton ? (
                  <HashLoader size={"28"} color="#ffff" />
                ) : (
                  "ADD ADDRESS"
                )}
              </button>
            </div>
          </div>
          <div className="address-user flex-1">
            <h1 className="text-xl font-semibold ">
              You addresses
              <span className="text-sm text-gray-500 ">
                ({addresses.length} address)
              </span>
            </h1>
            {addresses.length > 0 ? (
              <div className="flex flex-col gap-5 ">
                {addresses.map((add, index) => {
                  return (
                    <div
                      key={index}
                      className="box mt-3 bg-gray-200 p-4 min-w-96"
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
            ) : (
              <div className="flex items-center justify-center w-full h-full text-2xl font-semibold">
                Not Found Addresses
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addresses;
