/**
 * @file ProtectedRoute.js
 * @component ProtectedRoute
 * @description Role-based route guard using Azure AD authentication via MSAL.
 *
 * @responsibilities
 * - Validates user authentication status via MSAL
 * - Checks user roles against required roles
 * - Redirects unauthorized users to home page
 * - Logs access decisions for audit/debug purposes
 *
 * @behavior
 * - Renders `children` if user is authenticated and has required roles
 * - Redirects to "/" if access is denied
 * - Normalizes role strings for case-insensitive matching
 *
 * @integration
 * - Uses `@azure/msal-react` for authentication context
 * - Uses `react-router-dom` for navigation control
 * - Logs via `devLog` utility
 * - References `KNOWN_ROLES` from `roles.config.js`
 *
 * @auditTag route-guard-v1
 * @lastReviewed 2025-11-01
 *
 * @todo
 * - Add edge case handling for missing or malformed account data
 * - Improve accessibility by managing focus after redirects
 * - Write unit tests for role matching and redirect logic
 */

import React from "react";
import PropTypes from "prop-types";
import { useMsal } from "@azure/msal-react";
import { Navigate } from "react-router-dom";
import { devLog } from "../utils/logger";
import { ROLE_NORMALIZATION, KNOWN_ROLES } from "../config/roles.config";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { instance } = useMsal();
  const accounts = instance.getAllAccounts();
  const account = accounts.length > 0 ? accounts[0] : null;
  const isAuthenticated = !!account;

  const rawRoles = account?.idTokenClaims?.roles || [];
  const normalizeRoles = (roles) =>
    roles
      .map((r) => r.toLowerCase())
      .map((r) => ROLE_NORMALIZATION[r] || r)
      .filter((r) => KNOWN_ROLES.includes(r));

  const normalizedUserRoles = normalizeRoles(rawRoles);
  const normalizedRequiredRoles = Array.isArray(requiredRoles)
    ? requiredRoles.map((r) => r.toLowerCase())
    : typeof requiredRoles === "string"
    ? [requiredRoles.toLowerCase()]
    : [];

  const hasAccess =
    normalizedRequiredRoles.length === 0 ||
    normalizedRequiredRoles.some((role) => normalizedUserRoles.includes(role));

  devLog("info", "[ProtectedRoute] Checking access for protected route.");
  devLog("debug", "[ProtectedRoute] Authenticated:", isAuthenticated);
  devLog("debug", "[ProtectedRoute] User roles:", normalizedUserRoles);
  devLog("debug", "[ProtectedRoute] Required roles:", normalizedRequiredRoles);
  devLog("debug", "[ProtectedRoute] Access granted:", hasAccess);

  if (!isAuthenticated || !hasAccess) {
    devLog("warn", "[ProtectedRoute] Access denied. Redirecting to home.");
    return <Navigate to="/" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRoles: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default ProtectedRoute;
