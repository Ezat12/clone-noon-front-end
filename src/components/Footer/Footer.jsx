import React from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { HiOutlinePhone } from "react-icons/hi2";

function Footer() {
  return (
    <div className="footer mt-7 ">
      <div className="here-to py-7 px-10 bg-gray-100 border-y-2">
        <div className="flex items-center justify-between flex-wrap md:justify-center md:gap-5 md:text-center sm:justify-center sm:gap-5 sm:text-center">
          <div>
            <h1 className="font-semibold text-2xl mb-1">
              We're Always Here To Help
            </h1>
            <p className="text-gray-400 text-sm font-semibold">
              Reach out to us through any of these support channels
            </p>
          </div>
          <div className="flex items-center flex-wrap mt-5 lg:mt-0 gap-6 lg:gap-14">
            <a
              href="mailto:ezatelbery187@gmail.com"
              className="flex items-center gap-3 cursor-pointer hover:text-gray-500"
            >
              <div className="icon p-3 rounded-full bg-white">
                <MdOutlineMailOutline size={"22px"} />
              </div>
              <div className="content flex flex-col gap-1">
                <p className="text-gray-500 font-serif">EMAIL SUPPORT</p>
                <p className="text-lg font-semibold ">
                  ezatelbery187@gmail.com
                </p>
              </div>
            </a>
            <a
              href="tel:+201021453269"
              className="flex items-center gap-3 cursor-pointer hover:text-gray-500"
            >
              <div className="icon p-3 rounded-full bg-white">
                <HiOutlinePhone size={"22px"} />
              </div>
              <div className="content flex flex-col gap-1">
                <p className="text-gray-500 font-serif">PHONE SUPPORT</p>
                <p className="text-lg font-semibold">+201021453269</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
