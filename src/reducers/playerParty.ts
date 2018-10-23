import { SET_PLAYER_PARTY } from "../actions/pokemon/get-pokemon";

export default function(state = [], { type, payload }) {
  switch (type) {
    case SET_PLAYER_PARTY:
      return JSON.parse(JSON.stringify(payload));
    default:
      return state;
  }
}
