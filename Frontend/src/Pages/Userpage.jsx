import React from "react";
import { useLocation } from "react-router-dom";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import { Xlineicon, Ylineicon } from "../Components/Svg";
import '../style/signup.css'

const Userpage = () => {
  const location = useLocation();
  const sign = location.pathname === "/login";
  return (
    <div className="p-[40px]">
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:gap-[70px] w-full shadow-[0_0_2px_rgba(0,0,0,0.2)] rounded-[30px] bg-[var(--primary-white)] p-5">
      <div className="flex items-center justify-center sm:px-[20px] sm:py-[10px] lg:px-[80px] lg:py-[70px]">
        {sign ? <Login /> : <Signup />}
      </div>
      <div className="floatingimg hidden  md:flex flex-col bg-[var(--primary-violet)]  rounded-[15px]  pt-[70px] pl-[50px] md:h-full lg:h-[750px]">
        <p className=" text-[15px] sm:text-[20px] lg:text-[30px] xl:text-[40px] font-lato font-bold text-[var(--primary-white)] pb-[20px]">
          Very good works are <br/>waiting for you<br/> Sign up Now
        </p>
        <div className="flex justify-between h-full w-full">
        <div className="flex flex-col h-full justify-between pb-[50px]">
          <Ylineicon />
          <Xlineicon/>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Userpage;
