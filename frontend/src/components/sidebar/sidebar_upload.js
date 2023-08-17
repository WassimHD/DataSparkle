import React, { useState } from "react";
import styles from "./sidebar.module.css";
import profile from "../../images/profile.svg";
import Home1 from "../../images/home.svg";
import logout from "../../images/Logout1.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SidebarUpload = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/home");
  };
  const toUserProfile = () => {
    navigate("/user_profile");
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/logout/");
       localStorage.removeItem("token");
      console.log(response.data); //
      alert("User logged out sucessfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebar_list}>
        <li className={styles.sidebar_list_item_home}>
          <button className={styles.btn} onClick={toHome}>
            <img src={Home1} alt="" />
          </button>
        </li>

        <li className={styles.sidebar_list_item}>
          <button className={styles.btn} onClick={toUserProfile}>
            <img src={profile} alt="" />
          </button>
        </li>

        <li className={styles.sidebar_list_item_logout}>
          <button className={styles.btn_logout} onClick={handleLogout}>
            <img src={logout} alt="" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarUpload;
