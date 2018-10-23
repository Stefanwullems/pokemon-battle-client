import {ADD_GAME, UPDATE_GAME, UPDATE_GAMES} from '../actions/lobby/gameActions'

export default(state:any = null , {type, payload}) => {
  switch (type) {

    case ADD_GAME:
      return{
        ...state,
        [payload.id]: payload
      }

    case UPDATE_GAME:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_GAMES:
      return payload.reduce((games, game) => {
        games[game.id] = game
        return games
      }, {})

    default:
      return state
  }
}