import * as React from 'react';
import { connect } from 'react-redux';
import { getGames, fetchGames, createGame, hostGame } from '../../actions/lobby/gameActions';
import { Link } from 'react-router-dom'


import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import './GamesLobby.css';

interface IProps {
  fetchGames: (()  => void)
  createGame: (() => void)
  games
  joinGame
hostGame }
class GamesLobby extends React.Component <IProps>{
componentDidMount(){
  this.props.fetchGames()
}


checkStatus(status){
  if (status === null){
    return "Waiting for someone to Host..."
  }else if (status === "Pending") {
    return "Waiting for Second Player!"
  } else {
    return "Game Started!"
  }
}

checkPlayers(status){
  if(status === null){
    return "0"
  }else if (status === "Pending"){
    return "1"
  }else {
    return "2"
  }
} 

 handleClick(){}

renderGame = (game) => {
  return (<Card key={game.id} className="game-card">
    <CardContent>
      <Typography variant="headline" component="h2">
        Game {game.id}
      </Typography>
      <Typography color="textSecondary">
        Status: {this.checkStatus(game.status)}
      </Typography>
      <Typography color="textSecondary">
        Players: {this.checkPlayers(game.status)}/2
      </Typography>
    </CardContent>
    <CardActions>
      {game.status === null ? <Button
          color="primary"
          variant="contained"
          onClick={this.handleClick= () =>{this.props.hostGame(game.id)}}
          className="create-game"> <Link className="Links" to="/lobby/waitingRoom">
       Host this Game! </Link>
      </Button> : game.status === "Pending" ? <Link className="Links" to="/lobby/waitingRoom"><Button
          color="primary"
          variant="contained"
          // onClick={this.props.createGame}
          className="create-game">
       Join this Game!
      </Button> </Link>:
       <Button
          color="primary"
          disabled={true}
          variant="contained"
          // onClick={this.props.createGame}
          className="create-game">
       Game's already running
      </Button> }
    </CardActions>
  </Card>)
}

  render() {
    return (
      <Paper className="outer-paper">
        <Button
          color="primary"
          variant="contained"
          onClick={this.props.createGame}
          className="create-game">
          Create a Game
        </Button>
     <div>
     { this.props.games.map(game => this.renderGame(game))}
     </div> 
      </Paper>
    );
  }

}



const mapStateToProps = ({ games }) => ({ games })


export default connect(
  mapStateToProps,
  { getGames, fetchGames, createGame, hostGame }
)(GamesLobby);
