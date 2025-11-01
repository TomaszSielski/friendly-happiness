/**
 * @file AppRoutes.js
 * @component AppRoutes
 * @description Centralized route configuration with role-aware access control and conditional redirection.
 *
 * @responsibilities
 * - Defines public, protected, and fallback routes
 * - Redirects authenticated users from public entry points
 * - Enforces role-based access via `ProtectedRoute`
 *
 * @behavior
 * - Redirects to `/dashboard` if authenticated
 * - Allows access to `/admin` only for users with "admin" role
 * - Wraps all unknown routes with `ProtectedRoute` fallback
 *
 * @integration
 * - Uses `react-router-dom` for routing
 * - Uses `ProtectedRoute` for access control
 * - Integrates with MSAL-authenticated role data
 * - References `KNOWN_ROLES` from `roles.config.js`
 *
 * @auditTag app-routes-v1
 * @lastReviewed 2025-11-01
 *
 * @todo
 * - Refactor route definitions into a config array for scalability
 * - Write unit tests for redirection and role-based access logic
 */

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { KNOWN_ROLES } from "../config/roles.config";

import Home from "../pages/Home";
import AuthLogin from "../pages/AuthLogin";
import AuthLogout from "../pages/AuthLogout";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import AdminPanel from "../pages/AdminPanel";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = ({ roles }) => {
  const normalizedRoles = roles.map((r) => r.toLowerCase());
  const isAuthenticated = normalizedRoles.length > 0;
  const AUTHENTICATED_ROLES = KNOWN_ROLES.filter((r) => r !== "guest");

  return (
    <Routes>
      {/* Public Home Route — only for guests */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Home />
        }
      />

      {/* Login Route — redirect if already authenticated */}
      <Route
        path="/auth/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthLogin />
        }
      />

      {/* Logout Route — always accessible */}
      <Route path="/auth/logout" element={<AuthLogout />} />

      {/* Protected Routes — accessible to authenticated users */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRoles={AUTHENTICATED_ROLES}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute requiredRoles={AUTHENTICATED_ROLES}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute requiredRoles={AUTHENTICATED_ROLES}>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Admin-only Route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      {/* Fallback Route — protected */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

AppRoutes.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default AppRoutes;
