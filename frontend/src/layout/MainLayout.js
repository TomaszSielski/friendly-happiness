/**
 * @file MainLayout.js
 * @component MainLayout
 * @description Auth-aware layout wrapper with header, footer, and role display.
 *
 * @responsibilities
 * - Wraps app content with consistent layout and styling
 * - Displays user identity and roles from MSAL
 * - Passes normalized roles to Header for role-based nav
 * - Logs layout and account info for audit/debug
 *
 * @styles
 * - Defined in `frontend/src/styles/mainLayout.css`
 * - Uses `.layout-wrapper`, `.layout-meta`, `.layout-content`
 *
 * @auditTag layout-main-v1
 * @lastReviewed 2025-11-01
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMsal } from "@azure/msal-react";
import { devLog } from "../utils/logger";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/mainLayout.css";
import { KNOWN_ROLES } from "../config/roles.config";

const MainLayout = ({ roles, children }) => {
  const { instance } = useMsal();
  const [loggingOut, setLoggingOut] = useState(false);

  const normalizedRoles = roles.map((r) => r.toLowerCase());
  const accounts = instance.getAllAccounts();
  const account = accounts.length > 0 ? accounts[0] : null;
  const displayName = account?.name || account?.username || "User";

  // Determine role for layout styling
  const role = !account
    ? "guest"
    : normalizedRoles.find((r) => KNOWN_ROLES.includes(r)) || "user";

  const handleLogout = () => {
    devLog("info", `[MainLayout] Logging out user: ${displayName}`);
    setLoggingOut(true);

    // Delay redirect to allow UI update
    setTimeout(() => {
      instance.logoutRedirect();
    }, 100); // 100ms is enough for React to flush
  };

  if (!account) {
    devLog("warn", "[MainLayout] No MSAL account detected.");
  }

  devLog("info", "[MainLayout] Rendering layout for authenticated user.");
  devLog("debug", "[MainLayout] Display name:", displayName);
  devLog("debug", "[MainLayout] Roles passed to layout:", roles);
  devLog("debug", "[MainLayout] MSAL account object:", account);
  devLog("debug", "[MainLayout] Resolved layout role:", role);

  return (
    <div className={`layout-wrapper ${role}`}>
      <Header roles={roles} onLogout={handleLogout} />
      <div className="layout-meta" data-audit="layout-meta">
        {loggingOut ? (
          <span data-audit="user-leaving">Logging out…</span>
        ) : (
          <span data-audit="user-display-name">Welcome, {displayName}</span>
        )}
        <p data-audit="user-roles">
          Roles:{" "}
          {normalizedRoles.length > 0 ? normalizedRoles.join(", ") : "None"}
        </p>
      </div>
      <main className="layout-content">{children}</main>
      <Footer />
    </div>
  );
};

MainLayout.defaultProps = {
  roles: [],
};

MainLayout.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default MainLayout;
