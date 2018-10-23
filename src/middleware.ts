import {LOGIN, LOGOUT} from './actions/trainers/login'

export const socketIo = socketio => store => next => action => {
  if (action.type === LOGIN) {
    const color = action.payload
        console.log('in middleware:', color);
    socketio.connect(store.dispatch, color)
  }
  if (action.type === LOGOUT) {
    socketio.disconnect()
  }

  next(action)
}