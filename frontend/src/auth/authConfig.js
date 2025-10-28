// src/auth/authConfig.js
/**
 * @file authConfig.js
 * @envNotes
 * - Requires `REACT_APP_CLIENT_ID` and `REACT_APP_TENANT_ID` in `.env`

 * @description MSAL configuration for authentication setup.
 *
 * @responsibilities
 * - Define MSAL client settings including tenant, client ID, and redirect URIs
 * - Configure caching strategy for authentication state
 * - Log initialization details for audit/debug purposes
 *
 * @behavior
 * - Dynamically selects redirect URI based on current hostname
 * - Logs selected redirect URI using devLog
 *
 * @auditTag auth-config-v1
 * @lastReviewed 2025-10-27
 */

import { devLog } from "../utils/logger";

const hostname = window.location.hostname;
let redirectUri = "https://localhost:3000/auth/login";
let postLogoutRedirectUri = "https://localhost:3000/";

if (hostname.includes("netlify.app")) {
  redirectUri = "https://stunning-phoenix-a34b0a.netlify.app/auth/login";
  postLogoutRedirectUri = "https://stunning-phoenix-a34b0a.netlify.app/";
}
if (!process.env.REACT_APP_CLIENT_ID || !process.env.REACT_APP_TENANT_ID) {
  devLog("error", "[authConfig] Missing MSAL env variables.");
}
export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
    redirectUri,
    postLogoutRedirectUri,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

devLog(
  "info",
  "[authConfig] MSAL config initialized with redirect URI:",
  redirectUri
);
