import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import _ from "lodash";
import {getTeamRecords} from "./helpers/StandingsHelper";
import {roundWhenNeeded} from "./helpers/CalcHelper";
import { Table } from "react-bootstrap";

export default function Standings() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState(null);

  let sessionStandings = JSON.parse(sessionStorage.getItem("standings"));
  sessionStandings = _.orderBy(sessionStandings, (obj) => parseInt(obj.leagueRank, 10), "asc");
  const [standings, setStandings] = useState(sessionStandings);

  useEffect(() => { 
    if (_.isEmpty(sessionStorage.getItem("standings"))) {
      fetch("https://statsapi.web.nhl.com/api/v1/standings?season=20212022")
      .then(res => res.json())
      .then(
        (result) => {
          let teamRecords = getTeamRecords(result.records);
          sessionStorage.setItem("standings", JSON.stringify(teamRecords));
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

  const requestSort = (key) => {
    console.log("request sort");
    let direction = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    console.log(key);
    console.log(direction);
    setSortConfig({ key, direction });

    if (key == "leagueRank") {
      setStandings(_.orderBy(standings, (obj) => parseInt(obj.leagueRank, 10), direction));
    }
    else {
      setStandings(_.orderBy(standings, key, direction));
    }
    
  };

  function renderStandings() {
    console.log("render");
    let tableRows = [];
    if (!_.isEmpty(standings)) {
      tableRows = standings.map((teamRecord) =>
        <tr>
          <td>{teamRecord.team.name}</td>
          <td>{teamRecord.leagueRank}</td>
          <td>{teamRecord.points}</td>
          <td>{teamRecord.gamesPlayed}</td>
          <td>{roundWhenNeeded(teamRecord.pointsPercentage*100)}</td>
        </tr>
      );
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => requestSort("team.name")}>Team</th>
            <th onClick={() => requestSort("leagueRank")}>Rank</th>
            <th onClick={() => requestSort("points")}>Points</th>
            <th onClick={() => requestSort("gamesPlayed")}>GP</th>
            <th onClick={() => requestSort("pointsPercentage")}>Points %</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </Table>
    );
  }
  
  return (
    <div>
      {renderStandings()}
    </div>
  );
}
