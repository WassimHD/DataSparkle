import React from "react";
import styles from "./resetPassword.module.css";
import resetpwd_img from "../../images/reset_password_img.svg";
const ResetPassword = () => {
  return (
    <div className={styles.container}>
      <img src={resetpwd_img} alt="" className={styles.img} />
      <form
        className={styles.loginForme}
        //</div>onSubmit={(e) => onSubmit(e)}
      >
        <h1 className={styles.title}> Reset Password </h1>
        <div>
          <p className={styles.text1}> Please enter your email adress below </p>
        </div>
        <div>
          <input
            className={styles.loginInput}
            type="email"
            placeholder="Enter your email please"
            name="email"
            //value={email}
            //onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className={styles.btns}>
          <div>
            <button className={styles.btn_cancel} type="submit">
              Cancel
            </button>
          </div>
          <div>
            <button className={styles.btn_send} type="submit ">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ResetPassword;
