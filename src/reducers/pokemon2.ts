
export const POKEMON2_FETCHED = "POKEMON2_FETCHED";

export default function(state = {}, { type, payload }) {
  switch (type) {
    case POKEMON2_FETCHED:
      return payload;
    default:
      return state;
  }
}
