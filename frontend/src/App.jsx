import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
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
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      {authToken ? (
        <>
          <Route exact path="/profile" component={Profile} />
        </>
      ) : (
        <>
          <Route exact path="/auth" component={Auth} />
        </>
      )}

      <Route
        path="/"
        component={() => {
          if (authToken) {
            return <Redirect to="/profile" />;
          } else {
            return <Redirect to="/auth" />;
          }
        }}
      />
    </BrowserRouter>
  );
}
