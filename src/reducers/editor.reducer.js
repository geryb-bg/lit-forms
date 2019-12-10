import { QUEST_UPDATED } from '../actions/quest-updated.action';
import { MISSIONS_UPDATED } from '../actions/missions-updated.action';
import { ERRORS_DETECTED } from '../actions/errors-detected.action';
import { MISSION_TO_UPDATE_CHANGED } from '../actions/mission-to-update-changed.action';

const INITIAL_STATE = {
  quest: {},
  missions: [],
  errors: [],
  missionToUpdate: {
    missionId: 0,
    name: '',
    description: ''
  }
};

export const editor = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUEST_UPDATED:
      return {
        ...state,
        quest: action.quest
      };
    case MISSIONS_UPDATED:
      return {
        ...state,
        missions: action.missions
      };
    case ERRORS_DETECTED:
      return {
        ...state,
        errors: action.errors
      };
    case MISSION_TO_UPDATE_CHANGED:
      return {
        ...state,
        missionToUpdate: action.mission
      };
    default:
      return state;
  }
};
