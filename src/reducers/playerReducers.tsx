import {TOGGLE_PLAYER} from "../actions/constants";
import {Action, togglePlayerAction} from '../actions/playerActions'

export interface initialState  {
    type: any
  }

export const initialState = {
    playing: false,
    action: TOGGLE_PLAYER
  }

function rootReducer(state = initialState, action : initialState) {
    switch (action.type) {
    case TOGGLE_PLAYER:
        return {
            ...state,
            playing: !state.playing
        }
    default: 
      return state 
   }
};
export default rootReducer;