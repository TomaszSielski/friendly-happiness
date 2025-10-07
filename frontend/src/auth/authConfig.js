// src/auth/authConfig.js
export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
    redirectUri: "https://localhost:3000/auth/login",
    postLogoutRedirectUri: "https://localhost:3000/", // or /auth/logout if you want a message
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};
