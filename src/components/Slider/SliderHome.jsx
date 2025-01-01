import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import slider_1 from "../../assets/slider_1.avif";
import slider_2 from "../../assets/slider_2.avif";
import slider_3 from "../../assets/slider_3.avif";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import "react-slideshow-image/dist/styles.css";

const buttonStyle = {
  margin: "0px 20px",
  fontSize:
    window.innerWidth <= 990
      ? "20px"
      : window.innerWidth <= 770
      ? "10px"
      : "30px",
  color: "white",
  background: "rgba(255, 255, 255, 0.4)",
  padding: "10px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.4s",
};


function SliderHome() {
  const [buttonFontSize, setButtonFontSize] = useState("30px");

  const updateButtonFontSize = () => {
    if (window.innerWidth <= 990 && window.innerWidth > 770) {
      setButtonFontSize("20px");
    } else if (window.innerWidth <= 770 && window.innerWidth > 570) {
      setButtonFontSize("10px");
    } else if (window.innerWidth <= 570) {
      setButtonFontSize("5px");
    } else {
      setButtonFontSize("30px");
    }
  };

  useEffect(() => {
    // Set initial font size based on screen width
    updateButtonFontSize();

    // Update font size on window resize
    window.addEventListener("resize", updateButtonFontSize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", updateButtonFontSize);
  }, []);

  const buttonStyle = {
    margin: "0px 20px",
    fontSize: buttonFontSize,
    color: "white",
    background: "rgba(255, 255, 255, 0.4)",
    padding: window.innerWidth <= 670  ? "4px" : "10px",
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

  return (
    <div className="slider lg:px-8 md:px-8 px-0">
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
