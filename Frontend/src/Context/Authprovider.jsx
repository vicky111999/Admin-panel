import React, { useEffect, useState } from "react";
import { api } from "../../Axios/axios";
import { AuthContext } from "./Authcontext";

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);

  // if(token){
  //   api
  //     .get(`/admin/getallusers?page=1&limit=10`)
  //     .then((res) => {
  //       setUser(res);
  //     })
  //     .catch((err) => console.log(err.message));
  // }
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
  },[]);
  return (<>
        <AuthContext.Provider value={{user}}>
          {children}
        </AuthContext.Provider>
  </>);
};

export default Authprovider;
