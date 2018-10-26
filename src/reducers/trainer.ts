import { PLAYER_LOGIN, PLAYER_LOGOUT } from "../actions/trainers/login"


const init = {
  red: null,
  blue: null,
  player: null
}

export default function (state = init, {type, payload}) {
  switch (type) {
    case 'RED_LOGIN':
      return {
        ...state,
        red: payload
      }

    case 'BLUE_LOGIN':
      return {
        ...state,
        blue: payload
      }

    case 'RED_LOGOUT':
      return {
        ...state,
        red: null
      }

    case 'BLUE_LOGOUT':
      return {
        ...state,
        blue: null
      }

    case PLAYER_LOGIN:
      return {
        ...state,
        player: payload
      }

    case PLAYER_LOGOUT:
      return {
        ...state,
        player: null
      }

    default:
      return state
  }
}
