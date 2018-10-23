import * as React from "react";
// import BattleGround from "./BattleGround";
import { connect } from "react-redux";
import fetchPokemon from "../../actions/pokemon/get-pokemon";
import switchTurn from "../../actions/gameLogic/switch-turn";
import selectPokemon from "../../actions/pokemon/select-pokemon";
import newTurn from "../../actions/gameLogic/new-turn";
import getTurnOrder from "../../scripts/turn-order";
import attack from "../../actions/gameLogic/attack";

interface IProps {
  fetchPokemon: (playerPartyIds: number[], opponentPartyIds: number[]) => void;
  switchTurn: () => void;
  selectPokemon: (id: number, from: string) => void;
  newTurn: () => void;
  playerPokemon: any;
  opponentPokemon: any;
  turn: number;
  attack: (attacker, defender, move, turn) => void;
}

class BattleGroundContainer extends React.Component<IProps> {
  state = {
    move: true,
    turnOrder: []
  };

  async componentDidMount() {
    const { fetchPokemon, selectPokemon } = this.props;

    await fetchPokemon([2, 5], [5, 8]);
    selectPokemon(5, "opponent");
    selectPokemon(2, "player");
  }

  componentDidUpdate() {
    const {
      playerPokemon,
      opponentPokemon,
      switchTurn,
      turn,
      newTurn
    } = this.props;
    if (this.state.move) {
      if (
        !this.state.turnOrder.length &&
        playerPokemon.stats &&
        opponentPokemon.stats
      ) {
        this.setState({
          turnOrder: getTurnOrder({
            playerPokemon,
            opponentPokemon
          })
        });
      }
      if (this.state.turnOrder.length) {
        if (this.state.turnOrder[turn] === "opponent") {
          this.props.attack(
            opponentPokemon,
            playerPokemon,
            { damage: 10 },
            "opponent"
          );
          if (turn === 0) {
            switchTurn();
          } else {
            this.setState({
              move: false
            });
            newTurn();
          }
        }
        if (this.state.turnOrder[turn] === "player") {
          this.props.attack(
            playerPokemon,
            opponentPokemon,
            { damage: 10 },
            "player"
          );
          if (turn === 0) {
            switchTurn();
          } else {
            this.setState({
              move: false
            });
            newTurn();
          }
        }
      }
    }
  }
}

// class BattleGroundContainer extends React.Component<IProps> {
//   componentDidMount() {
//     this.props.fetchPokemon(1, 2);
//     this.props.switchTurn();
//   }


const mapStateToProps = ({ playerPokemon, opponentPokemon, turn }) => ({
  playerPokemon,
  opponentPokemon,
  turn
});

export default connect(
  mapStateToProps,
  { fetchPokemon, switchTurn, selectPokemon, newTurn, attack }
)(BattleGroundContainer);
