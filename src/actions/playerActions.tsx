import {TOGGLE_PLAYER} from "./constants";

export interface togglePlayerAction {
    type: any;
    playing: boolean;
  }

export function togglePlayer(payload : any) {
    return {type: TOGGLE_PLAYER, playing: payload};
}

export type Action = togglePlayerAction