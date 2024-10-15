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
  background: "#cacaca66",
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

function SliderImg(props) {
  const { images } = props;

  return (
    <div className="slider px-8">
      <Slide {...properties}>
        {images.map((img, index) => {
          return (
            <div key={index}>
              <img src={img} />
            </div>
          );
        })}
      </Slide>
    </div>
  );
}

export default SliderImg;
