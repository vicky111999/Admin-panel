import React, { useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { api } from "../../Axios/axios";
import { Eyeicon, SlashEyeicon } from "../Components/Svg";

const Otpreset = () => {
  const location = useLocation();
  const isemail = location?.state || "";
  const [searchparams] = useSearchParams();
  const paramsemail = searchparams.get('email')
const paramsotp = searchparams.get('otp')
  const [textorpass, settextorpass] = useState(false);
  const [error, setError] = useState({});
  const [formdata, setFormdata] = useState({
    email: isemail || paramsemail || "",
    otp: paramsotp || "",
    newpassword: "",
  });

  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
    setError({
      [e.target.name]: "",
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    let newerror = {};
    if (!formdata?.email) newerror.email = "Name is required";
    if (!formdata?.otp) newerror.otp = "otp is required";
    if (!formdata?.newpassword) newerror.newpassword = "password is required";
    if(formdata?.otp.length !== 6) newerror.otp = "otp only 6 digit"
    if (Object.keys(newerror).length > 0) {
      setError(newerror);
      return;
    }
    try {
      const res = await api.post("/user/resetpassword", formdata);
      alert(res.data.message);
    } catch (err) {
      newerror.otp = err.response.data.message;
      setError(newerror);
    }
  };
  return (
    <>
      <form
        onSubmit={handlesubmit}
        className=" min-h-screen px-[10px] py-[10px] md:px-[50px] md:py-[50px] lg:px-[300px] lg:py-[50px]"
      >
        <div className="flex items-center justify-center h-full px-[10px] py-[10px] md:px-[50px] md:py-[50px] lg:px-[100px] lg:py-[20px] gap-[10px] bg-[var(--primary-white)] shadow-[0_0_2px_rgba(0,0,0,0.2)] rounded-[30px]">
          <div className="flex flex-col  w-full">
            <h1 className="text-[28px] font-bold font-lato text-center">
              Reset Password
            </h1>
            <p className="text-[12px] font-lato font-semibold text-[var(--primary-text)] pb-[20px] text-center">
              No worries, we’ll send you reset instruction.
            </p>
            <label className="text-[14px] font-semibold">Email</label>
            <input
              className="border-1 border-[var(--primary-border)] w-full px-[10px] py-[8px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]"
              type="text"
              value={formdata?.email}
              placeholder="Email Address"
              name="email"
              onChange={handlechange}
            ></input>
            <p className={` ${error?.email ? "text-[#FF0000]" : "invisible"} `}>
              {error?.email || "placeholder"}
            </p>

            <label className="text-[14px] font-semibold">OTP</label>
            <input
              className="border-1 border-[var(--primary-border)] w-full px-[10px] py-[8px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]"
              type="text"
              value={formdata?.otp}
              placeholder="Email OTP"
              name="otp"
              onChange={handlechange}
            ></input>
            <p className={` ${error?.otp ? "text-[#FF0000]" : "invisible"} `}>
              {error?.otp || "placeholder"}
            </p>

            <label className="text-[14px] font-semibold">New Password</label>
            <div className="eyeicon">
              <input
                className="border-1 border-[var(--primary-border)] w-full px-[10px] py-[8px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]"
                type={textorpass ? "text" : "password"}
                value={formdata?.newpassword}
                placeholder="New Password"
                name="newpassword"
                onChange={handlechange}
              ></input>
              <p
                className={` ${error?.newpassword ? "text-[#FF0000]" : "invisible"} `}
              >
                {error?.newpassword || "placeholder"}
              </p>

              {!textorpass ? (
                <SlashEyeicon
                  className="eyeicon-align"
                  clicked={() => {
                    settextorpass((prev) => !prev);
                  }}
                />
              ) : (
                <Eyeicon
                  className="eyeicon-align"
                  clicked={() => {
                    settextorpass((prev) => !prev);
                  }}
                />
              )}
            </div>

            <button
              className="w-full px-[10px] py-[8px] rounded-[8px] bg-[var(--primary-violet)] text-[var(--primary-white)] text-[16px] font "
              type="submit"
            >
              Reset Password
            </button>
            <NavLink
              className="text-[var(--primary-violet)] text-[12px] font-semibold text-center"
              to="/login"
            >
              Back to login
            </NavLink>
          </div>
        </div>
      </form>
    </>
  );
};

export default Otpreset;
