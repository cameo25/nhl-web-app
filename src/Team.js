import React from "react";
import {useParams, Link} from "react-router-dom";
import _ from "lodash";
import {getRoster} from "./helpers/TeamHelper";
import ListGroup from "react-bootstrap/ListGroup";

export default function Team() {
  let {teamId} = useParams();
  teamId = parseInt(teamId)

 function renderRoster(teams) {
    let roster = getRoster(teams, teamId);
    let listItems = [];
    if (!_.isEmpty(roster)) {
      roster = _.orderBy(roster, "person.fullName", "asc");
      listItems = roster.map((player) =>
        <Link to={"/team/" + teamId + "/player/" + player.person.id}>
          <ListGroup.Item key={player.person.id} action>
          {player.position.abbreviation} - {player.person.fullName}, #{player.jerseyNumber}
          </ListGroup.Item>
        </Link>
      );
    }

    return (
      <ListGroup>{listItems}</ListGroup>
    );
  }
  
  return (
    <div>
      {renderRoster(JSON.parse(sessionStorage.getItem("teams")))}
    </div>
  );
}
