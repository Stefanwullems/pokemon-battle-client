import * as React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';



export default class WaitingRoom extends React.Component {

  render() {
  
    return (
      <div className="AwaitingLobby">
        <Paper className="outer-paper">
        <h1 className="WaitingLobbyHeader"> All Payers Ready! </h1>
          <Button
            color="primary"
            variant="contained"
            className="create-game">
            <Link className="Links" to="/lobby/selection">
             Select your Pokemons!
            </Link>
          </Button>

        </Paper>
      </div>
    );
  }
}
