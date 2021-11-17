import _ from "lodash";

export function getTeam(teams, teamId) {
  let team = [];
  if (!_.isEmpty(teams)) {
    team = _.head(teams.filter((team) => team.id === teamId));
  }
  return team;
}

export function getRoster(teams, teamId) {
  let team = getTeam(teams, teamId);
  let roster = []
  if (!_.isEmpty(team)) {
    roster = team.roster.roster;
  }
  return roster;
}

export function getPlayer(teams, teamId, playerId) {
  let roster = getRoster(teams, teamId);
  let player = [];
  if (!_.isEmpty(roster)) {
    player = _.head(roster.filter((player) => player.person.id === playerId));
  }
  return player;
}