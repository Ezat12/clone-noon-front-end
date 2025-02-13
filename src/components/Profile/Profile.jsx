import React, { useEffect, useState } from "react";
import ListAccount from "../ListAccount/ListAccount";
import { FaFemale, FaMale } from "react-icons/fa";
import "./Profile.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

function Profile() {
  
  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    name: "",
    gender: "",
    birthday: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/user/getDataUser`,
        { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
      );
      setDataUser(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (dataUser) {
      setData({
        name: dataUser.name || "",
        gender: dataUser.gender || "",
        birthday: dataUser.birthday || "",
      });
    }
  }, [dataUser]); 

  const [phone, setPhone] = useState(dataUser.phone);
  const [change, setChange] = useState(false);

  // Handle Gender ==========
  const handleGender = (e) => {
    const div = document.querySelectorAll(".gender div");

    div.forEach((el) => {
      el.classList.remove(
        "bg-[#d9e4ff]",
        "border-solid",
        "border-[2px]",
        "border-[#345dc4]",
        "text-[#3866df]"
      );
      el.classList.remove(
        "bg-[#ffdbe7]",
        "border-solid",
        "border-[1px]",
        "border-[#d72b66]",
        "text-[#d72b66]"
      );
      el.classList.add("bg-gray-300");
    });

    const currentDiv = e.currentTarget;
    setData((d) => {
      return {
        ...d,
        [currentDiv.lastChild.name]: currentDiv.lastChild.value,
      };
    });
    if (currentDiv.lastChild.value === "Male") {
      currentDiv.classList.remove("bg-gray-300");
      currentDiv.classList.add(
        "bg-[#d9e4ff]",
        "border-solid",
        "border-[1px]",
        "border-[#345dc4]",
        "text-[#3866df]"
      );
    } else {
      currentDiv.classList.remove("bg-gray-300");
      currentDiv.classList.add(
        "bg-[#ffdbe7]",
        "border-solid",
        "border-[1px]",
        "border-[#d72b66]",
        "text-[#d72b66]"
      );
    }

    setChange(true);
  };

  // Handle Change Value ===========
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((d) => {
      return {
        ...d,
        [name]: value,
      };
    });

    setChange(true);
  };

  const changeProfile = async () => {
    if (
      dataUser.name === data.name &&
      dataUser.gender === data.gender &&
      dataUser.phone === phone &&
      dataUser.birthday === data.birthday
    ) {
      toast.error("You didn't change anything");
    } else {
      const name = data.name ? data.name : dataUser.name;
      if (name.length <= 3) {
        return toast.error("The name must be greater than 3 char");
      } else {
        try {
          await axios.put(
            `${import.meta.env.VITE_URL}/api/v1/user/updateUserData`,

            phone ? { ...data, phone: `+${phone}` } : { ...data },
            {
              headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` },
            }
          );
          toast.success("success update");
          // location.reload();
          setChange(false);
        } catch (e) {
          // console.log(e);

          toast.error("Invalid phone");
        }
      }
    }
  };

  return (
    <div className=" flex ">
      <ListAccount />
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full z-10 bg-[#ffffffab]">
          {" "}
          <BeatLoader className="absolute top-[50%] left-[50%]" />
        </div>
      )}
      <div className="profile bg-[#f3f4f8] w-full p-4">
        {/*<div className="w-full"></div>*/}
        <div className="content-profile bg-white p-6 ">
          <h1 className="text-lg font-semibold">Profile Info</h1>
          <form className="form-name flex flex-wrap items-center gap-6 mt-6">
            <div className="flex flex-col gap-2 min-w-64">
              <label htmlFor="email">Email</label>
              <input
                className="border-solid border-2  border-gray-300 outline-none p-2 rounded-md cursor-not-allowed"
                type="text"
                id="email"
                value={dataUser.email}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2 min-w-64">
              <label htmlFor="name">name</label>
              <input
                className="border-solid border-2 border-gray-300 outline-none p-2 rounded-md "
                type="text"
                id="name"
                value={data.name || change ? data.name : dataUser.name}
                name={"name"}
                onChange={handleChange}
              />
            </div>
          </form>
          <form className="form-info flex items-center gap-6 mt-6">
            <div className="flex flex-col gap-2 min-w-64">
              <label htmlFor="Phone">Phone number</label>
              <PhoneInput
                id="Phone"
                className="border-solid border-2  border-gray-300 outline-none p-2 rounded-md"
                value={dataUser.phone}
                country={"eg"}
                onlyCountries={["eg"]}
                onChange={(phone) => {
                  setPhone(phone);
                  setChange(true);
                }}
                name="phone"
                international
              ></PhoneInput>
            </div>
            <div className="flex flex-col gap-2 min-w-64">
              <label htmlFor="Birthday">Birthday</label>
              <input
                className="border-solid border-2 border-gray-300 outline-none p-2 rounded-md "
                type="date"
                id="Birthday"
                name="birthday"
                value={data?.birthday?.split("T")[0]}
                onChange={handleChange}
              />
            </div>
            <div className="checked-input flex flex-col gap-2 min-w-64">
              <label>Gender</label>
              <div className="gender flex items-center gap-4">
                <div
                  className={
                    dataUser.gender === "Male"
                      ? " px-4 py-3 rounded-3xl cursor-pointer bg-[#d9e4ff] border-solid border-[1px] border-[#345dc4] text-[#3866df]"
                      : "bg-gray-300 px-4 py-3 rounded-3xl cursor-pointer "
                  }
                  onClick={handleGender}
                >
                  <label
                    className="flex gap-1 items-center cursor-pointer"
                    htmlFor="maleGender"
                  >
                    <FaMale /> Male
                  </label>
                  <input
                    id="maleGender"
                    type="radio"
                    name="gender"
                    value={"Male"}
                    hidden
                  />
                </div>
                <div
                  className={
                    dataUser.gender === "Female"
                      ? " px-4 py-3 rounded-3xl cursor-pointer bg-[#ffdbe7] border-solid border-[1px] border-[#d72b66] text-[#d72b66]"
                      : "bg-gray-300 px-4 py-3 rounded-3xl cursor-pointer "
                  }
                  onClick={handleGender}
                >
                  <label
                    className="flex gap-1 items-center cursor-pointer"
                    htmlFor="femaleGender"
                  >
                    <FaFemale /> Female
                  </label>
                  <input
                    id="femaleGender"
                    type="radio"
                    name="gender"
                    value={"Female"}
                    hidden
                  />
                </div>
                <div></div>
              </div>
            </div>
          </form>
          <button
            onClick={change ? changeProfile : null}
            // onClick={changeProfile()}
            className={
              !change
                ? "my-10 px-5 py-4 bg-gray-300 text-white text-lg cursor-no-drop"
                : "my-10 px-5 py-4 bg-[#3866df] text-white text-lg cursor-pointer"
            }
          >
            UPDATE PROFILE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
