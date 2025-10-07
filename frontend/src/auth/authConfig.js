// src/auth/authConfig.js
import { devLog } from "../utils/logger";
export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
    redirectUri: "https://localhost:3000/auth/login",
    postLogoutRedirectUri: "https://localhost:3000/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};
devLog(
  "info",
  "[authConfig]MSAL config initialized with redirect URI:",
  msalConfig.auth.redirectUri
);
