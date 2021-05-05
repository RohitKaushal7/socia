import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../../assets/scss/styles.scss";
import Chat from "./Chat";
import Join from "./Join";

export default function ChatScreen() {
  return (
    <div className="bg-gray-800 text-white">
      <Router>
        <Switch>
          <Route exact path="/chat/:name/:room" component={Chat} />
          <Route exact path="/chat" component={Join} />
        </Switch>
      </Router>
    </div>
  );
}
