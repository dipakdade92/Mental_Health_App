import { Link } from "react-router-dom";
import DataVisualization from "../components/DataVisualization";
const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('token'));
  
  return (
    <>
      <div className="space"></div>
      <div style={styles.container}>
        <h1 style={styles.heading}>Your Dashboard</h1>
        <p style={styles.description}>
        Log your daily mental health data and monitor your progress over time.
      </p>
        <div style={styles.section}>
          <div style={styles.trendsHeader}>
            <h2>Trends</h2>
          <Link to="/dailylogform">
            <button style={styles.updateButton} >Update</button>
            </Link>
          </div>
          <DataVisualization />
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "900px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    textAlign: "center",
  },
  section: {
    marginBottom: "3rem",
  },
  trendsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  updateButton: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default Dashboard;
