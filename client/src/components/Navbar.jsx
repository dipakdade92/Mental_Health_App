import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [manualUser, setManualUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleManualLogin = () => {
    navigate("/login");
  };
  const handleManualSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    setManualUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/">Mental Health App</Link>
      <div className="navbar-links">
        {(token || manualUser) && <Link to="/dashboard">Dashboard</Link>}

        {token ? (
          <button className="navbar-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <button className="navbar-button" onClick={handleManualLogin}>
              Login
            </button>
            <button className="navbar-button" onClick={handleManualSignup}>
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
