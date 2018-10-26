import * as React from "react";
import { Route } from 'react-router-dom'
import GamesLobby from './components/PathComponents/GamesLobby'
import GreetingScreen  from './components/PathComponents/GreetingScreen'
import WaitingRoom from './components/PathComponents/WaitingRoom'
import Selection from './components/PathComponents/Selection'




import "./App.css";

class App extends React.Component {
  public render() {
    return (
      <div className="App">

      <Route exact path="/" component={GreetingScreen} />
       <Route exact path="/lobby" component={GamesLobby} /> 
       <Route exact path="/lobby/waitingRoom" component={WaitingRoom} />
       <Route exact path='/lobby/selection' component={Selection} />

      </div>
    );
  }
}

export default App;
