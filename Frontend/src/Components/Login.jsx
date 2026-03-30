import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Facebookicon, Googleicon } from "./Svg";

const Login = () => {
    const [formdata, setFormdata] = useState({
      name: "",
      email: "",
      password: "",
    });
    const handlechange = (e) => {
      setFormdata({
        ...formdata,
        [e.target.name]: e.target.value,
      });
    };
    const handlesubmit = (e) => {
      e.preventDefault();
    };
 return (
  <form onSubmit={handlesubmit} className="w-full">
     <h1 className='text-[28px] font-bold font-lato'>Login</h1>
      <p className='text-[12px] font-lato font-semibold text-[var(--primary-text)] pb-[20px]'>How do i get started lorem ipsum dolor at?</p>
      <div className='flex flex-col gap-[20px]'>
      <label className="text-[14px] font-semibold">Email</label>
      <input
      className='border-1 border-[var(--primary-border)] w-full px-[15px] py-[13px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]'

        type="text"
        value={formdata?.email}
        placeholder="Email Address"
        name="email"
        onChange={handlechange}
      ></input>
      <label className="text-[14px] font-semibold">Password</label>
      <input
      className='border-1 border-[var(--primary-border)] w-full px-[15px] py-[13px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]'

        type="text"
        value={formdata?.password}
        placeholder="Password"
        name="password"
        onChange={handlechange}
      ></input>
      <NavLink className='text-[var(--primary-violet)] text-[14px] font-semibold text-right' to='/forgotpassword'>Forgot password</NavLink>
<button className='w-full px-[15px] py-[13px] rounded-[8px] bg-[var(--primary-violet)] text-[var(--primary-white)] text-[16px] font ' type="submit">Sign in</button>
<button className='w-full px-[10px] py-[9px] md:px-[15px] md:py-[13px] border-1 border-[var(--primary-border)]  rounded-[24px] bg-[var(--primary-white)] text-[var(--primary-black)] text-[16px] flex items-center justify-center gap-2 ' type="submit"><Googleicon/><span>Sign in with Google</span></button>
<button className='w-full px-[10px] py-[9px] md:px-[15px] md:py-[13px] border-1 border-[var(--primary-border)] rounded-[24px] bg-[var(--primary-white)] text-[var(--primary-black)] text-[16px] flex items-center justify-center gap-2 ' type="submit"><Facebookicon/><span>Sign in with Facebook</span></button>
 <p className=' text-center'><span className='text-[var(--primary-text)] text-[12px] font-semibold'>Already a member?</span><NavLink className='text-[var(--primary-violet)] text-[12px] font-semibold' to='/login'>Sign in</NavLink></p>
</div>

  </form>
 )
};

export default Login;
