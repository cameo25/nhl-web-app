import _ from "lodash";
import {roundWhenNeeded} from "./CalcHelper";

export function getGameStats(response) {
  let seasonStats = [];
  if (!_.isEmpty(response)) {
    seasonStats = _.head(response.stats).splits;
    if (_.isEmpty(seasonStats)) {
      seasonStats = null;
    }
  }
  return seasonStats;
}

export function addGamesPlayer(gameLogStats, days) { 
  let goals = null;
  let assists = null;
  let ppp = null;
  let shots = null;
  let hits = null;
  let blocked = null;

  if (days != -1) {
    gameLogStats = gameLogStats.slice(0, days);
  }
  console.log(_.size(gameLogStats));
  gameLogStats.map((game, key) => {
    goals += game.stat.goals;
    assists += game.stat.assists;
    ppp += game.stat.powerPlayPoints;
    shots += game.stat.shots;
    hits += game.stat.hits;
    blocked += game.stat.blocked;
  });

  return {
    "goals": goals,
    "assists": assists,
    "powerPlayPoints": ppp,
    "shots": shots,
    "hits": hits,
    "blocked": blocked
  }
}

export function addGamesGoalie(gameLogStats, days) { 
  let savePercentage = null;
  let goalAgainstAverage = null;
  let goalsAgainst = null;
  let wins = null;
  let losses = null;
  let shutouts = null;
  let saves = null;

  let gameLogsSize = _.size(gameLogStats);

  if (days != -1) {
    gameLogsSize = days;
    gameLogStats = gameLogStats.slice(0, days);
  }
  console.log(_.size(gameLogStats));
  gameLogStats.map((game, key) => {
    savePercentage += game.stat.savePercentage;
    goalAgainstAverage += game.stat.goalAgainstAverage;
    goalsAgainst += game.stat.goalsAgainst;
    if (game.stat.decision == "W") {
      wins += 1;
    }
    else {
      losses += 1;
    }
    shutouts += game.stat.shutouts;
    saves += game.stat.saves;
  });

  return {
    "savePercentage": roundWhenNeeded(savePercentage/gameLogsSize),
    "goalAgainstAverage": roundWhenNeeded(goalsAgainst/gameLogsSize),
    "goalsAgainst" : goalsAgainst,
    "wins": wins,
    "losses": losses,
    "shutouts": shutouts,
    "saves": saves
  }
}