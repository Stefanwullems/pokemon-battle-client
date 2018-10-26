import * as React from "react";
import BattleInfoContainer from "./BattleInfoContainer";
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
  ISelectMoveParams,
  ITypes,
  ISelectPokemonParams
} from "../../tools/interfaces";
import randomItem from "../../scripts/random-item";
import PlayerContainer from "./PlayerContainer";
import OpponentContainer from "./OpponentContainer";
import { Paper } from "@material-ui/core";

interface IProps {
  fetchPokemon: (fetchParams: IFetchPokemonParams) => void;
  switchTurn: () => void;
  newTurn: () => void;
  selectMove: (selectMoveParams: ISelectMoveParams) => void;
  attack: (attack: IAttackParams) => void;
  fetchTypes: () => void;
  selectPokemon: (selectPokemonParams: ISelectPokemonParams) => void;
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
    turnOrder: [],
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

  onNextButtonClick() {
    this.setState({ logging: false });
  }

  render() {
    return (
      <Paper style={{ padding: 10 }}>
        <OpponentContainer />
        <PlayerContainer />
        <BattleInfoContainer
          aiOn={this.state.aiOn}
          logging={this.state.logging}
          onNextButtonClick={this.onNextButtonClick.bind(this)}
        />
      </Paper>
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
