import * as React from "react";
// import EnemyContainer from './EnemyContainer';
// import { YourContainer } from './YourContainer';
// import { MenuContainer } from './MenuContainer';
// import { SkillsContainer } from './SkillsContainer';
// import { BattleInfoContainer } from './BattleInfoContainer'

interface IProps {
  attack: () => void;
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
      hi
      <button onClick={props.attack}>attack</button>
    </div>
  );
}

export default BattleGround;
