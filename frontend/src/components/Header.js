/**
 * @file Header.js
 * @component Header
 * @description Responsive, role-aware header with navigation and branding.
 *
 * @responsibilities
 * - Renders application header with logo and title
 * - Displays navigation links based on user roles
 * - Handles responsive menu toggling for mobile views
 * - Logs mount and role data for audit/debug purposes
 * - Triggers logout via MSAL redirect when logout button is clicked
 *
 * @behavior
 * - Shows Dashboard/Profile links for "user", "admin", "editor", "analyst"
 * - Shows Admin Panel for "admin" only
 * - Shows Logout button if any role is present
 * - Normalizes role strings for case-insensitive matching
 * - Closes menu on navigation to improve UX
 * - Logs logout action for audit clarity
 *
 * @styles
 * - Defined in `frontend/src/styles/header.css`
 * - Uses `.app-header`, `.header-content`, `.nav-menu`, `.nav-button`, `.hamburger`, `.logo`
 *
 * @assets
 * - Logo image from `frontend/src/assets/logo.svg`
 *
 * @dependencies
 * - React, react-router-dom, PropTypes
 * - Custom logger from `frontend/src/utils/logger.js`
 * - MSAL authentication via `@azure/msal-react`
 * - Role config from `roles.config.js`
 *
 * @tokens
 * - Inherits `--main-bg`, `--main-text`, `--font-family`, `--spacing-unit`, `--accent`
 *
 * @auditTag layout-header-v1
 * @lastReviewed 2025-11-01
 */

import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { devLog } from "../utils/logger";
import { KNOWN_ROLES } from "../config/roles.config";
import "../styles/header.css";
import logo from "../assets/logo.svg";

const Header = ({ roles = [], onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const normalizedRoles = roles.map((r) => r.toLowerCase());
  const hasRole = (role) => normalizedRoles.includes(role);
  const { instance } = useMsal();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    devLog("info", "[Header] Component mounted.");
    devLog("debug", "[Header] Roles passed to Menu:", roles);
    devLog("debug", "[Header] Normalized roles:", normalizedRoles);
  }, []);

  return (
    <header className="app-header" data-audit="header-wrapper">
      <div className="header-content" data-audit="header-content">
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          data-audit="hamburger-toggle"
        >
          ☰
        </button>
        <img
          src={logo}
          alt="App Logo"
          className="logo"
          data-audit="header-logo"
        />
        <h1 data-audit="header-title">Friendly Happiness</h1>
      </div>

      <nav
        className={`nav-menu ${menuOpen ? "open" : ""}`}
        data-audit="nav-menu"
      >
        {/* Shared links for all authenticated roles */}
        {normalizedRoles.some(
          (r) => KNOWN_ROLES.includes(r) && r !== "guest"
        ) && (
          <>
            <NavLink
              to="/dashboard"
              className="nav-button"
              onClick={closeMenu}
              data-audit="nav-dashboard"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/profile"
              className="nav-button"
              onClick={closeMenu}
              data-audit="nav-profile"
            >
              Profile
            </NavLink>
            <NavLink
              to="/settings"
              className="nav-button"
              onClick={closeMenu}
              data-audit="nav-settings"
            >
              Settings
            </NavLink>
          </>
        )}

        {/* Admin-only link */}
        {hasRole("admin") && (
          <NavLink
            to="/admin"
            className="nav-button"
            onClick={closeMenu}
            data-audit="nav-admin"
          >
            Admin Panel
          </NavLink>
        )}

        {/* Logout for any authenticated role */}
        {normalizedRoles.length > 0 && (
          <button
            onClick={onLogout}
            className="nav-button"
            type="button"
            data-audit="nav-logout"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

Header.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
};

Header.defaultProps = {
  roles: [],
};

export default Header;
