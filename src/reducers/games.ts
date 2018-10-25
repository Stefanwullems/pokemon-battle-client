import {ADD_GAME, GAMES_FETCHED, GAME_HOSTED } from '../actions/lobby/gameActions'

export default(state:any = [] , {type, payload}) => {
  switch (type) {
    case ADD_GAME:
      return{
        ...state,
        [payload.id]: payload
      }
    case GAMES_FETCHED:
      return payload

    case GAME_HOSTED:
      return  state
    
      default:
      return state
  }
}