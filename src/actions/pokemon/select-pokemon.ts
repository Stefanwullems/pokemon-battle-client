import { ISelectPokemonParams, IPokemon } from "../../tools/interfaces";

export const PLAYER_SELECTED_POKEMON = "PLAYER_SELECTED_POKEMON";
export const OPPONENT_SELECTED_POKEMON = "OPPONENT_SELECTED_POKEMON";

export default function({ id, trainer }: ISelectPokemonParams) {
  return function(dispatch, getState) {
    const pokemon: IPokemon = getState()[`${trainer}Party`].filter(
      pokemon => pokemon.id === id
    )[0];
    dispatch({
      type: `${trainer.toUpperCase()}_SELECTED_POKEMON`,
      payload: pokemon
    });
  };
}
