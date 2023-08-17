import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./chart.module.css";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function Gaugechart() {
  const engagement_value = localStorage.getItem("engagement");

  const data = {
    labels: ["Engagement", "no engagement"],
    datasets: [
      {
        label: "Poll",
        data: [engagement_value, 100 - engagement_value],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          if (context.dataIndex === 0) {
            return getGradient(chart);
          } else {
            return "white";
          }
        },
        borderColor: ["grey"],
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    paddingTop: "0px",
  };
  const gaugeText = {
    id: "gaugeText",
    beforeDatasetDraw(chart, args, pluginOptions) {
      const {
        ctx,
        data,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;
      const xCenter = chart.getDatasetMeta(0).data[0].x;
      const yCenter = chart.getDatasetMeta(0).data[0].y;
      ctx.save();
      ctx.fillStyle = "gray";
      ctx.font = "bold 16px  sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(
        `Engagement value : ${data.datasets[0].data[0]} % `,
        xCenter,
        yCenter - 10
      );
    },
  };
  function getGradient(chart) {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
    } = chart;
    const gradientSegment = ctx.createLinearGradient(left, 0, right, 0);
    gradientSegment.addColorStop(0, "red");
    gradientSegment.addColorStop(0.3, "orange");
    gradientSegment.addColorStop(0.8, "green");
    return gradientSegment;
  }
  return (
    <div className={styles.gauge}>
      <div>
        <Doughnut
          data={data}
          options={options}
          plugins={[gaugeText]}
        ></Doughnut>
      </div>
    </div>
  );
}
export default Gaugechart;
