// src/components/LogoutButton.js
// not used - to be deleted
import { useMsal } from "@azure/msal-react";

const LogoutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
