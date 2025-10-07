// frontend/src/components/Menu.js
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/menu.css";

const Menu = ({ roles }) => {
  const normalizedRoles = roles.map((r) => r.toLowerCase());
  const hasRole = (role) => normalizedRoles.includes(role);

  return (
    <nav className="menu">
      {roles.length === 0 && (
        <NavLink to="/" className="menu-link">
          Home
        </NavLink>
      )}

      {(hasRole("users") || hasRole("admins")) && (
        <>
          <NavLink to="/dashboard" className="menu-link">
            Dashboard
          </NavLink>
          <NavLink to="/profile" className="menu-link">
            Profile
          </NavLink>
        </>
      )}

      {hasRole("admins") && (
        <NavLink to="/admin" className="menu-link admin-link">
          Admin Panel
        </NavLink>
      )}

      {roles.length > 0 && (
        <NavLink to="/auth/logout" className="menu-link">
          Logout
        </NavLink>
      )}
    </nav>
  );
};

export default Menu;
