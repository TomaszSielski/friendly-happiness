import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

const AuthLogin = () => {
  const { instance } = useMsal();

  useEffect(() => {
    instance.loginRedirect(); // or loginPopup()
  }, [instance]);

  return <p>Redirecting to Microsoft login…</p>;
};

export default AuthLogin;
