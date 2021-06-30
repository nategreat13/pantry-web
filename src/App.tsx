import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { Header } from "./components/Header";
import { GlobalContextProvider, useGlobalContext } from "./global/globalState";
import { ClientCheckin } from "./screens/ClientCheckin/ClientCheckin";
import { ClientRegistrationHouseholdInfo } from "./screens/ClientRegistration/ClienRegistrationHouseholdInfo";
import { ClientRegistration } from "./screens/ClientRegistration/ClientRegistration";
import { ClientRegistrationProvider } from "./screens/ClientRegistration/ClientRegistrationState";
import { ClientRegistrationSuccess } from "./screens/ClientRegistration/ClientRegistrationSuccess";
import { ClientUpload } from "./screens/ClientUpload/ClientUpload";
import { PantryLogin } from "./screens/PantryLogin/PantryLogin";
import { PantryLookup } from "./screens/PantryLookup/PantryLookup";
import { PantryRegistration } from "./screens/PantryRegistration/PantryRegistration";
import { PantryRegistrationSuccess } from "./screens/PantryRegistration/PantryRegistrationSuccess";
import { Reports } from "./screens/Reports/Reports";

export default function App() {
  return (
    <GlobalContextProvider>
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path="/client/checkin">
              <ClientCheckin />
            </Route>
            <Route exact path="/pantry/lookup">
              <PantryLookup />
            </Route>
            <Route exact path="/">
              <BaseRoute />
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
              <Route exact path="/client/upload">
                <ClientUpload />
              </Route>
              <Route exact path="/reports">
                <Reports />
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
  const [globalState, setGlobalState] = useGlobalContext();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      if (user) {
        setGlobalState({ user });
        history.push("/client/checkin");
      }
    } else {
      history.push("/pantry/login");
    }
  }, []);
  return null;
}
