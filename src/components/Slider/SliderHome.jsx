import React from "react";
import { Slide } from "react-slideshow-image";
import slider_1 from "../../assets/slider_1.avif";
import slider_2 from "../../assets/slider_2.avif";
import slider_3 from "../../assets/slider_3.avif";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import "react-slideshow-image/dist/styles.css";

const buttonStyle = {
  margin: "0px 20px",
  fontSize: "30px",
  color: "white",
  background: "rgba(255, 255, 255, 0.4)",
  padding: "10px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.4s",
};

const properties = {
  prevArrow: (
    <button className="hover:-translate-x-[15px]" style={{ ...buttonStyle }}>
      <AiOutlineDoubleLeft />
    </button>
  ),
  nextArrow: (
    <button className="hover:-translate-x-[-15px]" style={{ ...buttonStyle }}>
      <AiOutlineDoubleRight />
    </button>
  ),
};

function SliderHome() {
  return (
    <div className="slider px-8">
      <Slide {...properties}>
        <div>
          <img src={slider_1} alt="" />
        </div>
        <div>
          <img src={slider_2} alt="" />
        </div>
        <div>
          <img src={slider_3} alt="" />
        </div>
      </Slide>
    </div>
  );
}

export default SliderHome;
