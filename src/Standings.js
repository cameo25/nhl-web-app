import React, {useState, useEffect} from "react";
import _ from "lodash";
import {getTeamRecords} from "./helpers/StandingsHelper";
import {roundWhenNeeded} from "./helpers/CalcHelper";
import { Table } from "react-bootstrap";

export default function Standings(props) {
  const [sortConfig, setSortConfig] = useState(null);

  const requestSort = (key) => {
    let direction = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    if (key == "leagueRank") {
      props.setStandings(_.orderBy(props.standings, (obj) => parseInt(obj.leagueRank, 10), direction));
    }
    else {
      props.setStandings(_.orderBy(props.standings, key, direction));
    }
    
  };

  function renderStandings(standings) {
    let tableRows = [];
    if (!_.isEmpty(standings)) {
      tableRows = standings.map((teamRecord) =>
        <tr key={teamRecord.team.id}>
          <td>{teamRecord.team.name}</td>
          <td>{teamRecord.leagueRank}</td>
          <td>{teamRecord.points}</td>
          <td>{teamRecord.gamesPlayed}</td>
          <td>{roundWhenNeeded(teamRecord.pointsPercentage*100)}</td>
          <td>{teamRecord.streak.streakCode}</td>
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
            <th>Streak</th>
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
      {renderStandings(props.standings)}
    </div>
  );
}
