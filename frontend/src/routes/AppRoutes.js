import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLogin from "../pages/AuthLogin";
import AuthLogout from "../pages/AuthLogout";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import AdminPanel from "../pages/AdminPanel";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import PropTypes from 'prop-types';

const AppRoutes = ({ roles }) => {
  const isAuthenticated = roles.length > 0;

  return (
    <Routes>
      {/* Public Route with redirect for authenticated users */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Home />
        }
      />

      {/* Login redirect if already authenticated */}
      <Route
        path="/auth/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthLogin />
        }
      />

      {/* Logout is always accessible */}
      <Route path="/auth/logout" element={<AuthLogout />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRoles="admins">
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      {/* Protected fallback route */}
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
  roles: PropTypes.arrayOf(PropTypes.string)
};
export default AppRoutes;
