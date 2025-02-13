import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

function Scroll() {
  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll">
      {backToTop && (
        <span
          onClick={scrollTop}
          className="fixed bottom-24 right-3 p-4 rounded-full flex items-center justify-center z-[200] bg-blue-500 cursor-pointer"
        >
          <FaChevronUp color="#fff" />
        </span>
      )}
    </div>
  );
}

export default Scroll;
