import { OPPONENT_ATTACKED } from "../actions/gameLogic/attack";

export const POKEMON2_FETCHED = "POKEMON2_FETCHED";

export default function(state = {}, { type, payload }) {
  switch (type) {
    case OPPONENT_ATTACKED:
      return payload;
    default:
      return state;
  }
}
