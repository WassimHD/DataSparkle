// ./components/PieChart.js
import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { PolarArea } from "react-chartjs-2";
import axios from "axios";
import styles from "./chart.module.css";

const PolarAreaChart = () => {
  const [postsNumber, setPostsNumber] = useState();
  const [selectedRow, setSelectedRow] = useState(1);
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/clean/csv_content/")
      .then((response) => {
        setContent(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/clean/posts_number/").then((response) => {
      setPostsNumber(response.data.number);
    });
  }, []);
  // get the headers of the dataset
  const headers = content.length > 0 ? content[0] : [];
  const valuesToKeep = ["total_reactions", "total_comments", "total_shares"];

const labels = headers.filter((element) => valuesToKeep.includes(element));


  // get labels from headers ( not include the first one (posts))
  // const startIndex = headers.indexOf("reactions");
  // const stopIndex =headers.indexOf("shares")+1;
  // const labels = headers.slice(startIndex,stopIndex);

  // get the data from the dataset
  const handleRowChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    setSelectedRow(selectedValue);
  };

  const rows = content.slice(1).map((row) => {
    return row.slice(2); // Exclude the first element from each row
  // get only the first three objects
  
  });
  // const newArray = [rows[1], myArray[2]];
 
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Data",
        backgroundColor: ["#16BFD6", "#F765A3", "#165BAA"],
        data: rows[selectedRow - 1],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "left", // Set the legend position to the left

        labels: {
          padding: 10, // Adjust the padding around the legend labels
        },
      },
    },
    layout: {
      margin: {
        left: 100, // Adjust the left padding
        right: 100, // Adjust the right padding
        top: 20, // Adjust the top padding
        bottom: 20, // Adjust the bottom padding
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <label htmlFor="rowSelector" className={styles.text}>
          {" "}
          Select a post:
        </label>
        <select
          id="rowSelector"
          className={styles.selector}
          value={selectedRow}
          onChange={handleRowChange}
        >
          {[...Array(postsNumber).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              Post {num + 1}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.polarChart}>
        <PolarArea data={data} options={options} />
      </div>
    </div>
  );
};
export default PolarAreaChart;
