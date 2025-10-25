// frontend/src/pages/AuthLogin.js
import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { devLog } from "../utils/logger";
import React from 'react';
const AuthLogin = () => {
  const { instance } = useMsal();

  useEffect(() => {
    devLog("info", "[AuthLogin] Component mounted.");
    devLog("debug", "[AuthLogin] MSAL instance:", instance);
    devLog("info", "[AuthLogin] Triggering loginRedirect...");
    instance.loginRedirect();
  }, [instance]);

  return <p>Redirecting to Microsoft login…</p>;
};

export default AuthLogin;
