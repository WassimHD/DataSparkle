import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar_admin";
import Header from "../../components/header/header";
import styles from "./admin.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";
import withAuthentication from "../../components/auth_restriction/auth_restriction";

const Admin = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/auth/users/");
      setContent(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    let userId = prompt("Enter the user ID to delete please : ");
    try {
      const response= await axios.delete(`http://127.0.0.1:8000/auth/delete_user/${userId}`);
      // fetchData();
      setContent(response.data.users_list)
      alert("User deleted");
    } catch (error) {
      console.error(error);
    }
  };

  // Generate unique IDs for rows
  const rows = content.slice(1).map((row, index) => {
    const rowData = { id: index + 1 };
    row.forEach((value, index) => {
      rowData[`field${index}`] = value;
    });
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

  const navigate = useNavigate();

  const toTransform = () => {
    navigate("/transform");
  };
  return (
    <div className={styles.container}>
      <div>
        <div>
          <Header />
          <Sidebar />
        </div>

        <div>
          <h1 className={styles.h1}> Admin Panel </h1>
        </div>
        <div className={styles.table}>
          <div style={{ height: 600, width: 1450 }}>
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
              sx={{
                boxShadow: 5,
                border: 2,
                borderColor: "rgb(211, 27, 27)",
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
                backgroundColor:"white",
              }}
            />
          </div>
        </div>
        <div className={styles.functions1}>
          <button className={styles.btn_delete} onClick={handleDeleteUser}>
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuthentication(Admin);
