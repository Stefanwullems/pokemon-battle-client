import { PLAYER_ATTACKED } from "../actions/gameLogic/attack";

export default function(state = {}, { type, payload }) {
  switch (type) {
    case PLAYER_ATTACKED:
      return payload;
    default:
      return state;
  }
}
