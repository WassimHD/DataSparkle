import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import styles from "./editProfile.module.css";
import withAuthentication from "../../components/auth_restriction/auth_restriction"


const EditProfile = () => {

  
  
  const [User, setUser] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

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
        setFormData({
          username: response.data.username,
          email: response.data.email,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          password: "",
          token: token,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");

    axios
      .post("http://127.0.0.1:8000/auth/edit_profile/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("User modifed sucessfully ")
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(formData);
  return (
    <div>
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Profile</h1>
        <div className={styles.cont1}>
          <div className={styles.fname}>
            <div>
              <label className={styles.label}>First name</label>
            </div>
            <input
              className={styles.fields}
              type="text"
              placeholder={User.first_name}
              name="first_name"
              onChange={handleChange}
            />
          </div>

          <div className={styles.lname}>
            <div>
              <label className={styles.label}>Last name</label>
            </div>
            <input
              className={styles.fields}
              type="text"
              placeholder={User.last_name}
              name="last_name"
              onChange={handleChange}
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
              placeholder={User.username}
              name="username"
              onChange={handleChange}
            />
          </div>

          <div className={styles.email}>
            <div>
              <label className={styles.label}>Email</label>
            </div>
            <input
              className={styles.fieldUsername}
              type="email"
              placeholder={User.email}
              name="email"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.email}>
          <div>
            <label className={styles.label}>Old password</label>
          </div>
          <input
            className={styles.fieldUsername}
            type="password"
            name="password"
            placeholder="Enter your old password"
          />
        </div>
        <div className={styles.email}>
          <div>
            <label className={styles.label}>New password</label>
          </div>
          <input
            className={styles.fieldUsername}
            type="password"
            name="password"
            placeholder="Enter your new password"
          />
        </div>
        <div className={styles.email}>
          <div>
            <label className={styles.label}>Confirm new password</label>
          </div>
          <input
            className={styles.fieldUsername}
            type="password"
            name="password"
            placeholder="Confirm your password"
          />
        </div>
        <div className={styles.btns}>
          <div>
            <button className={styles.btnConfirm} onClick={handleSubmit}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthentication(EditProfile);