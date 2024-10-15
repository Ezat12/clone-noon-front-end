import React from 'react'
import img_1 from "../../assets/Wrapper/1.avif"
import img_2 from "../../assets/Wrapper/2.avif"
import img_3 from "../../assets/Wrapper/3.avif"
import img_4 from "../../assets/Wrapper/4.avif"
import img_5 from "../../assets/Wrapper/5.avif"
import img_6 from "../../assets/Wrapper/6.avif"
import img_7 from "../../assets/Wrapper/7.avif"
import img_8 from "../../assets/Wrapper/8.avif"
import img_9 from "../../assets/Wrapper/9.avif"
import img_10 from "../../assets/Wrapper/10.avif"

function Wrapper() {
  return (
    <div className="wrapper bg-back_color">
      <div className="px-8 py-4">
        <div className="grid grid-cols-3 gap-2 ">
          <div className="more-reasons p-4 bg-white ">
            <h1 className="text-2xl font-semibold">More reasons to shop</h1>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <img src={img_1} alt="" />
              </div>
              <div>
                <img src={img_2} alt="" />
              </div>
              <div>
                <img src={img_3} alt="" />
              </div>
              <div>
                <img src={img_4} alt="" />
              </div>
            </div>
          </div>
          <div className="mega-deals p-4 bg-[#fdf6bb] ">
            <h1 className="text-2xl font-semibold">Mega deals</h1>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="relative">
                <p className="absolute overflow-hidden bg-main_color text-red-600 text-[12px] font-bold right-0 p-1 rounded-md">
                  Fashion deals
                </p>
                <div className="image bg-white flex items-center justify-center rounded-md">
                  <img className="w-[100px]" src={img_5} alt="" />
                </div>
                <div className="content bg-back_color p-2">
                  <span className="text-[15px]">Footwear & bags</span>
                  <h2 className=" font-bold">Up to 80% off</h2>
                </div>
              </div>
              <div className="relative">
                <p className="absolute overflow-hidden bg-main_color text-red-600 text-[12px] font-bold right-0 p-1 rounded-md">
                  Babu deals
                </p>
                <div className="image bg-white flex items-center justify-center rounded-md">
                  <img className="w-[100px]" src={img_6} alt="" />
                </div>
                <div className="content bg-back_color p-2">
                  <span className="text-[15px]">Bath & shin care</span>
                  <h2 className=" font-bold">Up to 35% off</h2>
                </div>
              </div>
              <div className="relative">
                <p className="absolute overflow-hidden bg-main_color text-red-600 text-[12px] font-bold right-0 p-1 rounded-md">
                  Gaming deals
                </p>
                <div className="image bg-white flex items-center justify-center rounded-md">
                  <img className="w-[100px]" src={img_7} alt="" />
                </div>
                <div className="content bg-back_color p-2">
                  <span className="text-[15px]">Sony Playstation 5slim</span>
                  <h2 className=" font-bold">Up to 10% off</h2>
                </div>
              </div>
              <div className="relative">
                <p className="absolute overflow-hidden bg-main_color text-red-600 text-[12px] font-bold right-0 p-1 rounded-md">
                  Fashion deals
                </p>
                <div className="image bg-white flex items-center justify-center rounded-md">
                  <img className="w-[100px]" src={img_8} alt="" />
                </div>
                <div className="content bg-back_color p-2">
                  <span className="text-[15px]">code:sport20</span>
                  <h2 className=" font-bold">By 2, get 20% off</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="in-focus bg-white p-4">
            <h1 className="text-2xl font-semibold">In Focus</h1>
            <div className='flex flex-col gap-3 mt-2'>
              <div className='rounded-lg'>
                <img className='w-full' src={img_9} />
              </div>
              <div className='rounded-lg'>
                <img className='w-full' src={img_10} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wrapper