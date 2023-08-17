import React, { useEffect, useState } from "react";
import img1 from "../../images/signup_img.svg";
import styles from "./signup.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { gridRowCountSelector } from "@mui/x-data-grid";

const Signup = () => {
  const [usernames, setUsernames] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/auth/get_usernames/")
      .then((response) => {
       
        setUsernames(response.data.users);
     
      })
      .catch((error) => {
       
        console.error(error);
      });
  }, []);

  const validateEmail = (email) => {
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target.closest("form");
    const formData = new FormData(form);
    const password = formData.get("password");
    const confirmPassword = formData.get("password1");
    const username = formData.get("username");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const email = formData.get("email");
    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !last_name ||
      !first_name
    ) {
      alert("Please fill in all the fields");
    } else if (!validateEmail(email)) {
      alert("Invalid email format");
      return;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else if (usernames.includes(username)) {
      alert("This username already exists ! Please choose another one ");
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/auth/register/",
          formData
        );
        alert("User successfully created");
        toLogin();
        console.log(response.data); // Handle the response from the server
      } catch (error) {
        console.error(error);
      }
    }
  };

  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/login");
  };
  console.log(usernames)
  return (
    <div className={styles.Body}>
      <div className={styles.container}>
        <img src={img1} alt="" className={styles.img} />
        <div className={styles.content}>
          <form className={styles.loginForme} onSubmit={handleSubmit}>
            <h1 className={styles.title}> Signup </h1>
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
                type="email"
                placeholder="Enter your email please"
                name="email"
                required
              />
            </div>
            <div className={styles.inputFlex}>
              <div>
                <input
                  className={styles.loginInputLeft}
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  minLength="5"
                  required
                />
              </div>
              <div>
                <input
                  className={styles.loginInputRight}
                  type="text"
                  placeholder="Last name"
                  name="last_name"
                  minLength="5"
                  required
                />
              </div>
            </div>

            <div>
              <input
                className={styles.loginInput}
                type="password"
                placeholder="Enter your password please"
                name="password"
                minLength="8"
                required
              />
            </div>
            <div>
              <input
                className={styles.loginInput}
                type="password"
                placeholder="Confirm your password please"
                name="password1"
                minLength="8"
                required
              />
            </div>

            <button
              className={styles.btn1}
              type="Submit"
              onClick={handleSubmit}
            >
              Register
            </button>
            <p className={styles.text}> You already have an account ? </p>
            <p className={styles.text}>
              <a href="" onClick={toLogin} className={styles.link}>
                Login Here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
