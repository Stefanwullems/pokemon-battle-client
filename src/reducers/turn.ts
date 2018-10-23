import { SWITCH_TURN } from "../actions/gameLogic/switch-turn";

export default function(state = "", { type }) {
  switch (type) {
    case SWITCH_TURN:
      if (state === "opponent") {
        return "player";
      }
      if (state === "player") {
        return "opponent";
      }
    default:
      return state;
  }
}
