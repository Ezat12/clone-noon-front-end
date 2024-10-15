import axios from "axios";
import React, { useState } from "react";
import { LuArrowLeftCircle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const handleArrow = (e) => {
    if (+e.currentTarget.parentNode.id === 1) {
      navigator("/login");
    } else if (+e.currentTarget.parentNode.id === 2) {
      const dev = document.getElementById("1");
      dev.classList.remove("hidden");
      e.currentTarget.parentNode.classList.add("hidden");
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    if (email) {
      setEmailError(false);
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/api/v1/forgotPassword`,
          { email }
        );
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "We've found the e-mail.",
          text: "Click Continue and write code",
          confirmButtonText: "Continue",
        });
        // next page ========
        const dev = document.getElementById("2");
        dev.classList.remove("hidden");
        const dev1 = document.getElementById("1");
        dev1.classList.add("hidden");
      } catch (e) {
        toast.error("check email");
        setEmailError(true);
        setLoading(false);
      }
    }
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    if (code) {
      try {
        setCodeError(false);
        setLoading(true);
        const data = { restCode: code };
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/api/v1/verifyRestCode`,
          data
        );
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Code is Correct",
          text: "Click Continue To Change Password",
          confirmButtonText: "Continue",
        });

        const dev = document.getElementById("3");
        dev.classList.remove("hidden");
        const dev1 = document.getElementById("2");
        dev1.classList.add("hidden");
      } catch (e) {
        setCodeError(true);
        setLoading(false);
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (password < 6) {
      toast.error("The Password too short");
    } else {
      try {
        setLoading(true);
        const data = { email, newPassword: password };
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/api/v1/restPassword`,
          data
        );
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          text: "Success Change Password , Go Login...",
          confirmButtonText: "Continue",
        }).then((result) => {
          if (result.isConfirmed) {
            navigator("/login");
          }
        });
      } catch (e) {
        toast.error("Some Thing Error");
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center relative justify-center min-h-[80vh] bg-gray-100">
      <div
        id="1"
        className="relative add-email bg-white shadow-md rounded-md p-8 max-w-md w-full "
      >
        <div
          onClick={handleArrow}
          className="absolute text-2xl cursor-pointer left-5"
        >
          <LuArrowLeftCircle />
        </div>
        <h1 className="text-2xl font-semibold text-center mb-4">Welcome</h1>
        <p className="text-gray-600 text-center mb-6">
          Please enter your email to get.
        </p>

        <form onSubmit={handleSubmitEmail}>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="email"
          >
            Your work email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            placeholder="nick@acme.com"
            required
          />
          {emailError && (
            <p className="mb-4 -mt-3 p-2 bg-[#f7788e] text-white rounded-md">
              email is not correct
            </p>
          )}

          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
            {!loading ? "Continue" : <HashLoader color="#ffff" size={"30"} />}
          </button>
        </form>
      </div>
      <div
        id="2"
        className="relative add-email bg-white shadow-md rounded-md p-8 max-w-md w-full hidden"
      >
        <div
          onClick={handleArrow}
          className="absolute text-2xl cursor-pointer left-5"
        >
          <LuArrowLeftCircle />
        </div>
        <h1 className="text-2xl font-semibold text-center mb-4">
          Enter The Code{" "}
        </h1>
        <p className="text-gray-600 text-center mb-6">
          We sent you a code on the email
        </p>
        <form onSubmit={handleSubmitCode}>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="code"
          >
            code:
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            placeholder="Enter the 6-digit code*"
            required
          />
          {codeError && (
            <p className="mb-4 -mt-3 p-2 bg-[#f7788e] text-white rounded-md">
              code invalid
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {!loading ? "Continue" : <HashLoader color="#ffff" size={"30"} />}
          </button>
        </form>
      </div>
      <div
        id="3"
        className="relative add-email bg-white shadow-md rounded-md p-8 max-w-md w-full hidden"
      >
        <div
          onClick={handleArrow}
          className="absolute text-2xl cursor-pointer left-5"
        >
          <LuArrowLeftCircle />
        </div>
        <h1 className="text-2xl font-semibold text-center mb-4">
          Reset your Password
        </h1>
        <form onSubmit={handleChangePassword}>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="emailChange"
          >
            email:
          </label>
          <input
            id="emailChange"
            type="email"
            value={email}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          />
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="newPassword"
          >
            new password:
          </label>
          <input
            id="newPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            placeholder="Enter new password"
            required
          />
          {codeError && (
            <p className="mb-4 -mt-3 p-2 bg-[#f7788e] text-white rounded-md">
              code invalid
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {!loading ? "Continue" : <HashLoader color="#ffff" size={"30"} />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
