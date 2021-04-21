import React from "react";
import { useHistory } from "react-router";
import { useAppContext } from "../../../context/AppContext";

export default function LogoutButton(props) {
  const { setCurrentUser, setAuthToken } = useAppContext();
  const history = useHistory();

  const logOut = () => {
    setCurrentUser(null);
    setAuthToken(null);
    localStorage.removeItem("authToken");
    history.push("/");
  };

  return (
    <button onClick={logOut} {...props}>
      Logout
    </button>
  );
}
