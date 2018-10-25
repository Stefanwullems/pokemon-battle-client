import {
  PLAYER_GOT_ATTACKED,
  PLAYER_POKEMON_FAINTED
} from "../actions/gameLogic/attack";
import { PLAYER_SELECTED_POKEMON } from "../actions/pokemon/select-pokemon";

export default function(state = {}, { type, payload }) {
  switch (type) {
    case PLAYER_GOT_ATTACKED:
    case PLAYER_SELECTED_POKEMON:
      return JSON.parse(JSON.stringify(payload));
    case PLAYER_POKEMON_FAINTED:
      return payload;
    default:
      return state;
  }
}
