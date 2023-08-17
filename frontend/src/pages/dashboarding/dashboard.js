import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import styles from "./dashboard.module.css";
import download from "../../images/download.svg";
import reactions from "../../images/emojis.svg";
import comments from "../../images/comments 1.svg";
import shares from "../../images/shares.svg";
import interaction_img from "../../images/interaction.jpeg";
import PolarArea from "../../components/Charts/polarArea";
import ReactionsBarChart from "../../components/Charts/reactionsBarChart";
import SharesBarChart from "../../components/Charts/sharesBarChart";
import CommentsBarChart from "../../components/Charts/commentsBarChart";
import Gaugechart from "../../components/Charts/gaugeChart";
import { DataGrid } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import withAuthentication from "../../components/auth_restriction/auth_restriction";

const Dashboard = () => {
  const followers = localStorage.getItem("followers_value");
  const [content, setContent] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/clean/reaction_analysis/")
      .then((response) => {
        setContent(response.data.cleaned_data);
        // console.log(response.data.cleaned_data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const rows = content.slice(1).map((row) => {
    const rowData = {};
    row.forEach((value, index) => {
      rowData[`field${index}`] = value;
    });
    rowData.id = uuidv4();
    return rowData;
  });
  const headers = content.length > 0 ? content[0] : [];
  // Generate columns based on headers
  const columns = headers.map((header, index) => ({
    field: `field${index}`,
    headerName: header,
    width: 145,
  }));
  const rowStyle = () => {
    return {
      backgroundColor: "red",
    };
  };
  const [reactions_KPI, setReactionKPI] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/clean/reactions_kpi/")
      .then((response) => {
        setReactionKPI(response.data.KPI);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [comments_KPI, setCommentsKPI] = useState([]);
  useEffect(() => {
    
    axios
      .get("http://127.0.0.1:8000/clean/comments_kpi/")
      .then((response) => {
        setCommentsKPI(response.data.KPI);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [shares_KPI, setSharesKPI] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/clean/shares_kpi/")
      .then((response) => {
        setSharesKPI(response.data.KPI);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [posts_number, setPostsNumber] = useState("");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/clean/get_number/")
      .then((response) => {
        setPostsNumber(response.data.number);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const interaction_value =
    parseInt({ reactions_KPI }.reactions_KPI) +
    parseInt({ comments_KPI }.comments_KPI) +
    parseInt({ shares_KPI }.shares_KPI);
  const engagement =parseInt(((( 1 * posts_number) + (1 * parseInt({ reactions_KPI }.reactions_KPI)) + (3 * parseInt({ comments_KPI }.comments_KPI)) + (5 * parseInt({ shares_KPI }.shares_KPI)) )/parseInt(followers)*0.5)*100);
  console.log(engagement);
  localStorage.setItem("engagement", engagement);

  const handleDownload = () => {
    const input = document.getElementById("dashboard");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("dashboard.pdf");
      alert("Dashbaord is sucessfully downloaded");
    });
  };
  return (
    <div>
      <Header />
      <Sidebar />
      <div id="dashboard">
        <div>
          <h1 className={styles.title}>Dashboard</h1>
        </div>

        <div className={styles.kpis}>
          <div className={styles.reactions}>
            <img src={reactions} alt="" className={styles.img_reactions} />
            <div>
              <p className={styles.p1}> Reactions </p>
              <p className={styles.kpi}> {reactions_KPI}</p>
            </div>
          </div>
          <div className={styles.comments}>
            <img src={comments} alt="" className={styles.img_comments} />
            <div>
              <p className={styles.p2}> Comments </p>
              <p className={styles.kpi}> {comments_KPI}</p>
            </div>
          </div>
          <div className={styles.shares}>
            <img src={shares} alt="" className={styles.img_shares} />
            <div>
              <p className={styles.p3}> Shares </p>
              <p className={styles.kpi}>{shares_KPI}</p>
            </div>
          </div>
          <div className={styles.engagement}>
            <img
              src={interaction_img}
              alt=""
              className={styles.img_engagement}
            />
            <div>
              <p className={styles.p4}> Interaction </p>
              <p className={styles.kpi_interaction}>{interaction_value} </p>
            </div>
          </div>
        </div>
        <div className={styles.line1}>
          <div className={styles.bar1}>
            <div>
              <p className={styles.title1}> Reactions evolution by post </p>
            </div>
            <div>
              <ReactionsBarChart />
            </div>
          </div>
          <div className={styles.bar2}>
            <div>
              <p className={styles.title1}> Comments evolution by post </p>
            </div>
            <div>
              <CommentsBarChart />
            </div>
          </div>
          <div className={styles.bar3}>
            <div>
              <p className={styles.title1}> Shares evolution by post </p>
            </div>
            <div>
              <SharesBarChart />
            </div>
          </div>
        </div>
        <div className={styles.line2}>
          <div className={styles.polarArea}>
            <p className={styles.title6}> Interactions by post </p>

            <div className={styles.chartPolar}>
              <PolarArea />
            </div>
          </div>
          <div className={styles.gaugeChart}>
            <p className={styles.title1}> Engagement </p>

            <div className={styles.chartGauge}>
              <Gaugechart />
            </div>
          </div>
        </div>
        <div className={styles.line3}>
          <div className={styles.title5}> Reactions Analysis </div>
          <div
            style={{ height: 500, width: 1540 }}
            className={styles.chartTable}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              rowStyle={rowStyle}
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
      </div>
      <div>
        <button className={styles.btn5} onClick={handleDownload}>
          {" "}
          Download Dashboard
          <img className={styles.img1} src={download} alt="" />
        </button>
      </div>
    </div>
  );
};
export default withAuthentication(Dashboard);
