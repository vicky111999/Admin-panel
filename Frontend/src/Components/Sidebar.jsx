import React, { useState } from "react";
import { Arrowicon, Logoicon } from "./Svg";
import sidebarmenu from "../assets/Sidebarnav.json";
import { iconMap } from "../assets/Icon.js";
import '../style/sidebar.css'
import {  NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [openmenu, setOpenmenu] = useState("Home");
  const [navlink,setNavlink] = useState()
  const navigate = useNavigate()
  const handleset=(menu)=>{
        setNavlink (0)
    navigate(menu?.sub[0]?.path)
  }

  return (
    <>
      <div className="">
        <div className="flex justify-center py-10">
      <Logoicon className="mb-8"/>
      </div>
      <div className="flex flex-col gap-4">
        {sidebarmenu.map((menu) => {
          const Icon = iconMap[menu.icon];
          return (
            <div key={menu.id} className={` pl-4 pe-2 relative `}>
              <button
                onClick={() =>{ setOpenmenu(openmenu === menu.id ? "" : menu.id);handleset(menu)}}
                className={`flex items-center justify-between  px-2 py-2 w-full rounded-[8px] relative ${openmenu === menu.id ? `bg-[var(--primary-purple)] activebar` : ``}`}
              >
                <div className="flex items-center gap-1.25">
                  <span className="text-sm">
                    <Icon
                      color={`${openmenu === menu.id ? "#6E39CB" : "#000"}`}
                    />
                  </span>
                  <span
                    className={`text-sm ${openmenu === menu.id ? `text-[var(--primary-violet)]` : `text-[var(--primary-black)] `}`}
                    color={`${openmenu === menu.id ? "#6E39CB" : "#000"}`}
                  >
                    {menu.title}
                  </span>
                </div>{" "}
                <span className="pl-5">
                  <Arrowicon
                    className={`${openmenu === menu.id ? `` : `rotate-180`}`}
                    color={`${openmenu === menu.id ? "#6E39CB" : "#000"}`}
                  />
                </span>
              </button>
              <div className="flex flex-col ">
              {menu.sub.map((val,index)=>{
                return(
                  <div className={`pl-6 py-2 ${openmenu === menu.id ? `visible` : `hidden`}`}>
                    <NavLink to={val.path} className={` ${navlink ===  index ? `text-[var(--primary-violet)]` : `text-[var(--primary-black)]`}`} onClick={()=>setNavlink(index)}>{val.name}</NavLink>
                  </div>
                )
              })}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </>
  );
};

export default Sidebar;
