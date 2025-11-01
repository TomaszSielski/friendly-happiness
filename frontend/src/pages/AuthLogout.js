// frontend/src/pages/AuthLogout.js
/**
 * @file AuthLogout.js
 * @component AuthLogout
 * @description Triggers Microsoft logout redirect using MSAL upon component mount.
 *
 * @responsibilities
 * - Initiates logout flow via `instance.logoutRedirect()`
 * - Logs authentication events and MSAL instance details
 *
 * @behavior
 * - Automatically redirects to Microsoft logout when mounted
 * - Displays temporary message during logout
 *
 * @integration
 * - Uses `@azure/msal-react` for authentication context
 * - Logs via `devLog` utility
 *
 * @auditTag auth-logout-v1
 * @lastReviewed 2025-11-01
 *
 * @todo
 * - Write unit tests to mock MSAL and verify redirect behavior
 */

import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { devLog } from "../utils/logger";
import React from "react";
const AuthLogout = () => {
  const { instance } = useMsal();
  useEffect(() => {
    devLog("info", "[AuthLogout] Component mounted.");
    devLog("debug", "[AuthLogout] MSAL instance:", instance);
    try {
      devLog("info", "[AuthLogout] Triggering logoutRedirect...");
      instance.logoutRedirect();
    } catch (error) {
      devLog("error", "[AuthLogout] logoutRedirect failed:", error);
    }
  }, [instance]);

  return (
    <p role="alert" aria-live="assertive">
      Logging out…
    </p>
  );
};

export default AuthLogout;
