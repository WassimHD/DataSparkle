import React, { useEffect,useState } from "react";
import { Chart as ChartJS, BarElement, Tooltip, Legend } from "chart.js";
import { Bar, Chart } from "react-chartjs-2";
import styles from "./chart.module.css";
import axios from "axios";
ChartJS.register(
  BarElement,

  Tooltip,
  Legend
);

function CommentsBarChart() {

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

  // get from headers the "reaction" only
  const headers = content.length > 0 ? content[0] : [];
  const valueToKeep = "total_comments";
  const label = headers.filter((element) => element === valueToKeep)[0];


  const posts = content.slice(1).map((row) => {
    return row.slice(0, 1); // Exclude the first element from each row
  });
  const rows = content.slice(1).map((row) => {
    return row.slice(3,4); // Exclude the first element from each row
  });
  const data_values = rows.flat();
  // console.log(data_values)

  
  const data = {
    labels: posts,
    datasets: [
      {
        label: label,
        data: data_values,
        backgroundColor: "#00DFA2",
        borderColor: "black",
        borerWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
  };
  return (
    <div>
      <div>
        <div className={styles.ChartBox}>
          <div className={styles.Container}>
            
            <Bar className={styles.myChart} data={data} options={options}></Bar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsBarChart;
