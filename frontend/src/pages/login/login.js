
import React, { useState, useEffect } from "react";
import login_img from "../../images/login_img.svg";

import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();

  const toSignUp = () => {
    navigate("/signup");
  };
  const [token , setToken]=useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
   
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login/",
        formData
      );
      localStorage.setItem("token", response.data.token);
      alert("Successfully logged in");
      const isStaff = response.data.is_staff;
      console.log(isStaff)
      if (isStaff) {
        navigate("/admin"); // Redirect to the games home page for admins
      } else {
        navigate("/home"); // Redirect to the regular home page for users
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred during login");
      }
      console.error(error);
    }
  };
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <img src={login_img} alt="" className={styles.img} />
        <div className={styles.content}>
          <form className={styles.loginForme} onSubmit={handleSubmit}>
            <h1 className={styles.title}> Login </h1>
            <div>
              <input
                className={styles.loginInput}
                type="text"
                placeholder="Enter your username please"
                name="username"
                required
              />
            </div>
            <div>
              <input
                className={styles.loginInput}
                type="password"
                placeholder="Enter your password please"
                name="password"
                
                required
              />
            </div>
            <div className={styles.flexContainer}>
              {/* <div className={styles.leftSide}>
                <input type="checkbox" className={styles.checkbox} />
                <label className={styles.link2}> Remember me</label>
              </div> */}
              {/* <p className={styles.rightSide}>
                {" "}
                <Link onClick={toForgetPassword} className={styles.link1}>
                  {" "}
                  Forgot password ?{" "}
                </Link>
              </p> */}
            </div>

            <button className={styles.btn1} type="submit">
              Login
            </button>
            <p className={styles.text}> You don't have an account ? </p>
            <p className={styles.text}>
              <a href="" onClick={toSignUp} className={styles.link}>
                Register Here
              </a>  
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
