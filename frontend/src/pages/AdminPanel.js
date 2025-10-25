// src/pages/AdminPanel.js
import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { devLog } from "../utils/logger";
import React from 'react';
const AdminPanel = () => {
  const { instance } = useMsal();
  const accounts = instance.getAllAccounts();
  const account = accounts.length > 0 ? accounts[0] : null;
  const username = account?.username || "unknown";

  useEffect(() => {
    devLog("info", "[AdminPanel] Component mounted.");
    devLog("debug", "[AdminPanel] Accessed by:", username);
  }, [username]);

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Manage users, settings, and other admin tasks here.</p>
    </div>
  );
};

export default AdminPanel;
