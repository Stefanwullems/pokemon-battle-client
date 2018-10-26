import { PLAYER_SELECTED_MOVE } from "./../actions/gameLogic/select-move";
import { NEW_TURN } from "../actions/gameLogic/new-turn";

export default function(state = null, { type, payload }) {
  switch (type) {
    case PLAYER_SELECTED_MOVE:
      return payload;
    case NEW_TURN:
      return null;
    default:
      return state;
  }
}
