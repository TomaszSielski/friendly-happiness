// src/components/LogoutButton.js
import React from "react";
import { useMsal } from "@azure/msal-react";

const LogoutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect(); // or logoutPopup()
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
