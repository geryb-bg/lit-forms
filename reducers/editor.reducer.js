import { QUEST_UPDATED } from '../actions/quest-updated.action';
import { MISSIONS_UPDATED } from '../actions/missions-updated.action';
import { ERRORS_DETECTED } from '../actions/errors-detected.action';

const INITIAL_STATE = {
  quest: {},
  missions: [],
  errors: []
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
    default:
      return state;
  }
};
