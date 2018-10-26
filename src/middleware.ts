import {PLAYER_LOGIN, PLAYER_LOGOUT} from './actions/trainers/login'
import { PLAYER_SELECTED_MOVE } from "./actions/gameLogic/select-move"

export const socketIo = socketio => store => next => action => {

  switch (action.type) {

    case PLAYER_LOGIN:
      socketio.connect(store.dispatch, action.payload)
      break

    case PLAYER_LOGOUT:
      socketio.disconnect()
      break

    case PLAYER_SELECTED_MOVE:
      socketio.playerAttacks(store.dispatch, {color: store.getState().trainer.player, attack: action.payload})
      break

  }

  next(action)
}