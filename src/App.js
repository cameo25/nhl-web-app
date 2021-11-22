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
import {getTeamRecords} from "./helpers/StandingsHelper";

export default function App() {
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [standings, setStandings] = useState([]);

  useEffect(() => { 
    if (_.isEmpty(sessionStorage.getItem("teams"))) {
      fetch("https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster&season=20212022")
      .then(res => res.json())
      .then(
        (result) => {
          sessionStorage.setItem("teams", JSON.stringify(result.teams));
          setTeams(result.teams);
        },
        (error) => {
          setError(error);
        }
      )
    } else {
      setTeams(JSON.parse(sessionStorage.getItem("teams")));
    }

    if (_.isEmpty(sessionStorage.getItem("standings"))) {
      fetch("https://statsapi.web.nhl.com/api/v1/standings?season=20212022")
      .then(res => res.json())
      .then(
        (result) => {
          let teamRecords = getTeamRecords(result.records);
          sessionStorage.setItem("standings", JSON.stringify(teamRecords));

          let sessionStandings = _.orderBy(teamRecords, (obj) => parseInt(obj.leagueRank, 10), "asc");
          setStandings(sessionStandings);
        },
        (error) => {
          setError(error);
        }
      )
    }
    else {
      let sessionStandings = _.orderBy(JSON.parse(sessionStorage.getItem("standings")), (obj) => parseInt(obj.leagueRank, 10), "asc");
      setStandings(sessionStandings);
    }


  },[]);


  return (

    <Router>
      <div className="App container-fluid">
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
            <Home teams={teams}/>
          </Route>
          <Route exact path="/team/:teamId">
            <Team teams={teams}/>
          </Route>
          <Route exact path="/team/:teamId/player/:playerId">
            <Player />
          </Route>
          <Route exact path="/standings">
            <Standings standings={standings} setStandings={setStandings}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
