import * as React from "react";
// import BattleGround from "./BattleGround";
import { connect } from "react-redux";
import fetchPokemon from "../../actions/pokemon/get-pokemon";
import switchTurn from "../../actions/gameLogic/switch-turn";
import selectPokemon from "../../actions/pokemon/select-pokemon";
import newTurn from "../../actions/gameLogic/new-turn";
import getTurnOrder from "../../scripts/turn-order";
import attack from "../../actions/gameLogic/attack";
import {
  IPokemon,
  IAttack,
  Role,
  IFetchParams,
  ISelectPokemonParams
} from "../../tools/interfaces";

interface IProps {
  fetchPokemon: (fetchParams: IFetchParams) => void;
  switchTurn: () => void;
  selectPokemon: (selectPokemonParams: ISelectPokemonParams) => void;
  newTurn: () => void;
  playerPokemon: IPokemon;
  opponentPokemon: IPokemon;
  turn: number;
  attack: (attack: IAttack) => void;
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
    if (!this.state.turnOrder.length) {
      this.setTurnOrder();
    }
    if (this.state.move) {
      if (this.state.turnOrder.length) {
        this.handleAttack();
        this.handleTurn();
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
          ? this.props.opponentPokemon.moves[0]
          : this.props.playerPokemon.moves[0],
      turn
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
    this.setState({ move: true });
  }

  render() {
    return <BattleGround attack={this.onAttackButtonClick.bind(this)} />;
  }
}

const mapStateToProps = ({ playerPokemon, opponentPokemon, turn }) => ({
  playerPokemon,
  opponentPokemon,
  turn
});

export default connect(
  mapStateToProps,
  { fetchPokemon, switchTurn, selectPokemon, newTurn, attack }
)(BattleGroundContainer);
