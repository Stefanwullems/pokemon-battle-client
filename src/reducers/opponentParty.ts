import { SET_OPPONENT_PARTY } from "../actions/pokemon/get-pokemon";

export default function(state = [], { type, payload }) {
  switch (type) {
    case SET_OPPONENT_PARTY:
      return JSON.parse(JSON.stringify(payload));
    default:
      return state;
  }
}
