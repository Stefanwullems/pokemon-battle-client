import * as React from "react";

import BattleGroundContainer from "./components/BattleGround/BattleGroundContainer";
import LoginContainer from "./components/Login/LoginContainer";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <LoginContainer/>
        <BattleGroundContainer />
      </div>
    );
  }
}

export default App;
