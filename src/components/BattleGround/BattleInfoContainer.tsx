import * as React from "react";
import { connect } from "react-redux";
import {
  IPokemon,
  ISelectPokemonParams,
  ISelectMoveParams
} from "../../tools/interfaces";
import LogPanel from "../BattleInfoComponents/LogPanel";
import AttackPanel from "../BattleInfoComponents/AttackPanel";
import randomItem from "../../scripts/random-item";
import selectPokemon from "../../actions/pokemon/select-pokemon";
import selectMove from "../../actions/gameLogic/select-move";
import SelectPokemonPanel from "../BattleInfoComponents/SelectPokemonPanel";
import { Paper } from "@material-ui/core";

interface IProps {
  log: string;
  logging: boolean;
  onNextButtonClick: () => void;
  playerPokemon: IPokemon;
  selectMove: (selectMoveParams: ISelectMoveParams) => void;
  playerParty: IPokemon[];
  opponentPokemon: IPokemon;
  selectPokemon: (selectPokemonParams: ISelectPokemonParams) => void;
  aiOn: boolean;
}

class BattleInfoContainer extends React.Component<IProps> {
  state = {
    showSwitchOut: false,
    showMoves: false
  };

  onSelectButtonClick(e) {
    this.props.selectPokemon({ id: Number(e.target.name), trainer: "player" });
    this.props.selectMove({ moveName: "pass", trainer: "player" });
    if (this.props.aiOn) {
      this.props.selectMove({
        moveName: randomItem(this.props.opponentPokemon.moves).name,
        trainer: "opponent"
      });
    }
  }

  onMoveButtonClick(e) {
    this.props.selectMove({
      moveName: e.target.name,
      trainer: "player"
    });
    if (this.props.aiOn) {
      this.props.selectMove({
        moveName: randomItem(this.props.opponentPokemon.moves).name,
        trainer: "opponent"
      });
    }
  }

  toggleShowSwitchOut() {
    this.setState({ showSwitchOut: !this.state.showSwitchOut });
  }

  toggleShowMoves() {
    this.setState({ showMoves: !this.state.showMoves });
  }

  render() {
    return (
      <Paper>
        {this.props.logging && (
          <LogPanel
            log={this.props.log}
            onNextButtonClick={this.props.onNextButtonClick}
          />
        )}
        {!this.props.logging && (
          <React.Fragment>
            <AttackPanel
              toggleShowMoves={this.toggleShowMoves.bind(this)}
              showMoves={this.state.showMoves}
              playerPokemon={this.props.playerPokemon}
              onMoveButtonClick={this.onMoveButtonClick.bind(this)}
            />
            <SelectPokemonPanel
              toggleShowSwitchOut={this.toggleShowSwitchOut.bind(this)}
              playerParty={this.props.playerParty}
              showSwitchOut={this.state.showSwitchOut}
              playerPokemon={this.props.playerPokemon}
              onSelectButtonClick={this.onSelectButtonClick.bind(this)}
            />
          </React.Fragment>
        )}
      </Paper>
    );
  }
}

const mapStateToProps = ({
  log,
  playerParty,
  playerPokemon,
  opponentPokemon
}) => ({
  log,
  playerParty,
  playerPokemon,
  opponentPokemon
});

export default connect(
  mapStateToProps,
  { selectPokemon, selectMove }
)(BattleInfoContainer);
