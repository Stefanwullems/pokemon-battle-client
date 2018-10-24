import * as React from "react";
import BattleGround from "./BattleGround";
import { connect } from "react-redux";
import fetchPokemon from "../../actions/pokemon/get-pokemon";
import switchTurn from "../../actions/gameLogic/switch-turn";
import selectPokemon from "../../actions/pokemon/select-pokemon";
import newTurn from "../../actions/gameLogic/new-turn";
import getTurnOrder from "../../scripts/turn-order";
import attack from "../../actions/gameLogic/attack";
import selectMove from "../../actions/gameLogic/select-move";
import {
  IPokemon,
  IAttack,
  Role,
  IFetchParams,
  ISelectPokemonParams,
  ISelectMoveParams
} from "../../tools/interfaces";

interface IProps {
  fetchPokemon: (fetchParams: IFetchParams) => void;
  switchTurn: () => void;
  selectPokemon: (selectPokemonParams: ISelectPokemonParams) => void;
  newTurn: () => void;
  selectMove: (selectMoveParams: ISelectMoveParams) => void;
  attack: (attack: IAttack) => void;
  playerPokemon: IPokemon;
  opponentPokemon: IPokemon;
  turn: number;
  playerMove: string;
  opponentMove: string;
}

class BattleGroundContainer extends React.Component<IProps> {
  state = {
    move: false,
    turnOrder: []
  };

  async componentDidMount() {
    const { fetchPokemon, selectPokemon } = this.props;

    await fetchPokemon({ playerPartyIds: [2, 5], opponentPartyIds: [5, 8] });
    selectPokemon({ id: 5, from: "opponent" });
    selectPokemon({ id: 2, from: "player" });
  }

  componentDidUpdate() {
    if (this.state.move) {
      console.log(this.props.playerMove, this.props.opponentMove);
      if (this.props.playerMove && this.props.opponentMove) {
        console.log(2);
        if (!this.state.turnOrder.length) {
          console.log(3);
          this.setTurnOrder();
        }
        if (this.state.turnOrder.length) {
          console.log(4);
          this.handleAttack();
          this.handleTurn();
        }
      }
    }
  }

  setTurnOrder() {
    const { playerPokemon, opponentPokemon } = this.props;
    if (
      Object.keys(playerPokemon).length &&
      Object.keys(opponentPokemon).length
    ) {
      this.setState({
        turnOrder: getTurnOrder({ playerPokemon, opponentPokemon })
      });
    }
  }

  handleAttack() {
    const turn: Role = this.state.turnOrder[this.props.turn];
    this.props.attack({
      attacker:
        turn === "opponent"
          ? this.props.opponentPokemon
          : this.props.playerPokemon,
      defender:
        turn === "opponent"
          ? this.props.playerPokemon
          : this.props.opponentPokemon,
      move:
        turn === "opponent"
          ? this.props.opponentPokemon.moves.filter(
              move => move.name === this.props.opponentMove
            )[0]
          : this.props.playerPokemon.moves.filter(
              move => move.name === this.props.playerMove
            )[0],
      turn
    });
  }

  onMoveButtonClick(e) {
    this.props.selectMove({
      moveName: e.target.name,
      from: e.target.className
    });
  }

  handleTurn() {
    if (this.props.turn === 0) {
      this.props.switchTurn();
    } else {
      this.props.newTurn();
      this.setState({
        move: false
      });
    }
  }

  onAttackButtonClick() {
    if (this.props.playerMove && this.props.opponentMove)
      this.setState({ move: true });
  }

  render() {
    return (
      <BattleGround
        attack={this.onAttackButtonClick.bind(this)}
        selectMove={this.onMoveButtonClick.bind(this)}
        opponentPokemon={this.props.opponentPokemon}
        playerPokemon={this.props.playerPokemon}
      />
    );
  }
}

const mapStateToProps = ({
  playerPokemon,
  opponentPokemon,
  turn,
  playerMove,
  opponentMove
}) => ({
  playerPokemon,
  opponentPokemon,
  turn,
  playerMove,
  opponentMove
});

export default connect(
  mapStateToProps,
  { fetchPokemon, switchTurn, selectPokemon, newTurn, attack, selectMove }
)(BattleGroundContainer);
