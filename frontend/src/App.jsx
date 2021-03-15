import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import { useAppContext } from "./context/AppContext";

export default function App() {
  const { authToken, setAuthToken } = useAppContext();

  useEffect(() => {
    let token = localStorage.getItem("authToken");
    try {
      token = JSON.parse(token);
      if (token) {
        if (token.exp > new Date().getTime()) {
          setAuthToken(token.token);
        } else {
          console.log("token Expired");
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </BrowserRouter>
  );
}
