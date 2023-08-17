import React from "react";
import { Link } from "react-router-dom";
//import arrow from "../../images/arrow.jpg";
import line from "../../images/line.svg";
import lamp from "../../images/lamp.svg";
import arrow from "../../images/Arrow.svg";
import dash from "../../images/Group.svg";
import styles from "./LandingPage.module.css";
const LandingPage = () => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <p className={styles.text}> Data Illuminates </p>
        <p className={styles.text1}>
          Decisions <span className={styles.text2}>Accelerate !</span>{" "}
        </p>
        <div>
          <img src={line} alt="" className={styles.imgLine} />
        </div>
        <div>
          <img src={dash} alt="" className={styles.imgDash} />
          <img src={arrow} alt="" className={styles.imgArrow} />
          <img src={lamp} alt="" className={styles.imgLamp} />

          <div>
            <button className={styles.btn}>
              {" "}
              <Link to="./login" className={styles.link}>
                {" "}
                Let's get started{" "}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
