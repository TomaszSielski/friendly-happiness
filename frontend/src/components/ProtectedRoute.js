// src/components/ProtectedRoute.js
import { useMsal } from "@azure/msal-react";
import { Navigate } from "react-router-dom";
import { devLog } from "../utils/logger";
import React from 'react';
import PropTypes from 'prop-types';


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

  devLog("info", "[ProtectedRoute] Checking access for protected route.");
  devLog("debug", "[ProtectedRoute] Authenticated:", isAuthenticated);
  devLog("debug", "[ProtectedRoute] User roles:", roles);
  devLog("debug", "[ProtectedRoute] Required roles:", normalizedRequiredRoles);
  devLog("debug", "[ProtectedRoute] Access granted:", hasAccess);

  if (!isAuthenticated || !hasAccess) {
    devLog("warn", "[ProtectedRoute] Access denied. Redirecting to home.");
    return <Navigate to="/" replace />;
  }

  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node,
  requiredRoles: PropTypes.arrayOf(PropTypes.string)
};
export default ProtectedRoute;
