// frontend/src/layout/MainLayout.js
import { useMsal } from "@azure/msal-react";
import { devLog } from "../utils/logger";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/mainLayout.css";

const MainLayout = ({ roles, children }) => {
  const { instance } = useMsal();
  const accounts = instance.getAllAccounts();
  const account = accounts.length > 0 ? accounts[0] : null;
  const displayName = account?.name || account?.username || "User";

  if (!account) {
    devLog("warn", "[MainLayout] No MSAL account detected.");
  }

  devLog("info", "[MainLayout] Rendering layout for authenticated user.");
  devLog("debug", "[MainLayout] Display name:", displayName);
  devLog("debug", "[MainLayout] Roles passed to layout:", roles);
  devLog("debug", "[MainLayout] MSAL account object:", account);

  return (
    <div className="layout-wrapper">
      <Header roles={roles} />
      <div className="layout-meta">
        <span>Welcome, {displayName}</span>
        <p>Roles: {roles.join(", ") || "None"}</p>
      </div>
      <main className="layout-content">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
