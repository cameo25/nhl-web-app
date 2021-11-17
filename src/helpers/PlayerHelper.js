import _ from "lodash";

export function getPlayerStats(response) {
  let playerStats = [];
  if (!_.isEmpty(response)) {
    playerStats = _.head(response.stats).splits;
    if (_.isEmpty(playerStats)) {
      playerStats = null;
    }
  }
  return playerStats;
}

export function getFantasyPointsPlayer(goals, assists, powerPlay, shots, hits, blocks) {
  const goalPoints = goals * 6;
  const assistPoints = assists * 4;
  const powerPlayPoints = powerPlay * 2;
  const shotPoints = shots * 0.9;
  const hitPoints = hits * 0.5;
  const blockPoints = blocks * 0.5;

  return goalPoints + assistPoints + powerPlayPoints + shotPoints + hitPoints + blockPoints;
}

export function getFantasyPointsGoalie(wins, goalsAgainst, saves, shutouts) {
  const winPoints = wins * 5;
  const gaPoints = goalsAgainst * -3;
  const savePoints = saves * 0.6;
  const shutoutPoints = shutouts * 2;

  return winPoints + gaPoints + savePoints + shutoutPoints;
}