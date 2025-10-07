// frontend/src/components/Menu.js
import { NavLink } from "react-router-dom";
import "../styles/menu.css";
import { devLog } from "../utils/logger";

const Menu = ({ roles = [], isOpen = true }) => {
  devLog("debug", "[Menu] Roles received:", roles);
  devLog("debug", "[Menu] isOpen state:", isOpen);

  const normalizedRoles = roles.map((r) => r.toLowerCase());
  const hasRole = (role) => normalizedRoles.includes(role);

  return (
    <nav className={`menu ${isOpen ? "open" : ""}`}>
      {roles.length === 0 && (
        <>
          <NavLink to="/" className="menu-link">
            Home
          </NavLink>
          <p className="menu-note">No roles detected</p>
        </>
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
