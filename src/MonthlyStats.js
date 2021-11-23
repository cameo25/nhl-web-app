import React from "react";
import _ from "lodash";
import {getPlayerStats, getFantasyPointsPlayer, getFantasyPointsGoalie} from "./helpers/PlayerHelper";
import {getMonthlyStats} from "./helpers/StatsHelper";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

export default function MonthlyStats(props) {

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function renderStats() {
    let monthlyStats = getMonthlyStats(props.monthlyStats);
    if (!_.isEmpty(monthlyStats)) {
      let monthlyCards = monthlyStats.map((stats, key) => {
        if (props.playerPosition === "Goalie") {
          return renderGoalieSeasonStats(stats);
        }
        else {
          return renderPlayerSeasonStats(stats);
        }
      });

      return monthlyCards;

    } 
    else if (monthlyStats == null) {
      return (<span>N/A</span>);
    }
    else {
      return (<Spinner animation="border" variant="primary" />);
    }
  }

  function renderPlayerSeasonStats(stats) {
    return(
      <Card.Body>
        <span>Month: {monthNames[stats.month]}</span>
        <br></br>
        <span>Goals: {stats.stat.goals}</span>
        <br></br>
        <span>Assists: {stats.stat.assists}</span>
        <br></br>
        <span>Power Play Points: {stats.stat.powerPlayPoints}</span>
        <br></br>
        <span>Shots: {stats.stat.shots}</span>
        <br></br>
        <span>Hits: {stats.stat.hits}</span>
        <br></br>
        <span>Blocks: {stats.stat.blocked}</span>
        <br></br>
        <span>Fantasy Points: {getFantasyPointsPlayer(stats.stat.goals, stats.stat.assists, stats.stat.powerPlayPoints, stats.stat.shots, stats.stat.hits, stats.stat.blocked)}</span>
      </Card.Body>
    );
  }

  function renderGoalieSeasonStats(stats) {
    return(
      <Card.Body>
        <span>Month: {monthNames[stats.month]}</span>
        <br></br>
        <span>Save Percentage: {stats.stat.savePercentage}</span>
        <br></br>
        <span>Goals Against Average: {stats.stat.goalAgainstAverage}</span>
        <br></br>
        <span>Wins: {stats.stat.wins}</span>
        <br></br>
        <span>Losses: {stats.stat.losses}</span>
        <br></br>
        <span>Shutouts: {stats.stat.shutouts}</span>
        <br></br>
        <span>Fantasy Points: {getFantasyPointsGoalie(stats.stat.wins, stats.stat.goalsAgainst, stats.stat.saves, stats.stat.shutouts)}</span>
      </Card.Body>
    );
  }

  return(
    renderStats()
  );

}