import _ from "lodash";

export function getSeasonStats(response) {
  let seasonStats = [];
  if (!_.isEmpty(response)) {
    seasonStats = _.head(response.stats).splits;
    if (_.isEmpty(seasonStats)) {
      seasonStats = null;
    }
  }
  return seasonStats;
}

export function getMonthlyStats(response) {
  let seasonStats = [];
  if (!_.isEmpty(response)) {
    seasonStats = _.head(response.stats).splits;
    if (_.isEmpty(seasonStats)) {
      seasonStats = null;
    }
  }
  return seasonStats;
}
