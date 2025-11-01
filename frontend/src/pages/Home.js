// src/pages/Home.js
/**
 * @file Home.js
 * @component Home
 * @description Public landing page that welcomes users and initiates Microsoft login via MSAL.
 *
 * @responsibilities
 * - Displays welcome message and branding
 * - Prompts unauthenticated users to sign in
 * - Triggers login redirect via MSAL
 *
 * @behavior
 * - Shows login button only if user is not authenticated
 * - Uses `useIsAuthenticated` to conditionally render content
 *
 * @styles
 * - Defined in `frontend/src/styles/home.css`
 * - Uses `.home-wrapper`, `.home-content`, `.home-logo`, `.login-button`, `.home-footer`
 *
 * @integration
 * - Uses `@azure/msal-react` for authentication context
 * - Loads logo from `frontend/src/assets/logo.svg`
 *
 * @auditTag home-page-v1
 * @lastReviewed 2025-11-01
 *
 * @todo
 * - Add accessibility roles and landmarks for improved screen reader support
 * - Write unit tests for conditional rendering and login trigger
 */

import React from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import "../styles/home.css";
import logo from "../assets/logo.svg";

const Home = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginRedirect();
  };

  return (
    <div className="home-wrapper" data-role="guest">
      <div className="home-content">
        <img src={logo} alt="App Logo" className="home-logo" />
        <h1>
          Welcome to <span>Friendly Happiness</span>
        </h1>
        {!isAuthenticated && (
          <>
            <p>Please sign in to continue.</p>
            <button className="login-button" onClick={handleLogin}>
              Login with Microsoft
            </button>
          </>
        )}
      </div>
      <footer className="home-footer">
        <p>© 2025 Friendly Happiness · v1.0.0</p>
      </footer>
    </div>
  );
};

export default Home;
