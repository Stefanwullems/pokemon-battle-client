import * as React from "react";
import BattleGround from "./BattleGround";
import { connect } from "react-redux";
import fetchPokemon from "../../actions/pokemon/fetch-pokemon";
import switchTurn from "../../actions/gameLogic/switch-turn";
import selectPokemon from "../../actions/pokemon/select-pokemon";
import newTurn from "../../actions/gameLogic/new-turn";
import getTurnOrder from "../../scripts/turn-order";
import attack from "../../actions/gameLogic/attack";
import selectMove from "../../actions/gameLogic/select-move";
import fetchTypes from "../../actions/types/fetch-types";
import {
  IPokemon,
  IAttackParams,
  Role,
  IFetchPokemonParams,
  ISelectPokemonParams,
  ISelectMoveParams,
  ITypes
} from "../../tools/interfaces";
import randomItem from "../../scripts/random-item";

interface IProps {
  fetchPokemon: (fetchParams: IFetchPokemonParams) => void;
  switchTurn: () => void;
  selectPokemon: (selectPokemonParams: ISelectPokemonParams) => void;
  newTurn: () => void;
  selectMove: (selectMoveParams: ISelectMoveParams) => void;
  attack: (attack: IAttackParams) => void;
  fetchTypes: () => void;
  playerPokemon: IPokemon;
  opponentPokemon: IPokemon;
  turnIndex: number;
  playerMove: string;
  opponentMove: string;
  opponentParty: IPokemon[];
  playerParty: IPokemon[];
  types: ITypes;
}

class BattleGroundContainer extends React.Component<IProps> {
  state = {
    showMoves: false,
    turnOrder: [],
    showSwitchOut: false,
    prevTurnOrder: [],
    aiOn: true,
    logging: false
  };

  async componentDidMount() {
    const { fetchPokemon, selectPokemon, fetchTypes } = this.props;
    await fetchTypes();
    await fetchPokemon({ playerPartyIds: [2, 5], opponentPartyIds: [5, 8] });
    selectPokemon({ id: 5, trainer: "opponent" });
    selectPokemon({ id: 2, trainer: "player" });
  }

  componentDidUpdate() {
    if (!this.state.logging) {
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
  }

  handleAttack() {
    const attacker: Role = this.state.turnOrder[this.props.turnIndex];
    const defender: Role = this.state.turnOrder[(this.props.turnIndex + 1) % 2];
    this.props.attack({
      attacker: this.props[`${attacker}Pokemon`],
      defender: this.props[`${defender}Pokemon`],
      moveName: this.props[`${attacker}Move`],
      turn: attacker,
      types: this.props.types
    });
  }

  handleTurn() {
    if (this.props.turnIndex === 0) {
      this.props.switchTurn();
      this.setState({ logging: true });
    } else {
      this.props.newTurn();
      this.setState({
        showMoves: false
      });
      this.setState({
        turnOrder: []
      });
      this.setState({ logging: true });
    }
  }

  setTurnOrder() {
    const newTurnOrder = getTurnOrder({
      playerPokemon: this.props.playerPokemon,
      opponentPokemon: this.props.opponentPokemon,
      playerMoveName: this.props.playerMove,
      opponentMoveName: this.props.opponentMove
    });
    if (newTurnOrder) {
      this.setState({
        turnOrder: newTurnOrder
      });
      this.setState({
        prevTurnOrder: newTurnOrder
      });
    } else {
      this.setState({
        turnOrder: this.state.prevTurnOrder
      });
    }
  }

  checkPokemon(trainer) {
    const fitPokemon = this.props[`${trainer}Party`].filter(
      pokemon => pokemon.status === "fit"
    );
    if (trainer === "opponent") {
      if (!fitPokemon.length) {
        window.prompt("you won");
      } else {
        if (this.state.aiOn) {
          this.props.selectPokemon({
            id: randomItem(fitPokemon).id,
            trainer
          });
        }
      }
    } else {
      if (!fitPokemon.length) {
        window.prompt("you lost");
      } else {
        while (true) {
          const nextPokemonName = window.prompt(
            `your pokemon fainted. select another pokemon. Available:${fitPokemon.map(
              pokemon => pokemon.name
            )} `
          );
          const nextPokemon = fitPokemon.filter(
            pokemon => pokemon.name === nextPokemonName
          )[0];
          if (nextPokemon.id) {
            this.props.selectPokemon({ id: nextPokemon.id, trainer });
            break;
          }
        }
      }
    }
  }

  onMoveButtonClick(e) {
    this.props.selectMove({
      moveName: e.target.name,
      trainer: "player"
    });
    if (this.state.aiOn) {
      this.props.selectMove({
        moveName: randomItem(this.props.opponentPokemon.moves).name,
        trainer: "opponent"
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
    this.props.selectPokemon({ id: Number(e.target.name), trainer: "player" });
    this.props.selectMove({ moveName: "pass", trainer: "player" });
    if (this.state.aiOn) {
      this.props.selectMove({
        moveName: randomItem(this.props.opponentPokemon.moves).name,
        trainer: "opponent"
      });
    }
  }

  onNextButtonClick() {
    this.setState({ logging: false });
  }

  render() {
    return (
      <BattleGround
        logging={this.state.logging}
        onNextButtonClick={this.onNextButtonClick.bind(this)}
        onSelectButtonClick={this.onSelectButtonClick.bind(this)}
        toggleShowMoves={this.onAttackButtonClick.bind(this)}
        toggleShowSwitchOut={this.onSwitchOutButtonClick.bind(this)}
        showMoves={this.state.showMoves}
        selectMove={this.onMoveButtonClick.bind(this)}
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
  turnIndex,
  playerMove,
  opponentMove,
  opponentParty,
  playerParty,
  types
}) => ({
  playerPokemon,
  opponentPokemon,
  turnIndex,
  playerMove,
  opponentMove,
  opponentParty,
  playerParty,
  types
});

export default connect(
  mapStateToProps,
  {
    fetchPokemon,
    switchTurn,
    selectPokemon,
    newTurn,
    attack,
    selectMove,
    fetchTypes
  }
)(BattleGroundContainer);
