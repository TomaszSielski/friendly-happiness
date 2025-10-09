// src/pages/Home.js
import React from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import "../styles/home.css"; // new stylesheet
import logo from "../assets/logo.svg";

const Home = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginRedirect();
  };

  return (
    <div className="home-wrapper">
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
