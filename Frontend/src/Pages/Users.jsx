import React, { useEffect, useState } from 'react'
import { api } from '../../Axios/axios';
import Adminusertable from '../Components/Adminusertable';
import { useOutletContext } from 'react-router-dom';

const Users = () => {
    const buttonflow=()=>{
        return(
            <button className='px-4 py-3 bg-[var(--primary-violet)] text-[var(--primary-white)] rounded-md'>
                &#43; ADD
            </button>
        )
    }
    const {setDevs} = useOutletContext()
   const [usersdata, setUsersdata] = useState([]);
     const [pagination,setPagination] = useState({
      current:1,
      pageSize:10,
      total:0
     })
   
        const userdetails =async(page=1,limit=1)=>{
          try{
     const res = await api.get(`/admin/getallusers?page=${page}&limit=${limit}`)
            setUsersdata(res?.data?.data?.users);
            const pagedetail = res?.data?.data
            setPagination({
              current:pagedetail?.currentpage,
              pageSize:pagedetail?.pagesize,
              total:pagedetail?.totalcount
            });
          }
       catch(err){
     console.log(err.message)
       }}
       
        useEffect(() => {
       userdetails()
      },[]);
      useEffect(()=>{
        setDevs({
            title:"Users",
            button:buttonflow()
        })
      },[setDevs])
      const handlechange = (paginationInfo)=>{
        userdetails(paginationInfo.current,paginationInfo.pageSize)
       }
  return (
<>
<Adminusertable data={usersdata} change={handlechange} pageinfo={pagination}/>
</>
)
}


export default Users