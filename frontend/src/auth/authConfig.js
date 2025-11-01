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
 * - Loads redirect URIs from environment variables
 * - Throws or logs errors if required variables are missing
 * - Logs selected redirect URI using devLog
 *
 * @auditTag auth-config-v1
 * @lastReviewed 2025-11-01
 */

import { devLog } from "../utils/logger";

const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const postLogoutRedirectUri = process.env.REACT_APP_POST_LOGOUT_URI;
if (!redirectUri || !postLogoutRedirectUri) {
  devLog("error", "[authConfig] Missing redirect URIs in environment.");
  throw new Error("[authConfig] Missing required MSAL environment variables.");
}
if (!process.env.REACT_APP_CLIENT_ID || !process.env.REACT_APP_TENANT_ID) {
  devLog("error", "[authConfig] Missing MSAL env variables.");
}
export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: process.env.REACT_APP_AUTHORITY,
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
