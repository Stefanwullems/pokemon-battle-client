import * as React from "react";
import { Route } from 'react-router-dom'
import { GamesLobby } from './components/PathComponents/GamesLobby'
import { GreetingScreen } from './components/PathComponents/GreetingScreen'

import  "./App.css"

// import BattleGroundContainer from "./components/BattleGround/BattleGroundContainer";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
      <Route exact path="/" component={GreetingScreen} />
       <Route exact path="/games" component={GamesLobby} />
      </div>
    );
  }
}

export default App;
