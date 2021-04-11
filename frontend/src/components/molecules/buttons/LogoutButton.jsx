import React from "react";
import { useAppContext } from "../../../context/AppContext";

export default function LogoutButton(props) {
  const { setCurrentUser, setAuthToken } = useAppContext();

  const logOut = () => {
    setCurrentUser(null);
    setAuthToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <button onClick={logOut} {...props}>
      Logout
    </button>
  );
}
