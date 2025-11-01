// frontend/src/pages/AuthLogin.js
/**
 * @file AuthLogin.js
 * @component AuthLogin
 * @description Triggers Microsoft login redirect using MSAL upon component mount.
 *
 * @responsibilities
 * - Initiates login flow via `instance.loginRedirect()`
 * - Logs authentication events and MSAL instance details
 *
 * @behavior
 * - Automatically redirects to Microsoft login when mounted
 * - Displays temporary message during redirect
 *
 * @integration
 * - Uses `@azure/msal-react` for authentication context
 * - Logs via `devLog` utility
 *
 * @auditTag auth-login-v1
 * @lastReviewed 2025-11-01
 *
 * @todo
 * - Write unit tests to mock MSAL and verify redirect behavior
 */

import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { devLog } from "../utils/logger";
import React from "react";

const AuthLogin = () => {
  const { instance } = useMsal();

  useEffect(() => {
    devLog("info", "[AuthLogin] Component mounted.");
    devLog("debug", "[AuthLogin] MSAL instance:", instance);

    try {
      devLog("info", "[AuthLogin] Triggering loginRedirect...");
      instance.loginRedirect();
    } catch (error) {
      devLog("error", "[AuthLogin] loginRedirect failed:", error);
    }
  }, [instance]);

  return (
    <p role="alert" aria-live="assertive">
      Redirecting to Microsoft login…
    </p>
  );
};

export default AuthLogin;
