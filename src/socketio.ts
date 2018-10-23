import * as io from 'socket.io-client'
import {baseUrl} from './constants'

export default class SocketIO {
  socket: any = null

  connect(dispatch, color) {
    console.log('Connecting websocket', 'in socketio.ts:', color)
    this.socket = io.connect(baseUrl, {
      query: `color=${color}`
    });
    this.socket.on('action', payload => dispatch(payload))
  }

  disconnect() {
    console.log('Disconnecting websocket')
    this.socket.disconnect()
  }
}
