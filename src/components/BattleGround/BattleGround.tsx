import * as React from "react";
import { IPokemon } from "../../tools/interfaces";
// import EnemyContainer from './EnemyContainer';
// import { YourContainer } from './YourContainer';
// import { MenuContainer } from './MenuContainer';
// import { SkillsContainer } from './SkillsContainer';
// import { BattleInfoContainer } from './BattleInfoContainer'

interface IProps {
  attack: () => void;
  selectMove: () =>
    | ((event: React.MouseEvent<HTMLButtonElement>) => void)
    | undefined;
  playerPokemon: IPokemon;
  opponentPokemon: IPokemon;
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
      <button onClick={props.attack}>attack</button>
      <h2>Player moves</h2>
      <div>
        {Object.keys(props.playerPokemon).length &&
          props.playerPokemon.moves.map(move => {
            return (
              <button
                onClick={props.selectMove}
                name={move.name}
                className="player"
              >
                {move.name}
              </button>
            );
          })}
      </div>
      <h2>Opponent moves</h2>
      <div>
        {Object.keys(props.opponentPokemon).length &&
          props.opponentPokemon.moves.map(move => {
            return (
              <button
                onClick={props.selectMove}
                name={move.name}
                className="opponent"
              >
                {move.name}
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default BattleGround;
