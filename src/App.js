import React, {useState, useEffect} from "react";
import _ from "lodash";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './Home';
import Team from './Team';
import Player from './Player';
import NavBar from "./NavBar";  
import Standings from "./Standings";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => { 
    if (_.isEmpty(sessionStorage.getItem("teams"))) {
      fetch("https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster&season=20212022")
      .then(res => res.json())
      .then(
        (result) => {
          sessionStorage.setItem("teams", JSON.stringify(result.teams));
          setIsLoaded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    }

  },[]);

  return (

    <Router>
      <div className="App">
        <header>
          <NavBar />
        </header>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/team/:teamId">
            <Team />
          </Route>
          <Route exact path="/team/:teamId/player/:playerId">
            <Player />
          </Route>
          <Route exact path="/standings">
            <Standings />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
