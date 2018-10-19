import { POKEMON1_FETCHED } from "../actions/pokemon/get-pokemon";

export default function(state = {}, { type, payload }) {
  switch (type) {
    case POKEMON1_FETCHED:
      return payload;
    default:
      return state;
  }
}
