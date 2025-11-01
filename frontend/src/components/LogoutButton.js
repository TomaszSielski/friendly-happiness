// src/components/LogoutButton.js
/**
 * @file LogoutButton.js
 * @component LogoutButton
 * @description Reusable logout button that triggers MSAL redirect and logs audit action.
 *
 * @responsibilities
 * - Triggers logout via MSAL redirect
 * - Can be reused across layout, header, or menu components
 * - Logs logout action for audit/debug purposes
 *
 * @styles
 * - Inherits `.nav-button` or `.btn` styles from shared CSS
 * - Uses global tokens for color, spacing, and typography
 *
 * @tokens
 * - Inherits `--main-text`, `--main-bg`, `--font-family`, `--spacing-unit`
 *
 * @auditTag layout-logout-button-v1
 * @lastReviewed 2025-10-28
 */

import React from "react";
import { useMsal } from "@azure/msal-react";
import { devLog } from "../utils/logger";

const LogoutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    devLog("info", "[LogoutButton] Logout triggered by user.");
    instance.logoutRedirect();
  };

  return (
    <button
      onClick={handleLogout}
      className="nav-button"
      type="button"
      data-audit="logout-button"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
