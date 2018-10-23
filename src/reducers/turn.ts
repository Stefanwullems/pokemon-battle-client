import { SWITCH_TURN } from "../actions/gameLogic/switch-turn";
import { NEW_TURN } from "../actions/gameLogic/new-turn";

export default function(state = 0, { type }) {
  switch (type) {
    case SWITCH_TURN:
      return 1;
    case NEW_TURN:
      return 0;
    default:
      return state;
  }
}
