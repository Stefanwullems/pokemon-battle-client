import { SET_PLAYER_PARTY_IDS } from "../actions/pokemon/select-pokemon-party";

import { ILoadedAction } from "../tools/interfaces";

export default function(
  state: number[] = [],
  { type, payload }: ILoadedAction<number>
) {
  switch (type) {
    case SET_PLAYER_PARTY_IDS:
      return JSON.parse(JSON.stringify(payload));
    default:
      return state;
  }
}
