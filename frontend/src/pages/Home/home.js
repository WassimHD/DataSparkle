import React from "react";
import social_media from "../../images/social_media.svg";
import styles from "./home.module.css";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar_home"
import { useNavigate } from "react-router-dom";
import withAuthentication from "../../components/auth_restriction/auth_restriction";

const Home = () => {
  const navigate = useNavigate();
  const toUpload = () => {
    navigate("/upload");
  };
  return (
    <div>
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div>
          <div>
            <h1 className={styles.title}>
              {" "}
              Welcome To <span className={styles.title1}>
                {" "}
                DataSparkle{" "}
              </span>{" "}
            </h1>
          </div>
          <div className={styles.form}>
            <div className={styles.text}>
              <p className={styles.p}>
                {" "}
                With DataSparkle, it’s time to dive deep into the performance of
                your brand's social media presence, uncover key insights about
                your audience, engagement levels, content effectiveness…
              </p>
              <p className={styles.p}>
                {" "}
                Armed with this knowledge, you can make data-driven decisions,
                refine your strategies, and drive meaningful growth for your
                brand.
              </p>
              <p className={styles.p}>
                {" "}
                So, experience the power of our app and unlock the potential
                within your data today.{" "}
              </p>
                </div>
                <div className={styles.pic}>
                <img
                src={social_media}
                alt=""
                className={styles.social_media_img}
                />
                </div>
          </div>
          <button className={styles.btn} onClick={toUpload}> Start Now </button>
        </div>
      </div>
    </div>
  );
};
export default withAuthentication(Home);
