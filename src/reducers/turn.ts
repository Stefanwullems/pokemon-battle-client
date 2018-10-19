import { SWITCH_TURN } from "../actions/battle/switch-turn";

export default function(state = 0, { type }) {
  switch (type) {
    case SWITCH_TURN:
      return (state + 1) % 2;
    default:
      return state;
  }
}
