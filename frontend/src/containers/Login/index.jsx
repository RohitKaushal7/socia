import React, { useEffect, useState } from "react";
import { getAuthToken } from "../../api-hooks/auth";
import { useAppContext } from "../../context/AppContext";

export default function Login() {
  const { authToken, setAuthToken } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // EFFECTS
  useEffect(() => {}, []);

  // FUNCTIONS

  const handleLogin = () => {
    getAuthToken(email, password)
      .then((token) => {
        setAuthToken(token);
        localStorage.setItem(
          "authToken",
          JSON.stringify({
            token: token,
            exp: new Date().getTime() + 24 * 60 * 60 * 1000,
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // RENDER
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <div className="p-5 bg-red-500 ">{authToken}</div>
    </div>
  );
}
