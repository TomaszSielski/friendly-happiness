// src/pages/Dashboard.js
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { instance } = useMsal();
  const [claims, setClaims] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const extractClaims = async () => {
      const accounts = instance.getAllAccounts();
      const account = accounts.length > 0 ? accounts[0] : null;

      if (!account) {
        console.warn("No account found for token acquisition.");
        setLoading(false);
        return;
      }

      try {
        const response = await instance.acquireTokenSilent({
          account,
          scopes: ["User.Read"],
        });
        const decoded = parseJwt(response.idToken);
        setClaims(decoded);
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          try {
            const response = await instance.acquireTokenPopup({
              account,
              scopes: ["User.Read"],
            });
            const decoded = parseJwt(response.idToken);
            setClaims(decoded);
          } catch (popupError) {
            console.error("Popup token acquisition failed:", popupError);
          }
        } else {
          console.error("Silent token acquisition failed:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    extractClaims();
  }, [instance]);

  const parseJwt = (token) => {
    try {
      const base64 = token.split(".")[1];
      const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
      return JSON.parse(json);
    } catch (e) {
      console.error("Failed to parse JWT:", e);
      return null;
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Overview of your activities and statistics.</p>

      {loading && <p>Loading token claims...</p>}

      {!loading && claims && (
        <div className="claims">
          <h3>Token Claims</h3>
          <ul>
            {Object.entries(claims).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong>{" "}
                {typeof value === "object" ? (
                  <pre>{JSON.stringify(value, null, 2)}</pre>
                ) : (
                  value.toString()
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
