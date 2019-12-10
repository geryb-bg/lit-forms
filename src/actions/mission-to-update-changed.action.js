export const MISSION_TO_UPDATE_CHANGED = 'MISSION_TO_UPDATE_CHANGED';

export const missionToUpdateChanged = (mission) => {
  return {
    type: MISSION_TO_UPDATE_CHANGED,
    mission
  };
};