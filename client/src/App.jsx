import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import DailyLogForm from "./components/DailyLogForm";
import Login from "./pages/Login";
import Singup from './pages/Signup';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
         <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/dailylogform" element={<DailyLogForm/>}></Route>
          </Route>
      </Routes>
    </>
  );
}

export default App;
