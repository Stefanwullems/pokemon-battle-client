import { ILoadedAction } from "src/tools/interfaces";

export const SET_PLAYER_PARTY_IDS = "SET_PLAYER_PARTY_IDS";

export default function(ids: number[]): ILoadedAction<number[]> {
  return {
    type: SET_PLAYER_PARTY_IDS,
    payload: ids
  };
}
