import { OPPONENT_GOT_ATTACKED } from "../actions/gameLogic/attack";
import { OPPONENT_SELECTED_POKEMON } from "../actions/pokemon/select-pokemon";

export default function(state = {}, { type, payload }) {
  switch (type) {
    case OPPONENT_GOT_ATTACKED:
      return JSON.parse(JSON.stringify(payload));
    case OPPONENT_SELECTED_POKEMON:
      return JSON.parse(JSON.stringify(payload));
    default:
      return state;
  }
}
