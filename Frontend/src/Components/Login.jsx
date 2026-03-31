import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Facebookicon, Googleicon } from "./Svg";
import { api } from "../../Axios/axios";

const Login = () => {
  const [error, setError] = useState({});
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    roleid: 2,
  });
  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    let newerror = {};
    if (!formdata?.email) newerror.email = "Email is required";
    if (!formdata?.password) newerror.password = "Password is required";
    if (Object.keys(newerror).length > 0) {
      setError(newerror);
      return;
    }
    try {
      const res = await api.post("/auth/login", formdata);
      localStorage.setItem("token",res.data.token)
    } catch (err) {
      if (err.status === 404) {
        newerror.email = err.response.data.message;
        setError(newerror);
      }
      if (err.status === 401) {
        newerror.password = err.response.data.message;
        setError(newerror);
      }
    }
  };
  return (
    <form onSubmit={handlesubmit} className="w-full">
      <h1 className="text-[28px] font-bold font-lato">Login</h1>
      <p className="text-[12px] font-lato font-semibold text-[var(--primary-text)] pb-[20px]">
        How do i get started lorem ipsum dolor at?
      </p>
      <div className="flex flex-col gap-[10px]">
        <label className="text-[14px] font-semibold">Email</label>
        <input
          className="border-1 border-[var(--primary-border)] w-full px-[15px] py-[13px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]"
          type="text"
          value={formdata?.email}
          placeholder="Email Address"
          name="email"
          onChange={handlechange}
        ></input>
        <p className={` ${error?.email ? "text-[#FF0000]" : "invisible"} `}>
          {error?.email || "placeholder"}
        </p>

        <label className="text-[14px] font-semibold">Password</label>
        <input
          className="border-1 border-[var(--primary-border)] w-full px-[15px] py-[13px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]"
          type="password"
          value={formdata?.password}
          placeholder="Password"
          name="password"
          onChange={handlechange}
        ></input>
        <p className={` ${error?.password ? "text-[#FF0000]" : "invisible"} `}>
          {error?.password || "placeholder"}
        </p>

        <NavLink
          className="text-[var(--primary-violet)] text-[14px] font-semibold text-right"
          to="/forgotpassword"
        >
          Forgot password
        </NavLink>
        <button
          className="w-full px-[15px] py-[13px] rounded-[8px] bg-[var(--primary-violet)] text-[var(--primary-white)] text-[16px] font "
          type="submit"
        >
          Login
        </button>
        <button
          className="w-full px-[10px] py-[9px] md:px-[15px] md:py-[13px] border-1 border-[var(--primary-border)]  rounded-[24px] bg-[var(--primary-white)] text-[var(--primary-black)] text-[16px] flex items-center justify-center gap-2 "
          type="submit"
        >
          <Googleicon />
          <span>Sign in with Google</span>
        </button>
        <button
          className="w-full px-[10px] py-[9px] md:px-[15px] md:py-[13px] border-1 border-[var(--primary-border)] rounded-[24px] bg-[var(--primary-white)] text-[var(--primary-black)] text-[16px] flex items-center justify-center gap-2 "
          type="submit"
        >
          <Facebookicon />
          <span>Sign in with Facebook</span>
        </button>
        <p className=" text-center">
          <span className="text-[var(--primary-text)] text-[12px] font-semibold">
            Already a member?
          </span>
          <NavLink
            className="text-[var(--primary-violet)] text-[12px] font-semibold"
            to="/login"
          >
            Sign in
          </NavLink>
        </p>
      </div>
    </form>
  );
};

export default Login;
