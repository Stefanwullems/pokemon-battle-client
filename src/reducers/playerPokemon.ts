import { PLAYER_GOT_ATTACKED } from "../actions/gameLogic/attack";
import { PLAYER_SELECTED_POKEMON } from "../actions/pokemon/select-pokemon";

export default function(state = {}, { type, payload }) {
  switch (type) {
    case PLAYER_GOT_ATTACKED:
      return JSON.parse(JSON.stringify(payload));
    case PLAYER_SELECTED_POKEMON:
      return JSON.parse(JSON.stringify(payload));
    default:
      return state;
  }
}
