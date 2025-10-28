/**
 * @file Menu.js
 * @component Menu
 * @description Role-aware navigation menu with conditional rendering and responsive visibility.
 *
 * @responsibilities
 * - Renders navigation links based on user roles
 * - Displays fallback message when no roles are present
 * - Applies conditional visibility via `isOpen` prop
 * - Logs role and state data for audit/debug purposes
 *
 * @behavior
 * - Shows Dashboard/Profile links for "users" and "admins"
 * - Shows Admin Panel for "admins" only
 * - Shows Logout if any role is present
 * - Normalizes role strings for case-insensitive matching
 *
 * @styles
 * - Defined in `frontend/src/styles/menu.css`
 * - Uses `.menu`, `.menu-link`, `.admin-link`, `.menu-note`
 *
 * @tokens
 * - Inherits `--main-bg`, `--main-text`, `--font-family`, `--spacing-unit`
 *
 * @auditTag layout-menu-v1
 * @lastReviewed 2025-10-28
 */

import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { devLog } from "../utils/logger";
import "../styles/menu.css";

const Menu = ({ roles = [], isOpen = true }) => {
  devLog("debug", "[Menu] Roles received:", roles);
  devLog("debug", "[Menu] isOpen state:", isOpen);

  const normalizedRoles = roles.map((r) => r.toLowerCase());
  const hasRole = (role) => normalizedRoles.includes(role);

  return (
    <nav className={`menu ${isOpen ? "open" : ""}`} data-audit="menu-wrapper">
      {roles.length === 0 && (
        <>
          <NavLink to="/" className="menu-link" data-audit="menu-home">
            Home
          </NavLink>
          <p className="menu-note" data-audit="menu-note">
            No roles detected
          </p>
        </>
      )}

      {(hasRole("users") || hasRole("admins")) && (
        <>
          <NavLink
            to="/dashboard"
            className="menu-link"
            data-audit="menu-dashboard"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/profile"
            className="menu-link"
            data-audit="menu-profile"
          >
            Profile
          </NavLink>
        </>
      )}

      {hasRole("admins") && (
        <NavLink
          to="/admin"
          className="menu-link admin-link"
          data-audit="menu-admin"
        >
          Admin Panel
        </NavLink>
      )}

      {roles.length > 0 && (
        <NavLink
          to="/auth/logout"
          className="menu-link"
          data-audit="menu-logout"
        >
          Logout
        </NavLink>
      )}
    </nav>
  );
};

Menu.propTypes = {
  isOpen: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string),
};

Menu.defaultProps = {
  isOpen: true,
  roles: [],
};

export default Menu;
