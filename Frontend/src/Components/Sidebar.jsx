import React, { useState } from "react";
import { Arrowicon, Logoicon } from "./Svg";
import sidebarmenu from "../assets/Sidebarnav.json";
import { iconMap } from '../assets/Icon.js'

const Sidebar = () => {
  const [openmenu, setOpenmenu] = useState("Home");
  console.log(sidebarmenu);
  console.log(iconMap['home'])
  return (
    <>
      <Logoicon />
      <div>
        {sidebarmenu.map((menu) => {
            const Icon = iconMap[menu.icon]
          return (
            <div key={menu.id}>
              <button
                onClick={() => setOpenmenu(openmenu === menu.id ? "" : menu.id)}
                className={`flex items-center gap-1.25 py-2 px-3 ${openmenu === menu.id  ? `bg-[var(--primary-purple)]` :``}` }
              >
                <span>
                  <Icon  className={`${openmenu === menu.id ? '#6E39CB':'#000'}`}/>
                </span>
                <span>{menu.title}</span>
                <Arrowicon className={`${openmenu === menu.id ? ``:`rotate-180`}`} color={`${openmenu === menu.id ? '#6E39CB':'#000'}`}/>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
