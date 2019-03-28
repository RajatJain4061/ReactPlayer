import {TOGGLE_PLAYER, TOGGLE_VIDEO} from "./constants";

export interface togglePlayerAction {
    type: any;
    playing: boolean;
  }

export interface toggleVideo {
    type: any;
    id: number;
}  

export function togglePlayer(payload : any) {
    return {type: TOGGLE_PLAYER, playing: payload};
}

export function toggleVideo(payload: any) {
    return {type: TOGGLE_VIDEO,id : payload}
}

export type Action = togglePlayerAction | toggleVideo