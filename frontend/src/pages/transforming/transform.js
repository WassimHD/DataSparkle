import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import styles from "./transform.module.css";
import change_col_img from "../../images/change.svg";
import export_img from "../../images/export.svg";
import edit_img from "../../images/edit.svg";
import kilos_img from "../../images/kilos.svg";
import Chart from "../../images/chart1.svg";
import clean from "../../images/clean1.svg";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import withAuthentication from "../../components/auth_restriction/auth_restriction";
import Popup_timer from "../../components/popup/popup_timer";

const Transform = () => {
  const navigate = useNavigate();

  const toDashboard = () => {
    navigate("/dashboard");
  };
  const toClean = () => {
    navigate("/clean");
  };
  const [content, setContent] = useState([]);
  const [type, setType] = useState([]);

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
    headerClassName: styles["column-header"],
  }));
  const columns_list = headers.map((col) => `- ${col}`).join("\n");

  const changeColumn = () => {
    let old_column = prompt(
      `Please enter the column name to edit from the list below :\n${columns_list}`
    );
    if (columns_list.includes(old_column)) {
      let new_column = prompt("Please enter the new column name :");

      if (old_column && new_column) {
        axios
          .get("http://127.0.0.1:8000/clean/change_column_name/", {
            params: {
              old_column: old_column,
              new_column: new_column,
            },
          })
          .then((response) => {
            alert("Column name changed sucessfully ");
            // Handle the response data here
            setContent(response.data.cleaned_data);
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
  const changeKiloToInt = () => {
    let column_name = prompt(
      `Please enter the column name to edit from the list below :\n${columns_list}`
    );
    if (columns_list.includes(column_name)) {
      if (column_name) {
        axios
          .get("http://127.0.0.1:8000/clean/change_kilo_to_int/", {
            params: {
              column_name: column_name,
            },
          })
          .then((response) => {
            alert("Changed sucessfully ");
            // Handle the response data here
            setContent(response.data.cleaned_data);
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
  const get_type = () => {
    let column_name = prompt(
      `Please enter the column name to edit from the list below :\n${columns_list}`
    );
    if (columns_list.includes(column_name)) {
      if (column_name) {
        axios
          .get("http://127.0.0.1:8000/clean/get_type/", {
            params: {
              column_name: column_name,
            },
          })
          .then((response) => {
            setType(response.data.column_type);
            if (response.data.column_type === "object") {
              const type = "String";
              const available_types = ["Integer", "Float"];
              const available_types_list = available_types
                .map((col) => `- ${col}`)
                .join("\n");
              let new_type = prompt(
                `The current type of the column data is : "${type}" \n Please choose the new type : \n${available_types_list}`
              );
              if (new_type) {
                axios
                  .get("http://127.0.0.1:8000/clean/change_type/", {
                    params: {
                      column_name: column_name,
                      new_type: new_type,
                    },
                  })
                  .then((response) => {
                    setContent(response.data.cleaned_data);
                    alert("sucessfully changed");
                  })
                  .catch((error) => {
                    console.log(error);
                    alert("Impossible to change between these types");
                  });
              }
            } else if (response.data.column_type === "int64") {
              const available_types = ["String", "Float"];
              const available_types_list = available_types
                .map((col) => `- ${col}`)
                .join("\n");
              let new_type = prompt(
                `The current type of the column data is : "${type}" \n Please choose the new type : \n${available_types_list}`
              );
              if (new_type) {
                axios
                  .get("http://127.0.0.1:8000/clean/change_type/", {
                    params: {
                      column_name: column_name,
                      new_type: new_type,
                    },
                  })
                  .then((response) => {
                    setContent(response.data.cleaned_data);
                    alert("yessssirrr");
                  })
                  .catch((error) => {
                    console.log(error);
                    alert("nooowayyy");
                  });
              }
            } else if (response.data.column_type === "float64") {
              const available_types = ["Integer", "String"];
              const available_types_list = available_types
                .map((col) => `- ${col}`)
                .join("\n");
              let new_type = prompt(
                `The current type of the column data is : "${type}" \n Please choose the new type : \n${available_types_list}`
              );
              if (new_type) {
                axios
                  .get("http://127.0.0.1:8000/clean/change_type/", {
                    params: {
                      column_name: column_name,
                      new_type: new_type,
                    },
                  })
                  .then((response) => {
                    setContent(response.data.cleaned_data);
                    alert("yessssirrr");
                  })
                  .catch((error) => {
                    console.log(error);
                    alert("nooowayyy");
                  });
              }
            } else {
              console.log("error");
            }
          })

          .catch((error) => {
            console.error(error);
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

  return (
    <div>
      <div>
        <Header />
        <Sidebar />
        <Popup_timer />
      </div>
      <div>
        <header>
          <h1 className={styles.h1}> Data Transforming </h1>
        </header>
      </div>
      <div>
        <div className={styles.functions}>
          <button className={styles.btn1} onClick={changeColumn}>
            Change column Name
            <img className={styles.img1} src={change_col_img} alt="" />
          </button>
          <button className={styles.btn2} onClick={get_type}>
            Change column type
            <img className={styles.img2} src={edit_img} alt="" />
          </button>
          <button className={styles.btn3} onClick={changeKiloToInt}>
            {" "}
            Change Kilo to numbers
            <img className={styles.img1} src={kilos_img} alt="" />
          </button>
          <button className={styles.btn5} onClick={handleDownloadCSV}>
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
          <button className={styles.btn_clean} onClick={toClean}>
            {" "}
            Clean Data
            <img src={clean} alt="" className={styles.img1} />{" "}
          </button>

          <button className={styles.btn_visualize} onClick={handleFollowerNumner}>
            Visualize Data
            <img src={Chart} alt="" className={styles.img1} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default withAuthentication(Transform);
