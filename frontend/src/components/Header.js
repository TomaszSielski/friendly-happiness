// frontend/src/components/Header.js
import { useEffect, useState } from "react";
import { devLog } from "../utils/logger";

import "../styles/header.css";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";

const Header = ({ roles = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const normalizedRoles = roles.map((r) => r.toLowerCase());
  const hasRole = (role) => normalizedRoles.includes(role);

  useEffect(() => {
    devLog("info", "[Header] Component mounted.");
    devLog("debug", "[Header] Roles passed to Menu:", roles);
  }, []);

  return (
    <header className="app-header">
      <div className="header-content">
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <img src={logo} alt="App Logo" className="logo" />
        <h1>Friendly Happiness</h1>
      </div>
      <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
        {(hasRole("users") || hasRole("admins")) && (
          <>
            <NavLink to="/dashboard" className="nav-button">
              Dashboard
            </NavLink>
            <NavLink to="/profile" className="nav-button">
              Profile
            </NavLink>
          </>
        )}
        {hasRole("admins") && (
          <NavLink to="/admin" className="nav-button">
            Admin Panel
          </NavLink>
        )}
        {roles.length > 0 && (
          <NavLink to="/auth/logout" className="nav-button">
            Logout
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
