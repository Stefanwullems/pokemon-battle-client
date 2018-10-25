import { FETCHED_TYPES } from "../actions/types/fetch-types";

export default function(state = {}, { type, payload }) {
  switch (type) {
    case FETCHED_TYPES:
      return JSON.parse(JSON.stringify(payload));
    default:
      return state;
  }
}
