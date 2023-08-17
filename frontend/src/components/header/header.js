import React, { useState, useEffect } from "react";
import user from "../../images/User_img.svg";
import styles from "./header.module.css";
import axios from "axios";

const Header = () => {
  const [User, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/auth/header/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        // console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.head}>
      <div>
        <div className={styles.content}>
          <p className={styles.text}>{User.first_name}</p>
          <img src={user} alt="" className={styles.user_img} />
        </div>
      </div>
    </div>
  );
};
export default Header;
