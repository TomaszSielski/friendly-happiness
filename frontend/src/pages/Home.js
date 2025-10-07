// src/pages/Home.js
import React from "react";
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";

const Home = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginRedirect(); // or loginPopup()
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Welcome to Friendly Happiness</h2>
      {!isAuthenticated && (
        <>
          <p>Please sign in to continue.</p>
          <button onClick={handleLogin}>Login with Microsoft</button>
        </>
      )}
    </div>
  );
};

export default Home;
