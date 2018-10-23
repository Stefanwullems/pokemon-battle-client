import { combineReducers } from "redux";
//import pokemon1 from "./playerCurrentPokemon";
//import pokemon2 from "./opponentCurrentPokemon";
import playerParty from "./playerParty";
import opponentParty from "./opponentParty";
import turn from "./turn";
import trainer from './trainer';

export default combineReducers({
  playerParty,
  opponentParty,
  turn,
  trainer
});
