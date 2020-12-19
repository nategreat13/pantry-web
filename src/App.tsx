import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ClientRegistrationHouseholdInfo } from "./screens/ClientRegistration/ClienRegistrationHouseholdInfo";
import { ClientRegistration } from "./screens/ClientRegistration/ClientRegistration";
import { ClientRegistrationProvider } from "./screens/ClientRegistration/ClientRegistrationState";
import { Home } from "./screens/Home";
import { PantryRegistration } from "./screens/PantryRegistration";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/pantryRegistration">
            <PantryRegistration />
          </Route>
          <ClientRegistrationProvider>
            <Route exact path="/clientRegistration">
              <ClientRegistration />
            </Route>
            <Route exact path="/clientRegistration/householdInfo">
              <ClientRegistrationHouseholdInfo />
            </Route>
          </ClientRegistrationProvider>
        </Switch>
      </div>
    </Router>
  );
}
