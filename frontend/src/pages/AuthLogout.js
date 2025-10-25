// frontend/src/pages/AuthLogout.js
import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { devLog } from "../utils/logger";
import React from 'react';
const AuthLogout = () => {
  const { instance } = useMsal();
  useEffect(() => {
    devLog("info", "[AuthLogout] Component mounted.");
    devLog("debug", "[AuthLogout] MSAL instance:", instance);
    devLog("info", "[AuthLogout] Triggering logoutRedirect...");
    instance.logoutRedirect();
  }, [instance]);

  return <p>Logging out…</p>;
};

export default AuthLogout;
