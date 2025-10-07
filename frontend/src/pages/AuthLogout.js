import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

const AuthLogout = () => {
  const { instance } = useMsal();

  useEffect(() => {
    instance.logoutRedirect(); // postLogoutRedirectUri handles redirect
  }, [instance]);

  return <p>Logging out…</p>;
};

export default AuthLogout;
