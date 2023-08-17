import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import styles from "./clean.module.css";
import remove_img from "../../images/remove_dup.svg";
import delete_img from "../../images/delete.svg";
import replace_img from "../../images/replace.svg";
import export_img from "../../images/export.svg";
import Chart from "../../images/chart1.svg";
import transfrom from "../../images/transform1.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";
import Papa from "papaparse";
import withAuthentication from "../../components/auth_restriction/auth_restriction";
import Popup_timer from "../../components/popup/popup_timer";
const Clean = () => {
  const [content, setContent] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/clean/csv_content/")
      .then((response) => {
        setContent(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // Generate unique IDs for rows
  const rows = content.slice(1).map((row) => {
    const rowData = {};
    row.forEach((value, index) => {
      rowData[`field${index}`] = value;
    });
    rowData.id = uuidv4();
    return rowData;
  });
  // Extract the headers from the content array
  const headers = content.length > 0 ? content[0] : [];
  // Generate columns based on headers
  const columns = headers.map((header, index) => ({
    field: `field${index}`,
    headerName: header,
    width: 200,
  }));
  const columns_list = headers.map((col) => `- ${col}`).join("\n");
  const deleteColumn = () => {
    let answer = prompt(
      `Please enter the column name to delete from the list below :\n${columns_list}`
    );
    if (columns_list.includes(answer)) {
      axios
        .get("http://127.0.0.1:8000/clean/delete_columns/", {
          params: {
            answer: answer,
          },
        })
        .then((response) => {
          alert("Column deleted sucessfully ");
          setContent(response.data.cleaned_data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Please enter a valid column name from the list");
    }
  };
  const removeDuplications = () => {
    let answer = prompt(
      `Please enter the column name to remove the duplications from the list below :\n${columns_list}`
    );
    if (columns_list.includes(answer)) {
      axios
        .get("http://127.0.0.1:8000/clean/remove_duplications/", {
          params: {
            answer: answer,
          },
        })
        .then((response) => {
          alert(" Duplications removed sucessfully");
          setContent(response.data.cleaned_data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Please enter a valid column name from the list");
    }
  };
  const replaceNanValues = () => {
    let answer = prompt(
      `Please enter the column name to replace his NaN values from the list below :\n${columns_list}`
    );

    if (columns_list.includes(answer)) {
      let new_value = prompt("Please enter the new value to replace NaNs :");
      if (answer && new_value) {
        axios
          .get("http://127.0.0.1:8000/clean/replace_NaN_values/", {
            params: {
              answer: answer,
              new_value: new_value,
            },
          })
          .then((response) => {
            alert(" NaN values replaced Succesfully ");
            setContent(response.data.cleaned_data);
            // Handle the response data here
          })
          .catch((error) => {
            console.error(error);
            // Handle any errors that occur during the request
          });
      }
    } else {
      alert("Please enter a valid column name from the list");
    }
  };
  function convertToCSV(data) {
    return new Promise((resolve, reject) => {
      try {
        const csvData = Papa.unparse(data);
        resolve(csvData);
      } catch (error) {
        reject(error);
      }
    });
  }
  const handleFollowerNumner = () => {
    let followers_value = prompt("Enter your followers number please : ");
    localStorage.setItem('followers_value', followers_value);
    console.log(followers_value)
    navigate("/dashboard")
    
  };
  const handleDownloadCSV = async () => {
    try {
      const csvData = await convertToCSV(content);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("Data sucessfully exported");
    } catch (error) {
      console.error("Error generating CSV:", error);
    }
  };
  const navigate = useNavigate();

  const toTransform = () => {
    navigate("/transform");
  };
  return (
    <div>
      <div>
        <Header />
        <Sidebar />
        <Popup_timer/>
      </div>
      <div>
        <header>
          <h1 className={styles.h1}> Data Cleaning </h1>
        </header>
      </div>
      <div>
        <div className={styles.functions}>
          <button className={styles.btn1} onClick={removeDuplications}>
            Remove duplications
            <img className={styles.img1} src={remove_img} alt="" />
          </button>
          <button className={styles.btn2} onClick={deleteColumn}>
            Delete a column
            <img className={styles.img1} src={delete_img} alt="" />
          </button>

          <button className={styles.btn4} onClick={replaceNanValues}>
            {" "}
            Replace NaN values
            <img className={styles.img1} src={replace_img} alt="" />
          </button>
          <button className={styles.btn5} onClick={handleDownloadCSV}>
            {" "}
            Export
            <img className={styles.img1} src={export_img} alt="" />
          </button>
        </div>
        <div className={styles.table}>
          <div style={{ height: 600, width: 1500 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </div>
        <div className={styles.functions1}>
          <button className={styles.btn_transform} onClick={toTransform}>
            {" "}
            Transform Data
            <img src={transfrom} alt="" className={styles.img1} />{" "}
          </button>

          <button
            className={styles.btn_visualize}
            onClick={handleFollowerNumner}
          >
            {" "}
            Visualize Data <img src={Chart} alt="" className={styles.img1} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default withAuthentication(Clean);
