/**
 * @file authProvider.js
 * @description Provides MSAL initialization and login logic for authentication workflows.
 *
 * @responsibilities
 * - Instantiate and initialize MSAL PublicClientApplication using config from `authConfig`
 * - Handle redirect-based and popup-based login flows depending on iframe context
 * - Log authentication lifecycle events using `devLog` for audit/debug visibility
 *
 * @exports
 * - `initializeMsal`: Asynchronously initializes MSAL instance and returns it
 * - `loginSafely`: Executes login flow using popup or redirect based on iframe detection
 *
 * @returns
 * - `initializeMsal`: Returns initialized MSAL instance
 * - `loginSafely`: Returns login result or throws on failure
 *
 * @behavior
 * - On startup, `initializeMsal` sets up MSAL and logs config details
 * - `loginSafely` detects iframe context and chooses appropriate login method
 * - Both functions log success and error states for traceability
 *
 * @securityNotes
 * - Uses iframe detection to prevent redirect login inside embedded contexts
 *
 * @throws
 * - Initialization or login errors are logged and rethrown for upstream handling
 *
 * @dependencies
 * - `PublicClientApplication` from `@azure/msal-browser` for MSAL client logic
 * - `msalConfig` from `authConfig` for tenant/client/redirect setup
 * - `devLog` for structured logging
 *
 * @auditTag auth-provider-v1
 * @lastReviewed 2025-10-27
 */

import { devLog } from "../utils/logger";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);
let isMsalInitialized = false;

export const initializeMsal = async () => {
  if (isMsalInitialized) return msalInstance;

  try {
    await msalInstance.initialize();
    isMsalInitialized = true;

    devLog("info", "[authProvider] MSAL instance initialized successfully.");
    devLog("debug", "[authProvider] Raw MSAL config:", msalConfig);

    return msalInstance;
  } catch (error) {
    devLog(
      "error",
      "[authProvider] Error initializing MSAL instance:",
      error.message
    );
    throw error;
  }
};

export const loginSafely = async (loginRequest) => {
  if (typeof window === "undefined") {
    devLog(
      "error",
      "[authProvider] Window context unavailable. Cannot determine iframe state."
    );
    throw new Error("Window context unavailable");
  }

  const isIframe = window.self !== window.top;
  devLog(
    "info",
    "[authProvider] Login context:",
    isIframe ? "iframe" : "top-level"
  );
  devLog("debug", "[authProvider] Login request payload:", loginRequest);

  try {
    if (isIframe) {
      devLog("info", "[authProvider] Using popup login due to iframe context.");
      return await msalInstance.loginPopup(loginRequest);
    } else {
      devLog("info", "[authProvider] Using redirect login.");
      return await msalInstance.loginRedirect(loginRequest);
    }
  } catch (error) {
    devLog("error", "[authProvider] Login failed:", error.message);
    throw error;
  }
};
