import * as React from "react";
import { Route } from "react-router-dom";
import GamesLobby from "./components/PathComponents/GamesLobby";
import GreetingScreen from "./components/PathComponents/GreetingScreen";
import WaitingRoom from "./components/PathComponents/WaitingRoom";
import Selection from "./components/PathComponents/Selection";
import BattleGroundContainer from "./components/BattleGround/BattleGroundContainer";

import "./App.css";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Route exact path="/" component={GreetingScreen} />
        <Route exact path="/lobby" component={GamesLobby} />
        <Route exact path="/lobby/waitingRoom" component={WaitingRoom} />
        <Route exact path="/lobby/selection" component={Selection} />
        <Route exact path="/battleGround" component={BattleGroundContainer} />
      </div>
    );
  }
}

export default App;
