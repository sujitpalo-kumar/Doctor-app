import React, { useState } from "react";
import { Link, Links, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
import { SidebarMenu, adminMenue } from "../Data/data"; // You must define this
import "../styles/LayoutStyles.css";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

function Layout({ children }) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);


  const handelLogout = () => {
    localStorage.clear();
    message.success("Logout Sucessfully");
    navigate("/login");
  };
  const doctormenue =[
      {
          name:'Home',
          path:'/',
          icon:"fa-solid fa-house",
      },
      {
          name:'Appointment',
          path:'/appointment',
          icon:"fa-solid fa-list",
      },
 
      {
          name:'Profile',
          path: `/doctor/profile/${user?._id} `,
          icon:"fa-solid fa-user",
      },

  ]

   const SidebarMenus = user?.isAdmin
  ? adminMenue
  : user?.isDoctor
  ? doctormenue
  : SidebarMenu;
  console.log("zzzz",SidebarMenus)



  return (
    <div className="main">
      {/* Header with Hamburger */}
      <div className="mobile-header">
        <FaBars
          className="hamburger"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <div className="mobile-logo">Logo</div>
      </div>

      <div className="layout">
        <div className={`sidebar ${showSidebar ? "show" : ""}`}>
          <div className="logo">Logo</div>
          <div className="menu">
            {SidebarMenus.map((menu, index) => (
              <div className="menu-item" key={index}>
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            ))}
            <div className="menu-item" onClick={handelLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            <div className="header-content">
              <div className="header-right">
                {/* <div className="icon-container">
        
        <FontAwesomeIcon icon={faBell} />
      </div> */}
                <Badge count={user && user.notification.length} onClick={()=>{navigate('/notification')}}>
                  <i className="fa-solid fa-bell p-1"></i>
                </Badge>
                <Link to="/profile" className="user-name">
                  {user?.name}
                </Link>
              </div>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
