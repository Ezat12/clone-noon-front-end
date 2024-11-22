import React, { useState } from "react";
import ListAccount from "../ListAccount/ListAccount";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";

function Setting() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [errorCurrent, setErrorCurrent] = useState(false);
  const [errorNewPass, setErrorNewPass] = useState(false);

  const [passwordNotCorrect, setPasswordNotCorrect] = useState(false);

  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(false);

  const changePassword = () => {
    setChange(true);
  };

  const handleCurrentPassword = (e) => {
    setPasswordNotCorrect(false);
    const value = e.target.value;
    setCurrentPassword(value);

    if (value.length < 6) {
      setErrorCurrent(true);
    } else {
      setErrorCurrent(false);
    }
  };

  const handleNewPassword = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    if (value.length < 6) {
      setErrorNewPass(true);
    } else {
      setErrorNewPass(false);
    }
  };

  const submitChangePassword = async () => {
    if (
      currentPassword.length >= 6 &&
      newPassword.length >= 6 &&
      newPassword === repeatPassword
    ) {
      setLoading(true);
      const data = {
        currentPassword: currentPassword,
        password: newPassword,
        confirmPassword: repeatPassword,
      };
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_URL}/api/v1/user/updatePasswordUser`,
          data,
          {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          text: "Success Change Password , Go Login...",
          confirmButtonText: "Continue",
        }).then((result) => {
          if (result.isConfirmed) {
            Cookies.remove("auth-token");
            window.location.reload();
            window.location.href = "/login";
          }
        });
      } catch (e) {
        toast.error("the current password is not correct");
        setPasswordNotCorrect(true);
      }
      setLoading(false);
    }
  };

  return (
    <div className="setting flex relative">
      <ListAccount />
      <div className="p-8 w-full bg-[#f3f4f8]">
        <div>
          <h1 className="text-2xl font-semibold">Security Settings</h1>
          <div className="bg-white p-5 mt-6">
            <h2 className="text-lg font-semibold">Security</h2>
            <label className="text-gray-600 mt-4 block">Password</label>
            <div className="flex gap-4 mt-2">
              <input
                className="cursor-no-drop p-3 border-[1px] outline-none"
                value={"**************"}
                readOnly
              />

              <button
                onClick={changePassword}
                className="p-4 px-5 font-semibold border-[1px] rounded-md hover:text-white hover:bg-blue-600 "
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
      {change && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Change password</h2>

            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-3  text-gray-700">
                  Current password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={handleCurrentPassword}
                    placeholder="Please enter a password"
                    className={
                      !passwordNotCorrect
                        ? "w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        : "w-full px-4 py-2 border-red-500 border-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                    }
                    required
                  />
                </div>
                {errorCurrent && (
                  <p className="text-red-600 text-sm">
                    Passwords must be a minimum of 6 characters
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-3 text-gray-700">
                  New password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={handleNewPassword}
                    placeholder="Please enter a password"
                    className="w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                {errorNewPass && (
                  <p className="text-red-600 text-sm">
                    Passwords must be a minimum of 6 characters
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-3 text-gray-700">
                  Repeat new password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder="Please enter a password"
                    className="w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                {newPassword !== repeatPassword && (
                  <p className="text-red-600 text-sm">
                    repeat password is not equal new password
                  </p>
                )}
              </div>

              <button
                onClick={() => submitChangePassword()}
                className={
                  currentPassword.length < 6 ||
                  newPassword.length < 6 ||
                  newPassword !== repeatPassword
                    ? "w-full py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed mt-3"
                    : "w-full py-2 bg-blue-500 text-white rounded-md cursor-pointer mt-3"
                }
              >
                {loading ? (
                  <HashLoader color="#fff" size={"30"} />
                ) : (
                  "Update Password"
                )}
              </button>
            </div>

            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setChange(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Setting;
