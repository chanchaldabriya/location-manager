import React from "react";
import "./App.css";
import LocationForm from "./components/LocationForm/LocationForm";
import { Route, Switch, Redirect } from "react-router-dom";
import Titlebar from "./components/Titlebar/Titlebar";
import LocationList from "./components/LocationList/LocationList";

function App() {
  return (
    <div className="App">
      <Titlebar title="Locations" />
      <Switch>
        <Route path="/location/:id" component={LocationForm} />

        <Route exact path="/" component={LocationList} />

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
