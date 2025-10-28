// frontend/src/index.js
/**
 * @file index.js
 * @description Entry point for the React application.
 *
 * @responsibilities
 * - Initializes MSAL authentication instance via `initializeMsal`
 * - Handles redirect-based login flow using `handleRedirectPromise`
 * - Logs authentication outcomes using `devLog` for audit/debug purposes
 * - Mounts the React app into the DOM using React 18's `createRoot`
 * - Wraps the app in `BrowserRouter` for routing and `MsalProvider` for authentication context
 *
 * @behavior
 * - On startup, awaits MSAL initialization and redirect result
 * - If login is successful, logs the authenticated account
 * - If redirect fails, logs the error for audit visibility
 * - Renders the root `<App />` component inside routing and auth providers
 *
 * @dependencies
 * - React and ReactDOM for rendering
 * - react-router-dom for client-side routing
 * - @azure/msal-react for authentication context
 * - initializeMsal from `authProvider` for MSAL setup
 * - devLog for structured audit/debug logging
 *
 * @auditTag frontend-entry-v1
 * @lastReviewed 2025-10-27
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import App from "./App";
import { initializeMsal } from "./auth/authProvider";
import { devLog } from "./utils/logger";

const startApp = async () => {
  const msalInstance = await initializeMsal();

  try {
    const redirectResult = await msalInstance.handleRedirectPromise();
    if (redirectResult) {
      devLog("info", "Login successful:", redirectResult.account);
    }
  } catch (error) {
    devLog("error", "MSAL redirect error:", error);
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <App data-audit="app-root" />
      </MsalProvider>
    </BrowserRouter>
  );
};

startApp();
