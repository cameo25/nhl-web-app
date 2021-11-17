import _ from "lodash";

export function getTeamRecords(records, teamId) {
  let teamRecords = [];
  if (!_.isEmpty(records)) {
    records.map((divsion) => {
      divsion.teamRecords.map((teamRecord) => {
        teamRecords.push(teamRecord);
      });
    });
  }
  return teamRecords;
}
