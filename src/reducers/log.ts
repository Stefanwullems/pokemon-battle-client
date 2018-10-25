import { LOG } from "../actions/gameLogic/attack";

export default function(state = "", { type, payload }) {
  switch (type) {
    case LOG:
      return payload;
    default:
      return state;
  }
}
