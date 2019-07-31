import { MISSIONS_UPDATED } from "../actions/missions-updated.action";

const INITIAL_STATE = {
    missions: []
};

export const editor = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MISSIONS_UPDATED:
            return {
                ...state,
                missions: action.missions
            }
        default:
            return state;
    }
}