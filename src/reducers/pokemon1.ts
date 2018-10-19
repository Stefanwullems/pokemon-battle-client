export const POKEMON1_FETCHED = "POKEMON1_FETCHED";
export default function(state = {}, { type, payload }) {
  switch (type) {
    case POKEMON1_FETCHED:
      return payload;
    default:
      return state;
  }
}
