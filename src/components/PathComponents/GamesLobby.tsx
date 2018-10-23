import * as React from 'react'
import {connect} from 'react-redux'
import {getGames, createGame} from '../../actions/lobby/gameActions'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './GamesLobby.css'


export class GamesLobby extends React.Component {
        renderGame = (game) => {
          const history:any = this.props
      
          return (
          <Card key={game.id} className="game-card">
            <CardContent>
              <Typography color="textSecondary">
                This game is hosted.
              </Typography>
              <Typography variant="headline" component="h2">
                Game #{game.id}
              </Typography>
              <Typography color="textSecondary">
                Status: {game.status}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => history.push(`/games/${game.id}`)}
              >
                Open this match!
              </Button>
            </CardActions>
          </Card>)
        }
      
        render() {
          const {games, trainers, createGame}:any = this.props
      
          if (games === null || trainers === null) return null
      
          return (<Paper className="outer-paper">
            <Button
              color="primary"
              variant="raised"
              onClick={createGame}
              className="create-game"
            >
              Create a Game
            </Button>
            <div>
              {games === null && games.map(game => this.renderGame(game))}
            </div>
          </Paper>)
        }
      }
      

      const mapStateToProps = state => ({
        trainers: state.trainers === null ? null : state.trainers,
        games: state.games 
      })
      
      export default connect(mapStateToProps, {getGames, createGame})(GamesLobby)