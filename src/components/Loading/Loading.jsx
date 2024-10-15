import React from "react";
import { BeatLoader } from "react-spinners";

function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-[#ffffffab]">
      {" "}
      <BeatLoader color="#3866df" className="absolute top-[50%] left-[50%]" />
    </div>
  );
}

export default Loading;
