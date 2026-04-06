import React, { useEffect, useState } from 'react'
import { api } from '../../Axios/axios';

const Admindashboard = () => {
      const [user, setUser] = useState(null);
    
    useEffect(() => {
        const userdetails =async()=>{
          try{
     const res = await api.get(`/admin/getallusers?page=1&limit=10`)
    console.log(res)
            setUser(res);
            console.log(user)
          }
       catch(err){
     console.log(err.message)
       }}
       userdetails()
      },[user]);
  return (
<>
<p>home</p>
</>
)
}

export default Admindashboard