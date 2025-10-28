// src/pages/Profile.js
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useEffect, useState } from "react";
import "../styles/profile.css";
import { devLog } from "../utils/logger";
import React from 'react';
import PropTypes from 'prop-types';


const timestampsKeys = ["iat", "exp", "nbf", "auth_time"];

const formatTimestamp = (value) => {
  const date = new Date(value * 1000);
  return `${date.toLocaleString()} (${date.toDateString()})`;
};

const renderBadges = (items) => (
  <div className="claim-badge-group">
    {items.map((item, index) => (
      <span key={index} className="claim-badge">
        {item}
      </span>
    ))}
  </div>
);



const CollapsibleClaim = ({ value }) => {
  const [expanded, setExpanded] = useState(false);
  const stringified =
    typeof value === "string" ? value : JSON.stringify(value, null, 2);
  const isLong = stringified.length > 80;

  if (!isLong) return <span>{stringified}</span>;

  return (
    <span>
      {expanded ? <pre>{stringified}</pre> : `${stringified.slice(0, 80)}... `}
      <button onClick={() => setExpanded(!expanded)} className="claim-toggle">
        {expanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
};
CollapsibleClaim.propTypes = {
  value: PropTypes.any
};
const Profile = () => {
  const { instance } = useMsal();
  const [claims, setClaims] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const extractClaims = async () => {
      const accounts = instance.getAllAccounts();
      const account = accounts.length > 0 ? accounts[0] : null;

      if (!account) {
        devLog("warn", "[Profile] No account found for token acquisition.");
        setLoading(false);
        return;
      }

      try {
        const response = await instance.acquireTokenSilent({
          account,
          scopes: ["User.Read"],
        });
        const decoded = parseJwt(response.idToken);
        devLog("info", "[Profile] Claims loaded:", decoded);
        if (decoded?.exp) {
          devLog(
            "info",
            "[Profile] Token expires at:",
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
            const decoded = parseJwt(response.idToken);
            devLog("info", "[Profile] Claims loaded (popup):", decoded);
            if (decoded?.exp) {
              devLog(
                "info",
                "[Profile] Token expires at (popup):",
                formatTimestamp(decoded.exp)
              );
            }
            setClaims(decoded);
          } catch (popupError) {
            devLog(
              "error",
              "[Profile] Popup token acquisition failed:",
              popupError
            );
          }
        } else {
          devLog("error", "[Profile] Silent token acquisition failed:", error);
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
      devLog("error", "[Profile] Failed to parse JWT:", e);
      return null;
    }
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>Detailed identity and token metadata.</p>

      {loading && <p>Loading token claims...</p>}

      {!loading && claims && (
        <div className="claims">
          <h3>Token Claims</h3>
          <ul>
            {Object.entries(claims).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong>{" "}
                {timestampsKeys.includes(key) && typeof value === "number" ? (
                  formatTimestamp(value)
                ) : Array.isArray(value) &&
                  (key === "roles" || key === "groups") ? (
                  renderBadges(value)
                ) : (
                  <CollapsibleClaim value={value} />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
