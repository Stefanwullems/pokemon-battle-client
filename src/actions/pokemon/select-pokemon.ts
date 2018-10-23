export const PLAYER_SELECTED_POKEMON = "PLAYER_SELECTED_POKEMON";

export default function(id: number) {
  return {
    type: PLAYER_SELECTED_POKEMON,
    payload: id
  };
}
