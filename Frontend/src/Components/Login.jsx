import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eyeicon, Facebookicon, Googleicon, SlashEyeicon } from "./Svg";
import { api } from "../../Axios/axios";
import '../style/login.css'
// import { UseAuth } from "../Context/UseAuth";

const Login = () => {
    const [textorpass,settextorpass] = useState(false)
  const [error, setError] = useState({});
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    roleid: 2,
  });
  const navigate = useNavigate()
  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name] :''
    })
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
      const res = await api.post("/user/login", formdata);
      const tokendetail = res.data.data
      localStorage.setItem("token",JSON.stringify(tokendetail))
       setFormdata({
      ...formdata,
      [e.target.name]: '',
    });
    navigate('/admin')
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
    <div className="h-screen flex justify-center px-[25px] py-[20px] md:px-[10px] md:py-[9px] lg:px-[10px] lg:py-[9px] xl:px-[20px] xl:py-[9px]">
     <div className=" grid grid-cols-1 md:grid-cols-2 w-full h-full px-[20px] py-[20px]  shadow-[0_0_2px_rgba(0,0,0,0.2)] rounded-[30px] bg-[var(--primary-white)]">
      <div className="flex items-center justify-center h-full">
    <form onSubmit={handlesubmit} className="md:w-[200px] lg:w-[250px] xl:w-[350px]">
      <h1 className="text-[15px] md:text-[20px] lg:text-[28px] font-bold font-lato">Login</h1>
      <p className="text-[12px] font-lato font-semibold text-[var(--primary-text)] md:pb-[5px]  lg:pb-[20px]">
        How do i get started lorem ipsum dolor at?
      </p>
      <div className="flex flex-col ">
        <label className="text-[14px] font-semibold">Email</label>
        <input
          className="border-1 border-[var(--primary-border)] w-full px-[5px] py-[4px] md:px-[5px] md:py-[4px] xl:px-[10px] xl:py-[8px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]"
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
         <div className="eyeicon">
                  <input
                    className="border-1 border-[var(--primary-border)] w-full px-[5px] py-[4px] md:px-[5px] md:py-[4px] xl:px-[10px] xl:py-[8px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]"
                    type={textorpass ?"text":"password"}
                    value={formdata?.password}
                    placeholder="Password"
                    name="password"
                    onChange={handlechange}
                  ></input>
                  <p
                    className={` ${error?.password ? "text-[#FF0000]" : "invisible"} `}
                  >
                    {error?.password || "placeholder"}
                  </p>
        
               {!textorpass ?  <SlashEyeicon className="eyeicon-align" clicked={()=>{settextorpass((prev)=>!prev)}} />:<Eyeicon className="eyeicon-align" clicked={()=>{settextorpass((prev)=>!prev)}} /> }
                </div>
                <div className="flex flex-col gap-[10px]">       <NavLink
          className="text-[var(--primary-violet)] text-[14px]  font-semibold text-right"
          to="/forgotpassword"
        >
          Forgot password
        </NavLink>
        <button
          className="w-full px-[5px] py-[4px] md:px-[5px] md:py-[4px] xl:px-[10px] xl:py-[8px] rounded-[8px] bg-[var(--primary-violet)] text-[var(--primary-white)] text-[16px] font "
          type="submit"
        >
          Login
        </button>
        <button
          className="w-full px-[5px] py-[4px] md:px-[5px] md:py-[4px] xl:px-[10px] xl:py-[8px] border-1 border-[var(--primary-border)]  rounded-[24px] bg-[var(--primary-white)] text-[var(--primary-black)] text-[16px] flex items-center justify-center gap-2 "
          type="submit"
        >
          <Googleicon />
          <span>Sign in with Google</span>
        </button>
        <button
          className="w-full px-[5px] py-[4px] md:px-[5px] md:py-[4px] xl:px-[10px] xl:py-[8px] border-1 border-[var(--primary-border)] rounded-[24px] bg-[var(--primary-white)] text-[var(--primary-black)] text-[16px] flex items-center justify-center gap-2 "
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
 
      </div>
    </form>
     </div>
     <div className="floatingimg hidden h-full md:pt-[65px] md:pl-[45px] lg:pt-[50px] lg:pl-[40px] xl:pt-[50px] xl:pl-[100px]  md:block bg-[var(--primary-violet)] rounded-[15px]">
            <p className=" verticalbar text-[20px] md:text-[25px] lg:text-[33px] xl:text-[38px] font-lato font-bold text-[var(--primary-white)] pb-[20px]">
              Very good works are <br/>waiting for you<br/> Sign up Now
            </p>
          </div>
           </div>
    </div>
  );
};

export default Login;
