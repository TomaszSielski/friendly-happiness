import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import Spinner from "./components/Spinner";

function App() {
  const { instance, accounts } = useMsal();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accounts = instance.getAllAccounts();
    setLoading(false);
  }, [instance]);

  const handleLogin = async () => {
    try {
      await instance.loginPopup();
    } catch (error) {
      if (error.errorCode === "user_cancelled") {
        console.log("User cancelled the login.");
      } else console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    instance.logoutPopup();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Welcome to Friendly Happiness</h1>
      <p>Your journey to happiness starts here.</p>
      {accounts.length > 0 ? (
        <>
          <h1>Welcome, {accounts[0].username}</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Microsoft</button>
      )}
    </div>
  );
}

export default App;
