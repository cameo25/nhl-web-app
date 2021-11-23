import React, {useState} from "react";
import {useParams, Link} from "react-router-dom";
import _ from "lodash";
import {getPlayer, getTeam} from "./helpers/TeamHelper";
import PlayerVsTeam from './PlayerVsTeam';
import OnPaceRegularSeason from './OnPaceRegularSeason';
import Rankings from './Rankings';
import SeasonStats from './SeasonStats';
import MonthlyStats from './MonthlyStats';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

export default function Player() {
  let {teamId, playerId} = useParams();
  teamId = parseInt(teamId)
  playerId = parseInt(playerId)
  let playerPosition = "";
  const [vsTeam20192020, setVsTeam20192020] = useState([]);
  const [vsTeam20202021, setVsTeam20202021] = useState([]);
  const [onPace, setOnPace] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [seasonStats, setSeasonStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [error, setError] = useState(null);

 function renderPlayer(teams) {
    let player = getPlayer(teams, teamId, playerId);
    let team = getTeam(teams, teamId);

    if(!_.isEmpty(player)) {
      playerPosition = player.position.type;
      return (
        <div>
          <h2>{player.person.fullName} #{player.jerseyNumber}</h2>
          <span>{player.position.type} - {player.position.name}</span>
          <br></br>
          <Link to={"/team/" + teamId}>{team.name}</Link>
        </div>
      );
    } 
    else {
      return (
        <div>

        </div>
      );
    }
  }

  function onClickGameLogSeason() {
    if(_.isEmpty(vsTeam20202021)) {
      fetch("https://statsapi.web.nhl.com/api/v1/people/"+ playerId + "/stats?stats=gameLog&season=20212022")
      .then(res => res.json())
        .then(
          (result) => {
            setSeasonStats(result);
          },
          (error) => {
            setError(error);
          }
        )
    }
  }

  function onClickGameLogMonthly() {
    if(_.isEmpty(vsTeam20202021)) {
      fetch("https://statsapi.web.nhl.com/api/v1/people/"+ playerId + "/stats?stats=byMonth&season=20212022")
      .then(res => res.json())
        .then(
          (result) => {
            setMonthlyStats(result);
          },
          (error) => {
            setError(error);
          }
        )
    }
  }

  function onClickVsTeam20202021() {
    if(_.isEmpty(vsTeam20202021)) {
      fetch("https://statsapi.web.nhl.com/api/v1/people/"+ playerId + "/stats?stats=vsTeam&season=20202021")
      .then(res => res.json())
        .then(
          (result) => {
            setVsTeam20202021(result);
          },
          (error) => {
            setError(error);
          }
        )
    }
  }

  function onClickVsTeam20192020() {
    if(_.isEmpty(vsTeam20192020)) {
      fetch("https://statsapi.web.nhl.com/api/v1/people/"+ playerId + "/stats?stats=vsTeam&season=20192020")
      .then(res => res.json())
        .then(
          (result) => {
            setVsTeam20192020(result);
          },
          (error) => {
            setError(error);
          }
        )
    }
  }

  function onClickOnPaceRegularSeason() {
    if(_.isEmpty(onPace)) {
      fetch("https://statsapi.web.nhl.com/api/v1/people/"+ playerId + "/stats?stats=onPaceRegularSeason&season=20212022")
      .then(res => res.json())
        .then(
          (result) => {
            setOnPace(result);
          },
          (error) => {
            setError(error);
          }
        )
    }
  }

  function onClickRankings() {
    if(_.isEmpty(rankings)) {
      fetch("https://statsapi.web.nhl.com/api/v1/people/"+ playerId + "/stats?stats=regularSeasonStatRankings&season=20212022")
      .then(res => res.json())
        .then(
          (result) => {
            setRankings(result);
          },
          (error) => {
            setError(error);
          }
        )
    }
  }

  function renderOptions() {
    return(
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} className="cursor-pointer" onClick={onClickGameLogSeason} eventKey="103">
            Season Stats
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="103">
            <SeasonStats seasonStats={seasonStats} playerPosition={playerPosition} />
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} className="cursor-pointer" onClick={onClickGameLogMonthly} eventKey="104">
            Monthly Stats
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="104">
            <MonthlyStats monthlyStats={monthlyStats} playerPosition={playerPosition} />
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} className="cursor-pointer" onClick={onClickOnPaceRegularSeason} eventKey="99">
            On Pace Regular Season
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="99">
            <OnPaceRegularSeason onPace={onPace} playerPosition={playerPosition} />
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} className="cursor-pointer" onClick={onClickRankings} eventKey="100">
            Rankings
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="100">
            <Rankings rankings={rankings} playerPosition={playerPosition} />
          </Accordion.Collapse>
        </Card>
        <Card >
          <Accordion.Toggle as={Card.Header} className="cursor-pointer" onClick={onClickVsTeam20192020} eventKey="101">
            vsTeam: 2019-2020
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="101">
            <PlayerVsTeam vsTeam={vsTeam20192020} playerPosition={playerPosition} />
          </Accordion.Collapse>
        </Card>
        <Card >
          <Accordion.Toggle as={Card.Header} className="cursor-pointer" onClick={onClickVsTeam20202021} eventKey="102">
            vsTeam: 2020-2021
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="102">
            <PlayerVsTeam vsTeam={vsTeam20202021} playerPosition={playerPosition} />
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }

  return (
    <div>
      {renderPlayer(JSON.parse(sessionStorage.getItem("teams")))}
      {renderOptions()}
    </div>
  );
}
