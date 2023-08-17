import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import styles from "./userProfile.module.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import withAuthentication from "../../components/auth_restriction/auth_restriction"
const UserProfile = () => {
  

  const Navigate=useNavigate()
  const toEditProfile=()=>{
    Navigate('/edit_profile')
  }
  const [User, setUser] = useState([]);
 
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/auth/user_info/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = () => {
    const token = localStorage.getItem("token");

    axios
      .post("http://127.0.0.1:8000/auth/delete_account/",token, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert('Your account has been successfully deleted');
        Navigate('/login')
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const confirmDelete = (e) => {
    e.stopPropagation();
       if(window.confirm('Are sure want to delete your account ?')) {
           handleDelete();
       } 
 }
  return (
    <div>
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title25}>Profile</h1>
        <div className={styles.cont1}>
          <div className={styles.fname}>
            <div>
              <label className={styles.label}>First name</label>
            </div>
            <input
              className={styles.fields}
              type="text"
              name="first_name"
              value={User.first_name}
              readOnly
            />
          </div>

          <div className={styles.lname}>
            <div>
              <label className={styles.label}>Last name</label>
            </div>
            <input
              className={styles.fields}
              type="text"
              name="last_name"
              value={User.last_name}
              readOnly
            />
          </div>
        </div>
        <div className={styles.line2}>
          <div className={styles.uname}>
            <div>
              <label className={styles.label}>Username</label>
            </div>
            <input
              className={styles.fieldUsername}
              type="text"
              name="username"
              value={User.username}
              readOnly
            />
          </div>

          <div className={styles.email}>
            <div>
              <label className={styles.label}>Email</label>
            </div>
            <input
              className={styles.fieldUsername}
              type="email"
              name="email"
              value={User.email}
              readOnly
            />
          </div>
        </div>
        <div className={styles.btns}>
          <div>
            <button className={styles.btnEdit} onClick={toEditProfile}>
              Edit
            </button>
          </div>
          <div>
            <button className={styles.btnDelete} onClick={confirmDelete} >
              Delete
            </button>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthentication(UserProfile);
