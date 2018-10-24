import { SET_OPPONENT_PARTY } from "../actions/pokemon/get-pokemon";
import {
  OPPONENT_GOT_ATTACKED,
  OPPONENT_POKEMON_FAINTED
} from "../actions/gameLogic/attack";
import { IPokemon, ILoadedAction } from "../tools/interfaces";

export default function(
  state: IPokemon[] = [],
  { type, payload }: ILoadedAction<IPokemon>
) {
  switch (type) {
    case SET_OPPONENT_PARTY:
      return JSON.parse(JSON.stringify(payload));
    case OPPONENT_GOT_ATTACKED:
      return state.map(pokemon => {
        if (pokemon.id === payload!.id) {
          return payload;
        }
        return pokemon;
      });
    case OPPONENT_POKEMON_FAINTED:
      return state.map(pokemon => {
        if (pokemon.id === payload!.id) {
          return payload;
        }
        return pokemon;
      });
    default:
      return state;
  }
}
