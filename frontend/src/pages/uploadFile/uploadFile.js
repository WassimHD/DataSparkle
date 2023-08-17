import React, { useState } from "react";
import axios from "axios";
import upload from "../../images/Upload12.svg";
import styles from "./uploadFile.module.css";
import Sidebar from "../../components/sidebar/sidebar_upload";
import Header from "../../components/header/header";
import { useNavigate } from "react-router-dom";

import withAuthentication from "../../components/auth_restriction/auth_restriction"
const UploadFile = () => {
  const navigate = useNavigate();

  const toServices = () => {
    navigate("/services");
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://127.0.0.1:8000/upload/", formData)
      .then((response) => {
        const fileUrl = response.data.file_url;
        window.open(fileUrl, "_blank");
        alert("File Sucessfully uploaded");
        toServices();
      })

      .catch((error) => {
        console.error(error);
        alert("Please upload a CSV file");
      });
  };

  return (
    <div>
      <div>
        <Header />
        <Sidebar />
      </div>
     
      <div className={styles.form}>
        <h2 className={styles.h2}> Upload </h2>
        <div>
          <div>
            <img src={upload} alt="" className={styles.upload_img} />
          </div>
          <div className={styles.input_file}>
            <input type="file" onChange={handleFileChange} />
          </div>
        </div>
        <div>
          <button className={styles.btn1} onClick={handleUpload}>
            continue
          </button>
        </div>
      </div>
    </div>
  );
};
export default withAuthentication(UploadFile);
// display csv file
