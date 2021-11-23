import React from "react";
import _ from "lodash";
import {getPlayerStats, getFantasyPointsPlayer, getFantasyPointsGoalie} from "./helpers/PlayerHelper";
import {getSeasonStats} from "./helpers/StatsHelper";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

export default function SeasonStats(props) {

  function renderStats() {
    let seasonStats = getSeasonStats(props.seasonStats);
    let goals = null;
    let assists = null;
    let ppp = null;
    let shots = null;
    let hits = null;
    let blocked = null;
    let fantasyPoints = null;
    if (!_.isEmpty(seasonStats)) {
        seasonStats.map((game, key) => {
        goals += game.stat.goals;
        assists += game.stat.assists;
        ppp += game.stat.powerPlayPoints;
        shots += game.stat.shots;
        hits += game.stat.hits;
        blocked += game.stat.blocked;
      });

      const stats = {
        "goals": goals,
        "assists": assists,
        "powerPlayPoints": ppp,
        "shots": shots,
        "hits": hits,
        "blocked": blocked,
        "fantasyPoints": fantasyPoints
      }

      if (props.playerPosition === "Goalie") {
        return renderGoalieSeasonStats(stats);
      }
      else {
        return renderPlayerSeasonStats(stats);
      }
    } 
    else if (seasonStats == null) {
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