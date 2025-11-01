/**
 * @file AdminPanel.js
 * @component AdminPanel
 * @description Admin interface for managing users, settings, and privileged tasks. Logs access via MSAL.
 *
 * @responsibilities
 * - Renders static admin panel content
 * - Retrieves current user from MSAL context
 * - Logs access metadata for audit/debug purposes
 *
 * @behavior
 * - Displays username of accessing account
 * - Logs component mount and access details
 *
 * @integration
 * - Uses `@azure/msal-react` for authentication context
 * - Logs via `devLog` utility
 * - Uses `KNOWN_ROLES` from `roles.config.js` for role resolution
 *
 * @auditTag admin-panel-v1
 * @lastReviewed 2025-11-01
 *
 * @todo
 * - Add edge case handling for missing or malformed account data
 * - Improve accessibility with semantic roles and ARIA attributes
 * - Write unit tests for username extraction and logging behavior
 */

import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { devLog } from "../utils/logger";
import { KNOWN_ROLES } from "../config/roles.config";

const AdminPanel = () => {
  const { instance } = useMsal();
  const accounts = instance.getAllAccounts();
  const account = accounts.length > 0 ? accounts[0] : null;
  const username = account?.username || "unknown";

  const normalizedRoles =
    account?.idTokenClaims?.roles?.map((r) => r.toLowerCase()) || [];

  const resolvedRole = !account
    ? "guest"
    : normalizedRoles.find((r) => KNOWN_ROLES.includes(r)) || "user";

  useEffect(() => {
    devLog("info", "[AdminPanel] Component mounted.");
    devLog("debug", "[AdminPanel] Accessed by:", username);
    devLog("debug", "[AdminPanel] Resolved role:", resolvedRole);
  }, [username, resolvedRole]);

  return (
    <div className="layout-wrapper" data-role={resolvedRole}>
      <h2>Admin Panel</h2>
      <p>Manage users, settings, and other admin tasks here.</p>
    </div>
  );
};

export default AdminPanel;
