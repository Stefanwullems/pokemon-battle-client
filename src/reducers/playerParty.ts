import { SET_PLAYER_PARTY } from "../actions/pokemon/fetch-pokemon";
import {
  PLAYER_GOT_ATTACKED,
  PLAYER_POKEMON_FAINTED
} from "../actions/gameLogic/attack";
import { IPokemon, ILoadedAction } from "../tools/interfaces";

export default function(
  state: IPokemon[] = [],
  { type, payload }: ILoadedAction<IPokemon>
) {
  switch (type) {
    case SET_PLAYER_PARTY:
      return JSON.parse(JSON.stringify(payload));
    case PLAYER_GOT_ATTACKED:
    case PLAYER_POKEMON_FAINTED:
      return updateParty(state, payload);
    default:
      return state;
  }
}

function updateParty(state, payload) {
  return state.map(pokemon => {
    if (pokemon.id === payload!.id) {
      return payload;
    }
    return pokemon;
  });
}
