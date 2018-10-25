import { LOGIN, LOGOUT } from "../actions/trainers/login";

export default function(state = null, { type, payload }) {
  switch (type) {
    case LOGIN:
      console.log("in trainer action:", payload);
      return payload;

    case LOGOUT:
      return null;

    default:
      return state;
  }
}
