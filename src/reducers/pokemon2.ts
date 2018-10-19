
import { ATTACKED2 } from "../actions/battle/attackAction"

export const POKEMON2_FETCHED = "POKEMON2_FETCHED";


export default function(state = {}, { type, payload }) {
  switch (type) {
    case POKEMON2_FETCHED:
      return payload;
     case ATTACKED2:
      return payload 
    default:
      return state;
  }
}
