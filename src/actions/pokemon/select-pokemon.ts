import { ISelectPokemonParams } from "../../tools/interfaces";

export const PLAYER_SELECTED_POKEMON = "PLAYER_SELECTED_POKEMON";
export const OPPONENT_SELECTED_POKEMON = "OPPONENT_SELECTED_POKEMON";

export default function({ id, from }: ISelectPokemonParams) {
  return function(dispatch, getState) {
    console.log("hi1");
    if (from === "player") {
      const pokemon = getState().playerParty.filter(
        pokemon => pokemon.id === id
      )[0];
      console.log(pokemon);
      dispatch({
        type: PLAYER_SELECTED_POKEMON,
        payload: pokemon
      });
    }
    if (from === "opponent") {
      console.log("hi2");
      const pokemon = getState().opponentParty.filter(
        pokemon => pokemon.id === id
      )[0];
      console.log(pokemon);
      dispatch({
        type: OPPONENT_SELECTED_POKEMON,
        payload: pokemon
      });
    }
  };
}
