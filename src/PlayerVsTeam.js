import React from "react";
import _ from "lodash";
import {getPlayerStats} from "./helpers/PlayerHelper";
import {roundWhenNeeded} from "./helpers/CalcHelper";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

export default function PlayerVsTeam(props) {

  function renderVsTeam() {
    let playerStats = getPlayerStats(props.vsTeam);
    if (!_.isEmpty(playerStats)) {
      playerStats = _.orderBy(playerStats, 'opponent.name', "asc");
      let teamCards = playerStats.map((stats, key) => {
        if (props.playerPosition === "Goalie") {
          return renderGoalieVsTeam(stats, key);
        }
        else {
          return renderPlayerVsTeam(stats, key)
        }
      });

      return teamCards;
    } 
    else if (playerStats == null) {
      return (<span>N/A</span>);
    }
    else {
      return (<Spinner animation="border" variant="primary" />);
    }
  }

  function renderPlayerVsTeam(stats, key) {
    return (
      <Card key={key}>
        <Accordion.Toggle className="cursor-pointer card-header-inner" as={Card.Header} eventKey={key}>
          {stats.opponent.name} - Points Per Game: {roundWhenNeeded(stats.stat.points / stats.stat.games)}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={key}>
          <Card.Body>
            <span>Games: {stats.stat.games}</span>
            <br></br>
            <span>Goals: {stats.stat.goals}</span>
            <br></br>
            <span>Assists: {stats.stat.assists}</span>
            <br></br>
            <span>Shots: {stats.stat.shots}</span>
            <br></br>
            <span>+/-: {stats.stat.plusMinus}</span>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }

  function renderGoalieVsTeam(stats, key) {
    return(
      <Card key={key}>
        <Accordion.Toggle className="cursor-pointer card-header-inner" as={Card.Header} eventKey={key}>
          {stats.opponent.name} - Save Percentage: {stats.stat.savePercentage}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={key}>
          <Card.Body>
            <span>Games: {stats.stat.games}</span>
            <br></br>
            <span>Wins: {stats.stat.wins}</span>
            <br></br>
            <span>Losses: {stats.stat.losses}</span>
            <br></br>
            <span>Save Percentage: {stats.stat.savePercentage}</span>
            <br></br>
            <span>Goals Against Average: {stats.stat.goalAgainstAverage}</span>
          </Card.Body>
        </Accordion.Collapse>
      </Card> 
    );
  }

  return(
    <Accordion>
      {renderVsTeam()}
    </Accordion>
  );

}