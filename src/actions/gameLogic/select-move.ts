import { ISelectMoveParams } from "../../tools/interfaces";

export const PLAYER_SELECTED_MOVE = "PLAYER_SELECT_MOVE";
export const OPPONENT_SELECTED_MOVE = "OPPONENT_SELECT_MOVE";

export default function({ from, moveName }: ISelectMoveParams) {
  return {
    type: from === "player" ? PLAYER_SELECTED_MOVE : OPPONENT_SELECTED_MOVE,
    payload: moveName
  };
}
