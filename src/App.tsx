import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { Header } from "./components/Header";
import { GlobalContextProvider } from "./global/globalState";
import { ClientCheckin } from "./screens/ClientCheckin/ClientCheckin";
import { ClientRegistrationHouseholdInfo } from "./screens/ClientRegistration/ClienRegistrationHouseholdInfo";
import { ClientRegistration } from "./screens/ClientRegistration/ClientRegistration";
import { ClientRegistrationProvider } from "./screens/ClientRegistration/ClientRegistrationState";
import { ClientRegistrationSuccess } from "./screens/ClientRegistration/ClientRegistrationSuccess";
import { Home } from "./screens/Home";
import { PantryLogin } from "./screens/PantryLogin/PantryLogin";
import { PantryRegistration } from "./screens/PantryRegistration/PantryRegistration";
import { PantryRegistrationSuccess } from "./screens/PantryRegistration/PantryRegistrationSuccess";
import { initFirebase } from "./services/firebase.service";

export default function App() {
  initFirebase();
  return (
    <GlobalContextProvider>
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path="/client/checkin">
              <ClientCheckin />
            </Route>
            <Route exact path="/">
              <BaseRoute />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/pantry/register">
              <PantryRegistration />
            </Route>
            <Route exact path="/pantry/register/success/:pantryId">
              <PantryRegistrationSuccess />
            </Route>
            <Route exact path="/pantry/login">
              <PantryLogin />
            </Route>
            <ClientRegistrationProvider>
              <Route exact path="/client/register">
                <ClientRegistration />
              </Route>
              <Route exact path="/client/register/householdInfo">
                <ClientRegistrationHouseholdInfo />
              </Route>
              <Route exact path="/client/register/success">
                <ClientRegistrationSuccess />
              </Route>
            </ClientRegistrationProvider>
          </Switch>
        </div>
      </Router>
    </GlobalContextProvider>
  );
}

function BaseRoute() {
  const history = useHistory();
  useEffect(() => {
    history.push("/home");
  }, []);
  return null;
}
