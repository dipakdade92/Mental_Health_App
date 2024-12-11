import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleManualSignup = () => {
    navigate("/signup")
  }
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Mental Health App</h1>
      <p style={styles.description}>
        Track your daily mental health status and monitor trends over time. Start your journey to better mental health today.
      </p>
     
        <button onClick={handleManualSignup} style={styles.button} >
         Create Account 
        </button>
    </div>
  );
  
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    padding: "1rem",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    maxWidth: "600px",
  },
  button: {
    padding: "0.8rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Home;