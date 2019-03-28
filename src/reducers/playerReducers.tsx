import {TOGGLE_PLAYER, TOGGLE_PLAYER_OFF, TOGGLE_VIDEO} from "../actions/constants";
import {Action, togglePlayerAction} from '../actions/playerActions'

export interface initialState  {
    playing: boolean,
    type: any,
    id: number
  }

export const initialState = {
    playing: false,
    action: TOGGLE_PLAYER_OFF,
    id: 1,
  }

function rootReducer(state = initialState, action : initialState) {
    switch (action.type) {
    case TOGGLE_PLAYER:
        return {
            ...state,
            playing: action.playing
        }
    case TOGGLE_VIDEO:
        return {
            ...state,
            id: action.id
        }    
    case TOGGLE_PLAYER_OFF:
        return {
            ...state,
            playing: false,
            id: action.id
        }
    default: 
      return state 
   }
};
export default rootReducer;