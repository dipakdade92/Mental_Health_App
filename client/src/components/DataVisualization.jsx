import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { io } from "socket.io-client";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// Connect to WebSocket server
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

const DataVisualization = () => {
  const [data, setData] = useState({
    dates: [],
    mood: [],
    anxiety: [],
    stress: [],
  });

  const token = JSON.parse(localStorage.getItem("token"));

  const userId = token ? token.id : null;

  // Fetch initial logs from API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/logs?userId=${userId}`);
        const result = await response.json();
        if (result.logs && result.logs.length > 0) {
          const fetchedData = result.logs.reduce(
            (acc, log) => {
              acc.dates.push(new Date(log.updatedAt).toLocaleDateString());
              acc.mood.push(log.moodRating);
              acc.anxiety.push(log.anxietyLevel);
              acc.stress.push(log.stressLevel);
              return acc;
            },
            { dates: [], mood: [], anxiety: [], stress: [] }
          );
          setData(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  // Handle real-time updates
  useEffect(() => {

    socket.on("message", (newLog) => {
      setData((prevData) => ({
        dates: [...prevData.dates, new Date(newLog.updatedAt).toLocaleDateString()],
        mood: [...prevData.mood, newLog.moodRating],
        anxiety: [...prevData.anxiety, newLog.anxietyLevel],
        stress: [...prevData.stress, newLog.stressLevel],
      }));
    });

    return () => {
      socket.off("message");
      socket.off("connect");
    };
  }, []);

  // Chart data
  const chartData = {
    labels: data.dates,
    datasets: [
      { label: "Mood", data: data.mood, borderColor: "blue", fill: false },
      { label: "Anxiety", data: data.anxiety, borderColor: "red", fill: false },
      { label: "Stress", data: data.stress, borderColor: "green", fill: false },
    ],
  };

  return <Line data={chartData} />;
};

export default DataVisualization;
