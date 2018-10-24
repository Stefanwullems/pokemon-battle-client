import { ISelectMoveParams } from "../../tools/interfaces";

export const PLAYER_SELECTED_MOVE = "PLAYER_SELECTED_MOVE";
export const OPPONENT_SELECTED_MOVE = "OPPONENT_SELECTED_MOVE";

export default function({ trainer, moveName }: ISelectMoveParams) {
  return {
    type: `${trainer.toUpperCase()}_SELECTED_MOVE`,
    payload: moveName
  };
}
