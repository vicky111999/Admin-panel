import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { api } from '../../Axios/axios';

const Otpreset = () => {
  const location = useLocation()
            const isemail = location?.state || ''
    const [error,setError] = useState({})
     const [formdata, setFormdata] = useState({
              email: isemail || '',
              otp: "",
              newpassword: "",
            });
            
            const handlechange = (e) => {
              setFormdata({
                ...formdata,
                [e.target.name]: e.target.value,
              });
              setError({
                [e.target.name] : ''
              })
            };
            const handlesubmit = async(e) => {
              e.preventDefault();
              let newerror={}
              if(!formdata?.email) newerror.email = "Name is required"
              if(!formdata?.otp) newerror.otp = "otp is required"
              if(!formdata?.newpassword) newerror.newpassword = "password is required"
              if(Object.keys(newerror).length > 0)
              {
                setError(newerror)
                return;
              }
              try{
                const res = await api.post('/auth/resetpassword',formdata)
                alert(res.data.message)
              }
              catch(err){
                console.log(err.response)
                newerror.otp = err.response.data.message
                setError(newerror)
              }
            };
  return (
<>
<form onSubmit={handlesubmit} className='px-[10px] py-[10px] md:px-[50px] md:py-[50px] lg:px-[200px] lg:py-[100px]'>
    <div className='flex items-center justify-center px-[10px] py-[10px] md:px-[50px] md:py-[50px] lg:px-[200px] lg:py-[100px] gap-[10px] bg-[var(--primary-white)] shadow-[0_0_2px_rgba(0,0,0,0.2)] rounded-[30px]'>
        <div className='flex flex-col gap-[10px] w-full'>
    <h1 className='text-[28px] font-bold font-lato text-center'>Reset Password</h1>
      <p className='text-[12px] font-lato font-semibold text-[var(--primary-text)] pb-[20px] text-center'>No worries, we’ll send you reset instruction.</p>
  <label className="text-[14px] font-semibold">Email</label>
      <input
      className='border-1 border-[var(--primary-border)] w-full px-[15px] py-[13px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]'

        type="text"
        value={formdata?.email}
        placeholder="Email Address"
        name="email"
        onChange={handlechange}
      ></input>
      <p className={` ${error?.email ? 'text-[#FF0000]' : 'invisible'} `}>{error?.email || 'placeholder'}</p>

      <label className="text-[14px] font-semibold">OTP</label>
      <input
      className='border-1 border-[var(--primary-border)] w-full px-[15px] py-[13px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]'

        type="text"
        value={formdata?.otp}
        placeholder="Email OTP"
        name="otp"
        onChange={handlechange}
      ></input>
      <p className={` ${error?.otp ? 'text-[#FF0000]' : 'invisible'} `}>{error?.otp || 'placeholder'}</p>

      <label className="text-[14px] font-semibold">New Password</label>
      <input
      className='border-1 border-[var(--primary-border)] w-full px-[15px] py-[13px] rounded-[8px]  bg-[var(--primary-gray)] pl-5 placeholder:font-medium  placeholder:text-[14px]'

        type="text"
        value={formdata?.newpassword}
        placeholder="Email Newpassword"
        name="newpassword"
        onChange={handlechange}
      ></input>
      <p className={` ${error?.newpassword ? 'text-[#FF0000]' : 'invisible'} `}>{error?.newpassword || 'placeholder'}</p>

      <button className='w-full px-[15px] py-[13px] rounded-[8px] bg-[var(--primary-violet)] text-[var(--primary-white)] text-[16px] font ' type="submit">Reset Password</button>
<NavLink className='text-[var(--primary-violet)] text-[12px] font-semibold text-center' to='/login'>Back to login</NavLink>
</div>
</div>
</form>
</>
)
}

export default Otpreset