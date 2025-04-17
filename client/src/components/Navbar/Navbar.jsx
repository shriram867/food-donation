import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = ({ token }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const handleDashboardClick = () => {
    if (user?.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/volunteer-dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="main">
      <div className="logo">
        <h2>
          Share
          <span>bite</span>
        </h2>
      </div>
      <div className={showMenu ? "nav-items mobile-menu-link" : "nav-items"}>
        <ul>
          <li>
            <Link to="/" style={{ fontSize: "1.5rem" }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" style={{ fontSize: "1.5rem" }}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/work" style={{ fontSize: "1.5rem" }}>
              Our Work
            </Link>
          </li>
          <li>
            <Link to="/contact" style={{ fontSize: "1.5rem" }}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      <div className="header-login">
        {token ? (
          <div className="l-btn">
            <button className="btn-nav" onClick={handleDashboardClick}>
              Dashboard
            </button>
            <button className="btn-nav" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="l-btn">
            <Link className="link" to="/signin">
              <button className="btn-nav">Login</button>
            </Link>
            <Link className="link" to="/signup">
              <button className="btn-nav">Signup</button>
            </Link>
          </div>
        )}
        <div className="hamburger-menu">
          <button onClick={handleClick}>
            <GiHamburgerMenu />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
