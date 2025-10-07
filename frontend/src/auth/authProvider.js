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
