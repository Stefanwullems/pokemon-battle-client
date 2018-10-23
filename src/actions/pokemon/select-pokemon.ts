export const PLAYER_SELECTED_POKEMON = "PLAYER_SELECTED_POKEMON";
export const OPPONENT_SELECTED_POKEMON = "OPPONENT_SELECTED_POKEMON";

export default function(id: number, from: string) {
  return function(dispatch, getState) {
    if (from === "player") {
      const pokemon = getState().playerParty.filter(
        pokemon => pokemon.id === id
      );
      dispatch({
        type: PLAYER_SELECTED_POKEMON,
        payload: pokemon
      });
    }
    if (from === "opponent") {
      const pokemon = getState().opponentParty.filter(
        pokemon => pokemon.id === id
      );

      dispatch({
        type: OPPONENT_SELECTED_POKEMON,
        payload: pokemon
      });
    }
  };
}
