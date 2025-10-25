// frontend/src/App.js

import React, { useEffect, useState } from "react";
import { devLog } from "./utils/logger";
import { useMsal } from "@azure/msal-react";
import AppRoutes from "./routes/AppRoutes";

import "./styles/global.css";
import "./styles/mainLayout.css";
import MainLayout from "./layout/MainLayout";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const { instance } = useMsal();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existingAccounts = instance.getAllAccounts();
    setAccounts(existingAccounts);

    const extractedRoles =
      existingAccounts.length > 0 && existingAccounts[0].idTokenClaims
        ? existingAccounts[0].idTokenClaims.roles || []
        : [];

    devLog("debug", "[App] Accounts found:", existingAccounts);
    devLog("debug", "[App] Roles extracted:", extractedRoles);

    setLoading(false);
  }, [instance]);

  if (loading) {
    return <LoadingScreen message="Checking your Microsoft login session…" />;
  }

  const isAuthenticated = accounts.length > 0;
  const roles =
    isAuthenticated && accounts[0].idTokenClaims
      ? (accounts[0].idTokenClaims.roles || []).map((r) => r.toLowerCase())
      : [];

  return isAuthenticated ? (
    <MainLayout roles={roles}>
      <AppRoutes roles={roles} />
    </MainLayout>
  ) : (
    <AppRoutes roles={[]} />
  );
}

export default App;
