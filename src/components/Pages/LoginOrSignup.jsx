import React, { useEffect } from "react";
import login_img from "../../assets/login image.txt";
import "./Css/LoginOrSignup.css";
import { useState } from "react";
import { LuMoveRight } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { toast } from "react-toastify";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import Cookies from "js-cookie";
import { userData } from "../../toolKit/user/userSlice";
import { addWishlist } from "../../toolKit/wishlist/wishlistSlice";
import { addCart } from "../../toolKit/cart/cartSlice";

function LoginOrSignup() {
  const [Continue, setContinue] = useState("Login");
  const [accept, setAccept] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get("auth-token")) {
      toast.error("You are login Already");
      navigator("/");
    }
  }, []);

  // Click Login   ###################
  const login = async () => {
    setAccept(true);

    if (email && password) {
      const data = { email, password };
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/api/v1/login`,
          data
        );
        if (response.data.data.role === "admin") {
          const token = response.data.token;
          Cookies.set("auth-token", token);
          dispatch(userData(response.data.data));
          navigator("/admin");
          location.reload("/");
        } else {
          const token = response.data.token;
          Cookies.set("auth-token", token);
          dispatch(userData(response.data.data));
          navigator("/");
          // location.reload("/");
        }

        //  wishlist and cart

        // Push Wishlist User =============================
        const responseWishlist = await axios.get(
          `${import.meta.env.VITE_URL}/api/v1/wishlist`,
          { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
        );
        const wishlistUser = responseWishlist.data.wishlistUser;
        wishlistUser.map((wishlist) => {
          dispatch(addWishlist(wishlist));
        });

        // Push Cart User ==============================
        const responseCart = await axios.get(
          `${import.meta.env.VITE_URL}/api/v1/cart`,
          { headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } }
        );

        const cartUser = responseCart.data.data.cartItem;
        cartUser.map((item) => {
          dispatch(addCart(item));
        });
      } catch (e) {
        setLoading(false);
        toast.error("incorrect email or password");
      }
    }
  };

  // Click Signup  ##########################3
  const signup = async () => {
    let validatorAll = false;
    setAccept(true);
    if (
      name &&
      email &&
      password &&
      confirmPassword &&
      password.length >= 6 &&
      password === confirmPassword
    ) {
      const validatorEmail = validator.isEmail(email);

      if (!validatorEmail) {
        toast.error("Invalid Email", {
          position: "top-center",
          duration: 3000,
        });
      } else {
        validatorAll = true;
      }
    }

    if (validatorAll) {
      const data = { name, email, password, passwordConfirm: confirmPassword };

      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/api/v1/signup`,
          data
        );
        const token = response.data.token;
        Cookies.set("auth-token", token);
        dispatch(userData(response.data.data));
        navigator("/");
        location.reload("/");
      } catch (e) {
        setLoading(false);
        const error = e.response.data.error[0].msg.split("=")[0];
        toast.error(error);
      }
    }
  };

  return (
    <div className="login mt-6">
      {loading && (
        <div className="absolute top-0 w-full h-full bg-[#ced2dc75]">
          <BeatLoader className="absolute top-[50%] left-[50%]" />
        </div>
      )}
      <div className="content flex items-center justify-around">
        <div className="field m-11 p-5 shadow-lg w-[500px]">
          <h1 className="font-bold text-4xl text-start my-6">{Continue}</h1>
          <form className="flex flex-col gap-2">
            {Continue === "Sign Up" && (
              <div className="flex gap-1 flex-col">
                <label htmlFor="name">Name:</label>
                <input
                  className={
                    name === "" && accept ? "border-2 border-rose-500" : null
                  }
                  id="name"
                  type="text"
                  placeholder="Enter You Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {name.length < 2 && accept && (
                  <p className="text-red-500 ml-4 text-[14px] ">
                    The name must be at least 3 letters
                  </p>
                )}
              </div>
            )}
            <div className="flex gap-1 flex-col">
              <label htmlFor="email">Email:</label>
              <input
                className={
                  email === "" && accept ? "border-2 border-rose-500" : null
                }
                id="email"
                type="email"
                placeholder="Enter You Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field-password flex gap-3">
              <div className="flex-[50%] flex gap-1 flex-col">
                <label htmlFor="password">Password:</label>
                <input
                  className={
                    password === "" && accept
                      ? "border-2 border-rose-500 w-full"
                      : "w-full"
                  }
                  id="password"
                  type="password"
                  placeholder="Enter You Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password.length < 6 && accept && Continue === "Sign Up" && (
                  <p className="text-red-500 ml-4 text-[14px] ">
                    password must be at least 6 char
                  </p>
                )}
              </div>
              {Continue === "Sign Up" ? (
                <div className="flex-[50%] flex gap-1 flex-col">
                  <label htmlFor="confirm">Confirm Password:</label>
                  <input
                    id="confirm"
                    className={
                      confirmPassword === "" && accept
                        ? "border-2 border-rose-500 w-full"
                        : "w-full "
                    }
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {password !== confirmPassword ? (
                    <p className="text-red-500 ml-4 text-[14px] ">
                      password not confirm
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </form>
          <div className="text-center mt-6 flex items-center justify-center">
            <button
              onClick={() => (Continue === "Sign Up" ? signup() : login())}
              className="bg-[#689fff] text-white px-4 py-2 rounded-lg text-[20px] flex gap-3 items-center "
            >
              {Continue}
              <LuMoveRight />
            </button>
          </div>
          {Continue === "Login" ? (
            <p className="text-center mt-5 text-gray-400">
              I don’t have an account ?{" "}
              <span
                onClick={() => setContinue("Sign Up")}
                className="text-[#F47458] font-bold cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="text-center mt-5 text-gray-400">
              I have an account ?{" "}
              <span
                onClick={() => setContinue("Login")}
                className="text-[#F47458] font-bold cursor-pointer"
              >
                Login
              </span>
            </p>
          )}
          <div className="forgot-password flex items-center gap-4 justify-center mt-2">
            <span className="text-sm font-semibold">help:</span>
            <Link
              to={"forgot-password"}
              className="font-semibold text-[#ffa490] hover:text-[#F47458]"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        <div className="image">
          <img className="w-[500px]" src={login_img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default LoginOrSignup;
