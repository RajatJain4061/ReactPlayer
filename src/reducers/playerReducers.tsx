import {TOGGLE_PLAYER, TOGGLE_PLAYER_OFF} from "../actions/constants";
import {Action, togglePlayerAction} from '../actions/playerActions'

export interface initialState  {
    playing: boolean,
    type: any
  }

export const initialState = {
    playing: false,
    action: TOGGLE_PLAYER_OFF
  }

function rootReducer(state = initialState, action : initialState) {
    switch (action.type) {
    case TOGGLE_PLAYER:
    console.log(state.playing,action.type)
        return {
            ...state,
            playing: action.playing
        }
    case TOGGLE_PLAYER_OFF:
        return {
            ...state,
            playing: false
        }
    default: 
      return state 
   }
};
export default rootReducer;