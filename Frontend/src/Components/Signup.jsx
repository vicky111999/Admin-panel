import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Eyeicon } from './Svg';

const Signup = () => {
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
    <form onSubmit={handlesubmit} className='w-full'>
      <h1 className='text-[28px] font-bold font-lato'>Sign up</h1>
      <p className='text-[12px] font-lato font-semibold text-[var(--primary-text)] pb-[20px]'>Start your 30-day free trial.</p>
      <div className='flex flex-col gap-[20px]'>
      <input
      className='border-1 border-[var(--primary-border)] w-full px-[15px] py-[13px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]'
        type="text"
        value={formdata?.name}
        placeholder="Full Name"
        name="name"
        onChange={handlechange}
      ></input>
      <input
      className='border-1 border-[var(--primary-border)] w-full px-[15px] py-[13px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]'

        type="text"
        value={formdata?.email}
        placeholder="Email Address"
        name="email"
        onChange={handlechange}
      ></input>
      <div className='eyeicon'>
      <input
      className='border-1 border-[var(--primary-border)] w-full px-[15px] py-[13px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]'

        type="text"
        value={formdata?.password}
        placeholder="Password"
        name="password"
        onChange={handlechange}
      ></input>
      <Eyeicon className="eyeicon-align"/>
      </div>
      </div>
      <p className='text-[12px] text-[var(--primary-link)] pb-[20px] pt-[20px]'>You are agreeing to the <span className='text-[var(--primary-violet)]'>Terms of Services</span><br/> and <span  className='text-[var(--primary-violet)]'>Privacy Policy</span></p>
      <button className='w-full px-[15px] py-[13px] rounded-[8px] bg-[var(--primary-violet)] text-[var(--primary-white)] text-[16px] font ' type="submit">Get started</button>
      <p className='pt-[20px]'><span className='text-[var(--primary-text)] text-[12px] font-semibold'>Already a member?</span><Link className='text-[var(--primary-violet)] text-[12px] font-semibold' to='/login'>Sign in</Link></p>
    </form>
  );
}

export default Signup