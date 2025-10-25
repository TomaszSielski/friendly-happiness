// frontend/src/components/Header.js
import { useEffect, useState } from "react";
import { devLog } from "../utils/logger";
import React from 'react';
import "../styles/header.css";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

Header.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string)
};

const Header = ({ roles = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const normalizedRoles = roles.map((r) => r.toLowerCase());
  const hasRole = (role) => normalizedRoles.includes(role);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    devLog("info", "[Header] Component mounted.");
    devLog("debug", "[Header] Roles passed to Menu:", roles);
  }, []);

  return (
    <header className="app-header">
      <div className="header-content">
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
        <img src={logo} alt="App Logo" className="logo" />
        <h1>Friendly Happiness</h1>
      </div>
      <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
        {(hasRole("users") || hasRole("admins")) && (
          <>
            <NavLink to="/dashboard" className="nav-button" onClick={closeMenu}>
              Dashboard
            </NavLink>
            <NavLink to="/profile" className="nav-button" onClick={closeMenu}>
              Profile
            </NavLink>
          </>
        )}
        {hasRole("admins") && (
          <NavLink to="/admin" className="nav-button" onClick={closeMenu}>
            Admin Panel
          </NavLink>
        )}
        {roles.length > 0 && (
          <NavLink to="/auth/logout" className="nav-button" onClick={closeMenu}>
            Logout
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
