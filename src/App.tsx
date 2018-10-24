import * as React from "react";

import { Route } from "react-router-dom";
import { GamesLobby } from "./components/PathComponents/GamesLobby";
// import { GreetingScreen } from "./components/PathComponents/GreetingScreen";
import LoginContainer from "./components/Login/LoginContainer";
import BattleGroundContainer from "./components/BattleGround/BattleGroundContainer";

import "./App.css";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <LoginContainer />
        {/* <Route exact path="/" component={GreetingScreen} />  */}
        <Route exact path="/" component={BattleGroundContainer} />
        <Route exact path="/games" component={GamesLobby} />
      </div>
    );
  }
}

export default App;
