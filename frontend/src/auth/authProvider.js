// src/auth/authProvider.js
import { devLog } from "../utils/logger";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

export const initializeMsal = async () => {
  try {
    await msalInstance.initialize();
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
  const isIframe = window.self !== window.top;
  devLog(
    "info",
    "[authProvider] Login context:",
    isIframe ? "iframe" : "top-level"
  );

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
