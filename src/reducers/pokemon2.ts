import { POKEMON1_FETCHED } from "../actions/pokemon/get-pokemon";
import { ATTACKED2 } from "../actions/battle/attackAction"

export default function(state = {}, { type, payload }) {
  switch (type) {
    case POKEMON1_FETCHED:
      return payload;
     case ATTACKED2:
      return payload 
    default:
      return state;
  }
}
