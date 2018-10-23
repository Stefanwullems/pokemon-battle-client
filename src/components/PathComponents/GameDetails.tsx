import * as React from 'react'
import {connect} from 'react-redux'
import {getGames, joinGame, updateGame} from '../../actions/lobby/gameActions'

import Paper from '@material-ui/core/Paper'
import './GameDetails.css'

class GameDetails extends React.Component {


  render() {
    const {game, trainers}:any = this.props

    if (game === null || trainers === null) return 'Loading...'
    if (!game) return 'Not found'

    return (<Paper className="outer-paper">
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>

      {
        game.status === 'pending' &&
        <button >Join Game</button>
      }

      <hr />
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  game: state.games && state.games[props.match.params.id],
  trainers: state.trainers
})

const mapDispatchToProps = {
  getGames, joinGame, updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
