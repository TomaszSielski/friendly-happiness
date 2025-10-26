// frontend/src/App.js
/**
 * @component App
 * @description Root application component responsible for:
 * - Initializing MSAL authentication context
 * - Extracting user roles from ID token claims
 * - Rendering role-aware layout and routes
 *
 * @behavior
 * - On mount, retrieves all MSAL accounts and extracts roles from the first account's ID token
 * - Logs account and role data using devLog for audit/debug purposes
 * - Displays a loading screen until authentication state is resolved
 * - Renders MainLayout with role-based routing if authenticated
 * - Falls back to unauthenticated routes if no account is found
 *
 * @dependencies
 * - useMsal from @azure/msal-react for authentication context
 * - MainLayout and AppRoutes for conditional rendering
 * - LoadingScreen for initial session check
 *
 * @styles
 * - Applies global and layout styles from frontend/src/styles
 */
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
