import React from "react";
import { useMsal } from "@azure/msal-react";

function App() {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginPopup();
  };

  const handleLogout = () => {
    instance.logoutPopup();
  };

  return (
    <div>
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
