import React from "react";
import _ from "lodash";
import {getPlayerStats} from "./helpers/PlayerHelper";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

export default function Rankings(props) {

  function renderRankings() {
    let playerStats = getPlayerStats(props.rankings);
    if (!_.isEmpty(playerStats)) {
      let rankingsCards = playerStats.map((stats, key) => {
        if (props.playerPosition === "Goalie") {
          return renderGoalieRankings(stats, key);
        }
        else {
          return renderPlayerRankings(stats, key)
        }
      });

      return rankingsCards;
    }
    else if (playerStats == null) {
      return (<span>N/A</span>);
    } 
    else {
      return (<Spinner animation="border" variant="primary" />);
    }
  }

  function renderPlayerRankings(stats, key) {
    return(
      <Card.Body>
        <span>Goals: {stats.stat.rankGoals}</span>
        <br></br>
        <span>Assists: {stats.stat.rankAssists}</span>
        <br></br>
        <span>Power Play Goals: {stats.stat.rankPowerPlayGoals}</span>
        <br></br>
        <span>Shots: {stats.stat.rankShots}</span>
        <br></br>
        <span>Hits: {stats.stat.rankHits}</span>
        <br></br>
        <span>Blocks: {stats.stat.rankBlockedShots}</span>
      </Card.Body>
    );
  }

  function renderGoalieRankings(stats, key) {
    return(
      <Card.Body>
        <span>Save Percentage: {stats.stat.savePercentage}</span>
        <br></br>
        <span>Goals Against Average: {stats.stat.goalsAgainstAverage}</span>
        <br></br>
        <span>Wins: {stats.stat.wins}</span>
        <br></br>
        <span>Losses: {stats.stat.losses}</span>
        <br></br>
        <span>Goals Against: {stats.stat.goalsAgainst}</span>
        <br></br>
        <span>Saves: {stats.stat.saves}</span>
        <br></br>
        <span>Shutouts: {stats.stat.shutOuts}</span>
      </Card.Body>
    );
  }

  return(
    renderRankings()
  );

}