import React from "react";
import styles from "./services.module.css";
import clean from "../../images/clean123.svg";
import transform from "../../images/transform123.svg";
import Sidebar from "../../components/sidebar/sidebar_upload";
import Header from "../../components/header/header";
import { useNavigate } from "react-router-dom";
import withAuthentication from "../../components/auth_restriction/auth_restriction";

const Services = () => {
  const navigate = useNavigate();

  const toClean = () => {
    navigate("/clean");
  };
  const toTransform = () => {
    navigate("/transform");
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className={styles.img_services}>
        <button onClick={toClean} className={styles.btn1}>
          <img src={clean} alt="" />
        </button>
        <button onClick={toTransform} className={styles.btn2}>
          <img src={transform} alt="" />
        </button>
      </div>
    </div>
  );
};
export default withAuthentication(Services);