import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import _ from "lodash";
import {getRoster, getTeam, getTeamStats} from "./helpers/TeamHelper";
import {roundWhenNeeded} from "./helpers/CalcHelper";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

export default function Team(props) {
  const [error, setError] = useState(null);
  const [teamStats, setTeamStats] = useState([]);

  let {teamId} = useParams();
  teamId = parseInt(teamId);
  
  useEffect(() => { 
    if (_.isEmpty(sessionStorage.getItem("teams stats:" + teamId))) {
      fetch('https://statsapi.web.nhl.com/api/v1/teams/' + teamId + '?expand=team.stats&season=20212022')
      .then(res => res.json())
      .then(
        (result) => {
          
          let myTeamStats = getTeamStats(result.teams, teamId, 'R');
          sessionStorage.setItem("teams stats:" + teamId, JSON.stringify(myTeamStats));
          setTeamStats(myTeamStats);
        },
        (error) => {
          setError(error);
        }
      )
    }
    else {
      setTeamStats(JSON.parse(sessionStorage.getItem("teams stats:" + teamId)));
    }
  },[]);

 function renderRoster(teams) {
    let roster = getRoster(teams, teamId);
    let listItems = [];
    if (!_.isEmpty(roster)) {
      roster = _.orderBy(roster, "person.fullName", "asc");
      listItems = roster.map((player) =>
        <Link key={player.person.id} to={"/team/" + teamId + "/player/" + player.person.id}>
          <ListGroup.Item action>
           {player.position.abbreviation} - {player.person.fullName}, #{player.jerseyNumber}
          </ListGroup.Item>
        </Link>
      );
    }

    return (
      <ListGroup>{listItems}</ListGroup>
    );
  }

  function renderTeamInfo(teams) {
    let team = getTeam(teams, teamId);
    let stats = null;
    let record = null;
    
    if(!_.isEmpty(teamStats)) {
        console.log(teamStats);
        const penaltyKill = parseInt(teamStats.penaltyKillPercentage);
        const powerPlay = parseInt(teamStats.powerPlayPercentage);
        const PKPPTotal = penaltyKill+powerPlay;

        const goalsFor = teamStats.goalsPerGame;
        const goalsAgainst = teamStats.goalsAgainstPerGame;
        const GFGACompare = roundWhenNeeded(goalsFor/goalsAgainst);
        record = (
          <span>W-L-OT: {teamStats.wins}-{teamStats.losses}-{teamStats.ot}</span>
        );
        stats = (
          <span>
            <span>PK:{penaltyKill}% PP:{powerPlay}%</span>
            <br></br>
            <span>Total:{PKPPTotal}%</span>
            <br></br>
            <br></br>
            <span>GF:{goalsFor} GA:{goalsAgainst}</span>
            <br></br>
            <span>GF/GA:{GFGACompare}</span>
          </span>
          

        );
    }
    return (
    <Card style={{ width: '20em' }}>
      <Card.Body>
        <Card.Title>{team.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {record}
        </Card.Subtitle>
        <Card.Text>
          {stats}
        </Card.Text>
      </Card.Body>
    </Card>
    );
  }
  
  return (
    <div>
      {renderTeamInfo(props.teams)}
      <br></br>
      {renderRoster(props.teams)}
    </div>
  );
}
