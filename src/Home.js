import React, {useState, useEffect} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import _ from "lodash";
import {Link} from "react-router-dom";

let debounceWrapper = [];

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playerTeamIdMap, setPlayerTeamIdMap] = useState({});

  useEffect(() => {
    debounceWrapper = _.debounce(function(event, teams){
      let search = event.target.value.toLowerCase();
      if(search.length > 2) {
        let results = teams.map(function(team) {
          return team.roster.roster.filter(function(player) {
            let includesBoolean = _.includes(player.person.fullName.toLowerCase(), search);
            if (includesBoolean) {
              let tempMap = playerTeamIdMap;              
              tempMap[player.person.id] = team.id;
              setPlayerTeamIdMap(tempMap);
            }
            return includesBoolean;
          });
        });
        setSearchResults(_.flatMap(_.omitBy(results, _.isNil)));
      }
    }, 500);
  },[]);

  function handleChange(event) {
    event.persist();
    setInputValue(event.target.value);
    debounceWrapper(event, JSON.parse(sessionStorage.getItem("teams")));
  }

  function renderSearch() {
    let listResults = [];
    if(!_.isEmpty(searchResults)) {
      listResults = _.map(searchResults, (player) =>
        <Link to={"/team/" + playerTeamIdMap[player.person.id] + "/player/" + player.person.id}>
          <ListGroup.Item key={player.person.id} action>
            {player.person.fullName}
          </ListGroup.Item>
        </Link>
      );
    }
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Search For Player</Form.Label>
            <Form.Control type="text" onChange={handleChange} value={inputValue}/>
            <Form.Text>Start typing to see results</Form.Text>
          </Form.Group>
        </Form>
        <ListGroup>
          {listResults}
        </ListGroup>
      </div>
    );
  }

  function renderTeams(teams) {
    let teamsOrdered = _.orderBy(teams, "name", "asc");
    let listItems = teamsOrdered.map((team) => 
      <ListGroup.Item key={team.id} action href={"/team/" + team.id}>
          {team.name}
      </ListGroup.Item>
    );
    return (
      <ListGroup>{listItems}</ListGroup>
    );
  }
   
  return (
    <div>
      {renderSearch()}
    </div>
    
  );
}
