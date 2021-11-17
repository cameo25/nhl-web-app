import React from "react";
import _ from "lodash";
import {getPlayerStats, getFantasyPointsPlayer, getFantasyPointsGoalie} from "./helpers/PlayerHelper";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

export default function OnPaceRegularSeason(props) {

  function renderOnPace() {
    let playerStats = getPlayerStats(props.onPace);
    if (!_.isEmpty(playerStats)) {
      let onPaceCards = playerStats.map((stats, key) => {
        if (props.playerPosition === "Goalie") {
          return renderGoalieOnPace(stats, key);
        }
        else {
          return renderPlayerOnPace(stats, key)
        }
      });

      return onPaceCards;
    } 
    else if (playerStats == null) {
      return (<span>N/A</span>);
    }
    else {
      return (<Spinner animation="border" variant="primary" />);
    }
  }

  function renderPlayerOnPace(stats, key) {
    return(
      <Card.Body>
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

  function renderGoalieOnPace(stats, key) {
    return(
      <Card.Body>
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
    renderOnPace()
  );

}