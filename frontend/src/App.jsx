import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Auth from "./containers/Auth";
import { useAppContext } from "./context/AppContext";
import Profile from "./containers/Profile";

export default function App() {
  const { authToken, setAuthToken, setCurrentUser } = useAppContext();

  useEffect(() => {
    let token = localStorage.getItem("authToken");
    try {
      token = JSON.parse(token);
      if (token) {
        if (token.exp > new Date().getTime()) {
          setAuthToken(token.token);
          setCurrentUser(token.user);
        } else {
          console.log("token Expired");
          localStorage.removeItem("authToken");
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />

        {!authToken && <Route exact path="/auth" component={Auth} />}

        {authToken && <Route exact path="/profile" component={Profile} />}

        {/* 404 to Home */}
        {/* <Redirect to="/" /> */}
      </Switch>
    </BrowserRouter>
  );
}
