import React from 'react';
import './App.css';
import Home from './pages/Home';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/location/:id" render={() => <h1>Hello</h1>} />

        <Route exact path="/" component={Home} />

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
