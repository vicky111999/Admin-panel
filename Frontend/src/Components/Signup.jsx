import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eyeicon, SlashEyeicon } from "./Svg";
import { api } from "../../Axios/axios";

const Signup = () => {
  const [textorpass,settextorpass] = useState(false)
  const [error, setError] = useState({});
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    roleid: 3,
  });
  const navigate = useNavigate()
  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
    setError({
      [e.target.name]: "",
    });
  };
  const handlesubmit = async(e) => {
    e.preventDefault();
    let newerror = {};
    if (!formdata?.name) newerror.name = "Name is required";
    if (!formdata?.email) newerror.email = "Email is required";
    if (!formdata?.password) newerror.password = "Password is required";
    const passwordRegexLowercase = /^(?=.*[a-z])[A-Za-z\d!@#$%^&*]+$/;
    const passwordRegexUppercase = /^(?=.*[A-Z])[A-Za-z\d!@#$%^&*]+$/;
    const passwordRegexdigit = /^(?=.*\d)[A-za-z\d!@#$%^&*]+$/;
    const passwordRegexSymbol = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formdata?.email && !emailRegex.test(formdata?.email)) {
      newerror.email = "Invalid Email format";
    }

    if (formdata?.password) {
      if (!passwordRegexUppercase.test(formdata?.password)) {
        newerror.password = "Must includes uppercase";
      } else if (!passwordRegexLowercase.test(formdata?.password)) {
        newerror.password = "Must includes lowercase";
      } else if (!passwordRegexdigit.test(formdata?.password)) {
        newerror.password = "Must includes number";
      } else if (!passwordRegexSymbol.test(formdata?.password)) {
        newerror.password = "Must includes symbol";
      } else if (formdata?.password.length < 8) {
        newerror.password = "Atleast 8 characters";
      }
    }
    if (Object.keys(newerror).length > 0) {
      setError(newerror);
      return;
    }
    try {
      const res = await api.post('/user/register',formdata)
      if(res.data.status === true){
        alert(res.data.message)
         setFormdata({
      ...formdata,
      [e.target.name]: '',
    });
        navigate('/login')
      }
    } catch (err) {
      newerror.email = err.response.data.message
      setError(newerror)
    }
  };
  return (
    <div className="h-screen flex justify-center px-[25px] py-[20px] md:px-[25px] md:py-[20px] lg:px-[40px] lg:py-[30px] xl:px-[30px] xl:py-[40px]">
     <div className=" grid grid-cols-1 md:grid-cols-2 w-full h-full px-[20px] py-[20px]  shadow-[0_0_2px_rgba(0,0,0,0.2)] rounded-[30px] bg-[var(--primary-white)]">
      <div className="flex items-center justify-center h-full">
    <form onSubmit={handlesubmit} className=" md:w-[200px] lg:w-[250px] xl:w-[350px]">
      <h1 className="text-[15px] md:tex-[18px] lg:text-[20px] xl:text-[38px] font-bold font-lato">Sign up</h1>
      <p className="text-[12px]  font-lato font-semibold text-[var(--primary-text)] pb-[10px] lg:pb-[15px] xl:pb-[20px]">
        Start your 30-day free trial.
      </p>
      <div className="flex flex-col ">
        <input
          className="border-1 border-[var(--primary-border)] px-[5px] py-[4px] md:px-[5px] md:py-[4px] xl:px-[10px] xl:py-[8px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]"
          type="text"
          value={formdata?.name}
          placeholder="Full Name"
          name="name"
          onChange={handlechange}
        ></input>
        <p className={` ${error?.name ? "text-[#FF0000]" : "invisible"} `}>
          {error?.name || "placeholder"}
        </p>
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
      </div>
      <p className="font-semibold text-[12px] text-[var(--primary-link)]  pb-[10px]  md:pb-[5px] lg:pb-[20px] xl:pb-[20px] ">
        You are agreeing to the
        <span className="font-semibold text-[12px] text-[var(--primary-violet)]">Terms of Services</span>
        <br /> and
        <span className="font-semibold text-[12px] text-[var(--primary-violet)]">Privacy Policy</span>
      </p>
      <button
        className="w-full px-[5px] py-[4px] md:px-[5px] md:py-[4px] xl:px-[10px] xl:py-[8px] rounded-[8px] bg-[var(--primary-violet)] text-[var(--primary-white)] text-[16px] font "
        type="submit"
      >
        Get started
      </button>
      <p className="pt-[10px]">
        <span className="font-lato text-[var(--primary-text)] text-[12px] font-semibold">
          Already a member?
        </span>
        <Link
          className="text-[var(--primary-violet)] text-[12px] font-semibold"
          to="/login"
        >
          Sign in
        </Link>
      </p>
    </form>
    </div>
     <div className="floatingimg hidden h-full md:pt-[45px] md:pl-[45px] lg:pt-[50px] lg:pl-[40px] xl:pt-[50px] xl:pl-[100px]  md:block bg-[var(--primary-violet)] rounded-[15px]">
            <p className=" verticalbar text-[20px] md:text-[25px] lg:text-[33px] xl:text-[38px] font-lato font-bold text-[var(--primary-white)] pb-[20px]">
              Very good works are <br/>waiting for you<br/> Sign up Now
            </p>
          </div>
           </div>
    </div>
  );
};

export default Signup;
