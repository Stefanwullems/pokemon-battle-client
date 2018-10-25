import * as React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';



export default class WaitingRoom extends React.Component {


  isFull = input => {
    if (input === 'yes') {
      return false;
    } else {
      return true;
    }
  };
  render() {
  
    return (
      <div className="AwaitingLobby">
        <Paper className="outer-paper">
          <Button
            disabled={this.isFull('yes')}
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
