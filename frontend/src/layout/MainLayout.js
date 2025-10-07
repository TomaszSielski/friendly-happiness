// frontend/src/layout/MainLayout.js
import React from "react";
import { useMsal } from "@azure/msal-react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import LogoutButton from "../components/LogoutButton";

const MainLayout = ({ roles, children }) => {
  const { instance } = useMsal();
  const accounts = instance.getAllAccounts();
  const account = accounts.length > 0 ? accounts[0] : null;
  const displayName = account?.name || account?.username || "User";

  //const displayName = account?.name || "User";
  //const username = account?.username || "User";
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          gap: "10px",
        }}
      >
        <Menu roles={roles} />
        <span>Welcome, {displayName}</span>
        <p style={{ fontSize: "0.85em", color: "#666" }}>
          Roles: {roles.join(", ") || "None"}
        </p>
      </div>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
