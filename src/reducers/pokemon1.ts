
import { ATTACKED2 } from "../actions/battle/attackAction"
export const POKEMON1_FETCHED = "POKEMON1_FETCHED";

export default function(state = {}, { type, payload }) {
  switch (type) {
    case POKEMON1_FETCHED:
      return payload;
    case ATTACKED2:
      return  payload
    default:
      return state;
  }
}
