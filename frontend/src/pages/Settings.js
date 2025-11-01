/**
 * @file Settings.js
 * @component Settings
 * @description Role-aware settings page for user personalization, including theme preferences.
 *
 * @responsibilities
 * - Resolves user role from MSAL ID token
 * - Loads and applies saved theme preference from localStorage
 * - Allows toggling between Dark and Light themes
 * - Persists theme choice across sessions
 * - Logs role and theme state for audit/debug purposes
 *
 * @behavior
 * - Applies initial theme on mount based on saved preference or default
 * - Displays current theme and toggle button
 * - Updates `data-theme` attribute on `<body>` and saves to localStorage
 * - Restricts access via ProtectedRoute to authenticated roles (excludes "guest")
 *
 * @integration
 * - Uses `@azure/msal-react` for authentication context
 * - References `KNOWN_ROLES` from `roles.config.js` for role validation
 * - Logs via `devLog` utility
 *
 * @styles
 * - Scoped via `.Settings` and `.theme-toggle` classes
 * - Theme applied globally via `body[data-theme]`
 *
 * @auditTag settings-page-v1
 * @lastReviewed 2025-11-01
 *
 * @todo
 * - Add support for language and layout preferences
 * - Externalize theme logic into a reusable hook
 * - Add accessibility enhancements for theme toggle
 */

import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { KNOWN_ROLES } from "../config/roles.config";
import { devLog } from "../utils/logger";

const Settings = () => {
  const { instance } = useMsal();
  const [resolvedRole, setResolvedRole] = useState("guest");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const account = instance.getActiveAccount();
    const tokenClaims = account?.idTokenClaims || {};
    const rawRoles = tokenClaims.roles || [];

    const normalized = rawRoles
      .map((r) => r.toLowerCase())
      .filter((r) => KNOWN_ROLES.includes(r));

    const role = normalized[0] || "guest";
    setResolvedRole(role);
    devLog("debug", "[Settings] Resolved role:", role);

    const savedTheme = localStorage.getItem("theme");
    const initialTheme =
      savedTheme || document.body.getAttribute("data-theme") || "light";
    setTheme(initialTheme);
    document.body.setAttribute("data-theme", initialTheme);
    devLog("debug", "[Settings] Initial theme:", initialTheme);
  }, [instance]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    devLog("info", "[Settings] Theme switched to:", newTheme);
  };

  return (
    <div className="Settings" data-role={resolvedRole}>
      <h2>Settings</h2>
      <p>Personalization</p>

      <div className="theme-toggle">
        <p>
          <strong>Current Theme:</strong> {theme}
        </p>
        <button onClick={toggleTheme}>
          Switch to {theme === "dark" ? "Light" : "Dark"} Theme
        </button>
      </div>
    </div>
  );
};

export default Settings;
