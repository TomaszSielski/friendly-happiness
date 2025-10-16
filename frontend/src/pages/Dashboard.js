// src/pages/Dashboard.js
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { devLog } from "../utils/logger";

const Dashboard = () => {
  const { instance } = useMsal();
  const [claims, setClaims] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatTimestamp = (value) => {
    const date = new Date(value * 1000);
    return `${date.toLocaleString()} (${date.toDateString()})`;
  };

  useEffect(() => {
    const extractClaims = async () => {
      const accounts = instance.getAllAccounts();
      const account = accounts.length > 0 ? accounts[0] : null;

      if (!account) {
        devLog("warn", "[Dashboard] No account found for token acquisition.");
        setLoading(false);
        return;
      }

      try {
        const response = await instance.acquireTokenSilent({
          account,
          scopes: ["User.Read"],
        });
        const decoded = JSON.parse(
          atob(
            response.idToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
          )
        );
        devLog("info", "[Dashboard] Claims loaded:", decoded);
        if (decoded?.exp) {
          devLog(
            "info",
            "[Dashboard] Token expires at:",
            formatTimestamp(decoded.exp)
          );
        }
        setClaims(decoded);
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          try {
            const response = await instance.acquireTokenPopup({
              account,
              scopes: ["User.Read"],
            });
            const decoded = JSON.parse(
              atob(
                response.idToken
                  .split(".")[1]
                  .replace(/-/g, "+")
                  .replace(/_/g, "/")
              )
            );
            devLog("info", "[Dashboard] Claims loaded (popup):", decoded);
            if (decoded?.exp) {
              devLog(
                "info",
                "[Dashboard] Token expires at (popup):",
                formatTimestamp(decoded.exp)
              );
            }
            setClaims(decoded);
          } catch (popupError) {
            devLog(
              "error",
              "[Dashboard] Popup token acquisition failed:",
              popupError
            );
          }
        } else {
          devLog(
            "error",
            "[Dashboard] Silent token acquisition failed:",
            error
          );
        }
      } finally {
        setLoading(false);
      }
    };

    extractClaims();
  }, [instance]);

  const renderBadges = (items) => (
    <div className="claim-badge-group">
      {items.map((item, index) => (
        <span key={index} className="claim-badge">
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Overview of your activities and statistics.</p>

      {loading && <p>Loading token claims...</p>}

      {!loading && claims && (
        <div className="claim-summary">
          <p>
            <strong>Username:</strong>{" "}
            {claims.preferred_username || claims.name || "—"}
          </p>
          <p>
            <strong>Roles:</strong>{" "}
            {claims.roles ? renderBadges(claims.roles) : "None"}
          </p>
          <p>
            <strong>Token Expires:</strong>{" "}
            {claims.exp ? formatTimestamp(claims.exp) : "—"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
