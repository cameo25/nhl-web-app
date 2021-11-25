import React from "react";
import _ from "lodash";
import {getFantasyPointsPlayer, getFantasyPointsGoalie} from "./helpers/PlayerHelper";
import {getGameStats, addGamesPlayer, addGamesGoalie} from "./helpers/StatsHelper";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

export default function GameLogStats(props) {

  function renderStats() {
    let gameLogStats = getGameStats(props.gameLogStats);
    if (!_.isEmpty(gameLogStats)) {
      if (props.playerPosition === "Goalie") {
        const stats = addGamesGoalie(gameLogStats, props.numberOfGames);
        return renderGoalieSeasonStats(stats);
      }
      else {
        const stats = addGamesPlayer(gameLogStats, props.numberOfGames);
        return renderPlayerSeasonStats(stats);
      }
    } 
    else if (gameLogStats == null) {
      return (<span>N/A</span>);
    }
    else {
      return (<Spinner animation="border" variant="primary" />);
    }
  }

  function renderPlayerSeasonStats(stats) {
    return(
      <Card.Body>
        <span>Goals: {stats.goals}</span>
        <br></br>
        <span>Assists: {stats.assists}</span>
        <br></br>
        <span>Power Play Points: {stats.powerPlayPoints}</span>
        <br></br>
        <span>Shots: {stats.shots}</span>
        <br></br>
        <span>Hits: {stats.hits}</span>
        <br></br>
        <span>Blocks: {stats.blocked}</span>
        <br></br>
        <span>Fantasy Points: {getFantasyPointsPlayer(stats.goals, stats.assists, stats.powerPlayPoints, stats.shots, stats.hits, stats.blocked)}</span>
      </Card.Body>
    );
  }

  function renderGoalieSeasonStats(stats) {
    return(
      <Card.Body>
        <span>Save Percentage: {stats.savePercentage}</span>
        <br></br>
        <span>Goals Against Average: {stats.goalAgainstAverage}</span>
        <br></br>
        <span>Wins: {stats.wins}</span>
        <br></br>
        <span>Losses: {stats.losses}</span>
        <br></br>
        <span>Shutouts: {stats.shutouts}</span>
        <br></br>
        <span>Fantasy Points: {getFantasyPointsGoalie(stats.wins, stats.goalsAgainst, stats.saves, stats.shutouts)}</span>
      </Card.Body>
    );
  }

  return(
    renderStats()
  );

}