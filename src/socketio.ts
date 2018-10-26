import * as io from 'socket.io-client'
import {baseUrl} from './constants'

export default class SocketIO {
  socket: any = null

  public connect(dispatch, color) {
    console.log('Connecting websocket')
    this.socket = io.connect(baseUrl, {
      query: `color=${color}`
    });
    this.socket.on('action', payload => dispatch(payload))
  }

  public disconnect() {
    console.log('Disconnecting websocket')
    this.socket.disconnect()
  }

  public playerAttacks(dispatch, move) {
    console.log(`trainer ${move.color} attacks with ${move.attack}`)
    this.socket.emit('attack', move, (data) => {
      console.log(data)
    })
  }
}
