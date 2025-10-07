// frontend/src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import App from "./App";
import { initializeMsal } from "./auth/authProvider";

const startApp = async () => {
  const msalInstance = await initializeMsal();

  try {
    const redirectResult = await msalInstance.handleRedirectPromise();
    if (redirectResult) {
      console.log("Login successful:", redirectResult.account);
    }
  } catch (error) {
    console.error("MSAL redirect error:", error);
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </BrowserRouter>
  );
};

startApp();
