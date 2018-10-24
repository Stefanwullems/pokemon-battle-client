import * as React from "react";
import { IPokemon } from "../../tools/interfaces";
// import EnemyContainer from './EnemyContainer';
// import { YourContainer } from './YourContainer';
// import { MenuContainer } from './MenuContainer';
// import { SkillsContainer } from './SkillsContainer';
// import { BattleInfoContainer } from './BattleInfoContainer'

interface IProps {
  toggleShowMoves: () => void;
  toggleShowSwitchOut: () => void;
  onSelectButtonClick: () => void;
  selectMove: () =>
    | ((event: React.MouseEvent<HTMLButtonElement>) => void)
    | undefined;
  playerPokemon: IPokemon;
  opponentPokemon: IPokemon;
  playerParty: IPokemon[];
  opponentParty: IPokemon[];
  showSwitchOut: boolean;
  showMoves: boolean;
}

function BattleGround(props: IProps) {
  return (
    <div className="main">
      {/* <EnemyContainer />
      <YourContainer />
      <div className="BottomDiv">
      <BattleInfoContainer />
        <div className="SkillsDiv">
          <SkillsContainer />
        </div>
        <div className="MenuDiv">
          <MenuContainer />
        </div>
      </div> */}
      {/* Closing BottomDiv*/}
      <h1>Test</h1>
      <h2>Opponent</h2>
      <span>
        {Object.keys(props.opponentPokemon).length && (
          <span>
            {props.opponentPokemon.name} - {props.opponentPokemon.stats.hp}
          </span>
        )}
      </span>
      <h2>Player</h2>
      <div>
        {Object.keys(props.playerPokemon).length && (
          <span>
            {props.playerPokemon.name} - {props.playerPokemon.stats.hp}
          </span>
        )}
        <button onClick={props.toggleShowMoves}>attack</button>
        {props.showMoves && (
          <div>
            <div>
              {Object.keys(props.playerPokemon).length &&
                props.playerPokemon.moves.map(move => {
                  return (
                    <button
                      onClick={props.selectMove}
                      name={move.name}
                      className="player"
                      key={move.name}
                    >
                      {move.name}
                    </button>
                  );
                })}
            </div>
          </div>
        )}
        <button onClick={props.toggleShowSwitchOut}>Switch Out</button>
        <br />
        <br />
        {Object.keys(props.playerParty).length &&
          props.showSwitchOut &&
          props.playerParty.map(pokemon => {
            return (
              <div key={pokemon.name}>
                <span>
                  {pokemon.name} : {pokemon.stats.hp}
                </span>
                {pokemon.name !== props.playerPokemon.name && (
                  <button
                    onClick={props.onSelectButtonClick}
                    name={pokemon.id.toString()}
                  >
                    select
                  </button>
                )}
                {pokemon.name === props.playerPokemon.name && (
                  <strong>selected</strong>
                )}
                <br />
                <br />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default BattleGround;
