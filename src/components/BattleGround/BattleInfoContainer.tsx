import * as React from "react";
import { connect } from "react-redux";
import doesExist from "../../scripts/does-exist";
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

interface IProps {
  log: string;
  logging: boolean;
  onNextButtonClick: () => void;
  playerPokemon: IPokemon;
  toggleShowMoves: () => void;
  showMoves: boolean;
  selectMove: (selectMoveParams: ISelectMoveParams) => void;
  toggleShowSwitchOut: () => void;
  playerParty: IPokemon[];
  showSwitchOut: boolean;
  opponentPokemon: IPokemon;
  selectPokemon: (selectPokemonParams: ISelectPokemonParams) => void;
  aiOn: boolean;
}

class BattleInfoContainer extends React.Component<IProps> {
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
    console.log(e.target.name);
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

  render() {
    return (
      <React.Fragment>
        <LogPanel
          log={this.props.log}
          logging={this.props.logging}
          onNextButtonClick={this.props.onNextButtonClick}
        />
        <AttackPanel
          logging={this.props.logging}
          toggleShowMoves={this.props.toggleShowMoves}
          showMoves={this.props.showMoves}
          playerPokemon={this.props.playerPokemon}
          selectMove={this.onMoveButtonClick.bind(this)}
        />

        {!this.props.logging && (
          <React.Fragment>
            <button onClick={this.props.toggleShowSwitchOut}>Switch Out</button>
            {doesExist(this.props.playerParty) &&
              this.props.showSwitchOut &&
              this.props.playerParty.map(pokemon => {
                return (
                  <div key={pokemon.name}>
                    <span>
                      {pokemon.name} [hp: {pokemon.stats.hp}]
                    </span>
                    {pokemon.name !== this.props.playerPokemon.name &&
                      pokemon.stats.hp > 0 && (
                        <button
                          onClick={this.onSelectButtonClick}
                          name={pokemon.id.toString()}
                        >
                          select
                        </button>
                      )}
                    {pokemon.name !== this.props.playerPokemon.name &&
                      pokemon.stats.hp <= 0 && <strong>fainted</strong>}
                    {pokemon.name === this.props.playerPokemon.name && (
                      <strong>selected</strong>
                    )}
                  </div>
                );
              })}
          </React.Fragment>
        )}
      </React.Fragment>
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
