import React from "react";
import { useMsal } from "@azure/msal-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { instance } = useMsal();
  const accounts = instance.getAllAccounts();
  const isAuthenticated = accounts.length > 0;
  const roles =
    accounts[0]?.idTokenClaims?.roles?.map((r) => r.toLowerCase()) || [];

  const normalizedRequiredRoles = Array.isArray(requiredRoles)
    ? requiredRoles.map((r) => r.toLowerCase())
    : requiredRoles
    ? [requiredRoles.toLowerCase()]
    : [];

  const hasAccess =
    normalizedRequiredRoles.length === 0 ||
    normalizedRequiredRoles.some((role) => roles.includes(role));

  if (!isAuthenticated || !hasAccess) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
