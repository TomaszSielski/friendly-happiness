/**
 * @file App.js
 * @component App
 * @description Root-level component responsible for initializing authentication, extracting user roles, and rendering role-aware layout and routes.
 *
 * @responsibilities
 * - Initializes MSAL authentication context via `useMsal`
 * - Retrieves MSAL accounts and extracts role claims from ID token
 * - Normalizes role values using `ROLE_NORMALIZATION` and filters against `KNOWN_ROLES`
 * - Logs authentication and role data using `devLog` for audit/debug purposes
 * - Displays a loading screen during session resolution
 * - Renders `MainLayout` and `AppRoutes` with role-aware props if authenticated
 * - Falls back to unauthenticated routing if no account is found
 *
 * @dependencies
 * - MSAL React SDK (`useMsal`) for authentication context
 * - `ROLE_NORMALIZATION`, `KNOWN_ROLES` from `roles.config.js` for role mapping
 * - `MainLayout` for layout rendering
 * - `AppRoutes` for conditional routing
 * - `LoadingScreen` for session check UX
 * - `devLog` for structured logging
 *
 * @auditTag app-root-v1
 * @lastReviewed 2025-11-01
 *
 * @notes
 * - Role normalization ensures compatibility between Entra ID token values and internal role config
 * - Layout and routing components receive `roles` as props for scoped rendering
 * - Role fallback logic ensures graceful degradation for unknown or missing claims
 */

import React, { useEffect, useState } from "react";
import { devLog } from "./utils/logger";
import { useMsal } from "@azure/msal-react";
import AppRoutes from "./routes/AppRoutes";
import { ROLE_NORMALIZATION, KNOWN_ROLES } from "./config/roles.config";
import "./styles/global.css";
import "./styles/mainLayout.css";
import MainLayout from "./layout/MainLayout";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const { instance } = useMsal();
  const [accounts, setAccounts] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const existingAccounts = instance.getAllAccounts();
      setAccounts(existingAccounts);

      const extractedRoles =
        existingAccounts.length > 0 && existingAccounts[0].idTokenClaims
          ? (existingAccounts[0].idTokenClaims.roles || [])
              .map((r) => r.toLowerCase())
              .map((r) => ROLE_NORMALIZATION[r] || r)
              .filter((r) => KNOWN_ROLES.includes(r))
          : [];

      devLog("debug", "[App] Accounts found:", existingAccounts);
      devLog("debug", "[App] Roles extracted:", extractedRoles);

      setRoles(extractedRoles);
    } catch (err) {
      devLog("error", "[App] MSAL role extraction failed:", err);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  }, [instance]);

  if (loading) {
    return <LoadingScreen message="Checking your Microsoft login session…" />;
  }

  const isAuthenticated = accounts.length > 0;

  return isAuthenticated ? (
    <MainLayout roles={roles} data-audit="app-authenticated">
      <AppRoutes roles={roles} />
    </MainLayout>
  ) : (
    <AppRoutes roles={[]} data-audit="app-unauthenticated" />
  );
}

export default App;
