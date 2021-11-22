import React, {useState} from "react";
import {useParams, Link} from "react-router-dom";
import _ from "lodash";
import {getPlayer, getTeam} from "./helpers/TeamHelper";
import PlayerVsTeam from './PlayerVsTeam';
import OnPaceRegularSeason from './OnPaceRegularSeason';
import Rankings from './Rankings';
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
        <Card >
          <Accordion.Toggle as={Card.Header} className="cursor-pointer" onClick={onClickVsTeam20192020} eventKey="99">
            vsTeam: 2019-2020
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="99">
            <PlayerVsTeam vsTeam={vsTeam20192020} playerPosition={playerPosition} />
          </Accordion.Collapse>
        </Card>
        <Card >
          <Accordion.Toggle as={Card.Header} className="cursor-pointer" onClick={onClickVsTeam20202021} eventKey="100">
            vsTeam: 2020-2021
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="100">
            <PlayerVsTeam vsTeam={vsTeam20202021} playerPosition={playerPosition} />
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} className="cursor-pointer" onClick={onClickOnPaceRegularSeason} eventKey="101">
            On Pace Regular Season
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="101">
            <OnPaceRegularSeason onPace={onPace} playerPosition={playerPosition} />
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} className="cursor-pointer" onClick={onClickRankings} eventKey="102">
            Rankings
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="102">
            <Rankings rankings={rankings} playerPosition={playerPosition} />
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
