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
  opponentParty: IPokemon[];
  playerParty: IPokemon[];
}

class BattleGroundContainer extends React.Component<IProps> {
  state = {
    showMoves: false,
    turnOrder: [],
    showSwitchOut: false
  };

  async componentDidMount() {
    const { fetchPokemon, selectPokemon } = this.props;

    await fetchPokemon({ playerPartyIds: [2, 5], opponentPartyIds: [5, 8] });
    selectPokemon({ id: 5, from: "opponent" });
    selectPokemon({ id: 2, from: "player" });
  }

  componentDidUpdate() {
    if (this.props.opponentPokemon.status === "fainted") {
      this.checkPokemon("opponent");
    }
    if (this.props.playerPokemon.status === "fainted") {
      this.checkPokemon("player");
    }
    if (this.props.playerMove && this.props.opponentMove) {
      if (!this.state.turnOrder.length) this.setTurnOrder();
      else {
        this.handleAttack();
        this.handleTurn();
      }
    }
  }

  setTurnOrder() {
    const {
      playerPokemon,
      opponentPokemon,
      playerMove,
      opponentMove
    } = this.props;
    this.setState({
      turnOrder: getTurnOrder({
        playerPokemon,
        opponentPokemon,
        playerMoveName: playerMove,
        opponentMoveName: opponentMove
      })
    });
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
      moveName:
        turn === "opponent" ? this.props.opponentMove : this.props.playerMove,
      turn
    });
  }

  checkPokemon(from) {
    if (from === "opponent") {
      const nextPokemon = this.props.opponentParty.filter(
        pokemon => pokemon.status === "fit"
      )[0];
      console.log(nextPokemon);
      if (!nextPokemon) {
        window.prompt("you won");
      } else {
        this.props.selectPokemon({
          id: nextPokemon.id,
          from
        });
      }
    } else {
      const availablePokemon = this.props.playerParty.filter(
        pokemon => pokemon.stats.hp > 0
      );
      if (!availablePokemon) {
        window.prompt("you lost");
      } else {
        while (true) {
          const nextPokemonName = window.prompt(
            `your pokemon fainted. select another pokemon. Available:${availablePokemon.map(
              pokemon => pokemon.name
            )} `
          );
          const nextPokemon = availablePokemon.filter(
            pokemon => pokemon.name === nextPokemonName
          )[0];
          if (nextPokemon.id) {
            this.props.selectPokemon({ id: nextPokemon.id, from });
            break;
          }
        }
      }
    }
  }

  onMoveButtonClick(e) {
    this.props.selectMove({
      moveName: e.target.name,
      from: "player"
    });
    this.props.selectMove({
      moveName: this.props.opponentPokemon.moves[
        Math.floor(Math.random() * this.props.opponentPokemon.moves.length)
      ].name,
      from: "opponent"
    });
  }

  handleTurn() {
    if (this.props.turn === 0) {
      this.props.switchTurn();
    } else {
      this.props.newTurn();
      this.setState({
        showMoves: false
      });
      this.setState({
        turnOrder: []
      });
    }
  }

  onAttackButtonClick() {
    this.setState({ showMoves: !this.state.showMoves });
  }

  onSwitchOutButtonClick() {
    this.setState({ showSwitchOut: !this.state.showSwitchOut });
  }

  onSelectButtonClick(e) {
    this.props.selectPokemon({ id: Number(e.target.name), from: "player" });
    this.props.selectMove({ moveName: "pass", from: "player" });
    this.props.selectMove({
      moveName: this.props.opponentPokemon.moves[
        Math.floor(Math.random() * this.props.opponentPokemon.moves.length)
      ].name,
      from: "opponent"
    });
  }

  render() {
    return (
      <BattleGround
        onSelectButtonClick={this.onSelectButtonClick.bind(this)}
        toggleShowMoves={this.onAttackButtonClick.bind(this)}
        toggleShowSwitchOut={this.onSwitchOutButtonClick.bind(this)}
        showMoves={this.state.showMoves}
        selectMove={this.onMoveButtonClick.bind(this)}
        opponentPokemon={this.props.opponentPokemon}
        playerPokemon={this.props.playerPokemon}
        opponentParty={this.props.opponentParty}
        playerParty={this.props.playerParty}
        showSwitchOut={this.state.showSwitchOut}
      />
    );
  }
}

const mapStateToProps = ({
  playerPokemon,
  opponentPokemon,
  turn,
  playerMove,
  opponentMove,
  opponentParty,
  playerParty
}) => ({
  playerPokemon,
  opponentPokemon,
  turn,
  playerMove,
  opponentMove,
  opponentParty,
  playerParty
});

export default connect(
  mapStateToProps,
  { fetchPokemon, switchTurn, selectPokemon, newTurn, attack, selectMove }
)(BattleGroundContainer);
